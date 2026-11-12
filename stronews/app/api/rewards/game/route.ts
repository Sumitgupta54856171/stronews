import { getAuthenticatedUserId, isAuthConfigured, readRequestJson } from "@/lib/auth";
import { UserModel } from "@/lib/auth/model";
import { connectMongo } from "@/lib/mongodb";
import { claimRewardIfEligible } from "@/lib/rewards/claim";
import { READING_REWARD_SECONDS } from "@/lib/rewards/constants";
import { REWARD_GAME_TARGET_PAIRS } from "@/lib/rewards/game-rules";
import { getArticleQuizzes } from "@/lib/rewards/quiz-rules";
import { ReadingSessionModel } from "@/lib/rewards/models";

type GameAction = "start" | "flip" | "retry";

function isArticleId(value: unknown): value is string {
  return typeof value === "string" && value.length > 0 && value.length <= 180;
}

function shuffleCards() {
  const cards = Array.from(
    { length: REWARD_GAME_TARGET_PAIRS },
    (_, index) => [index + 1, index + 1],
  ).flat();
  for (let index = cards.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [cards[index], cards[swapIndex]] = [cards[swapIndex], cards[index]];
  }
  return cards;
}

function matchedCards(cards: number[], indexes: number[]) {
  return indexes.map((index) => ({ index, value: cards[index] }));
}

function makeResponse(session: {
  gameCards: number[];
  gameMatchedCards: number[];
  gameFirstCard: number;
}) {
  const firstCard = session.gameFirstCard >= 0
    ? { index: session.gameFirstCard, value: session.gameCards[session.gameFirstCard] }
    : null;
  return {
    matchedPairs: Math.floor(session.gameMatchedCards.length / 2),
    targetPairs: REWARD_GAME_TARGET_PAIRS,
    matchedCards: matchedCards(session.gameCards, session.gameMatchedCards),
    firstCard,
  };
}

export async function POST(request: Request) {
  if (!isAuthConfigured()) {
    return Response.json(
      { error: "Rewards require MongoDB and AUTH_SECRET to be configured." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  const userId = getAuthenticatedUserId(request);
  if (!userId) return Response.json({ error: "Sign in to verify your game." }, { status: 401 });

  const body = await readRequestJson(request);
  if (
    typeof body !== "object" ||
    body === null ||
    !("articleId" in body) ||
    !("action" in body) ||
    !isArticleId(body.articleId) ||
    (body.action !== "start" && body.action !== "flip" && body.action !== "retry")
  ) {
    return Response.json({ error: "A story and valid game action are required." }, { status: 400 });
  }
  const action: GameAction = body.action;
  const cardIndex = "cardIndex" in body ? body.cardIndex : undefined;
  if (action === "flip" && (typeof cardIndex !== "number" || !Number.isInteger(cardIndex))) {
    return Response.json({ error: "Choose a valid card." }, { status: 400 });
  }

  try {
    await connectMongo();
    const user = await UserModel.findById(userId).select("_id").lean();
    if (!user) return Response.json({ error: "Sign in to verify your game." }, { status: 401 });

    const [session, quizzes] = await Promise.all([
      ReadingSessionModel.findOne({ userId, articleId: body.articleId }),
      getArticleQuizzes(body.articleId),
    ]);
    if (!session || session.expiresAt <= new Date()) {
      return Response.json({ error: "Your reading session expired. Restart the story timer." }, { status: 410 });
    }
    if (session.quizFailed) {
      return Response.json({ error: "This story is no longer eligible for a coin reward." }, { status: 409 });
    }
    if (session.activeSeconds < READING_REWARD_SECONDS) {
      return Response.json({ error: "Read this story for three active minutes before the game check." }, { status: 409 });
    }
    if (!quizzes?.length) {
      return Response.json({ error: "This story has no reward quiz." }, { status: 409 });
    }
    const completedSections = new Set(session.completedQuizSections ?? []);
    if (quizzes.some((_, index) => !completedSections.has(index))) {
      return Response.json({ error: "Complete every section quiz correctly before the game check." }, { status: 409 });
    }

    if (session.gameVerified) {
      const reward = await claimRewardIfEligible(
        userId,
        body.articleId,
        {
          activeSeconds: session.activeSeconds,
          completedQuizSections: session.completedQuizSections ?? [],
          quizFailed: false,
          gameVerified: true,
        },
        quizzes.length,
      );
      if (!reward) return Response.json({ error: "Story not found." }, { status: 404 });
      return Response.json({ ...reward, ...makeResponse(session) }, { headers: { "Cache-Control": "no-store" } });
    }

    let updatedSession = session;
    if (action === "start") {
      if (!session.gameCards?.length) {
        const startedSession = (await ReadingSessionModel.findOneAndUpdate(
          {
            _id: session._id,
            gameVerified: false,
            $or: [{ gameCards: { $exists: false } }, { gameCards: { $size: 0 } }],
          },
          {
            $set: {
              gameCards: shuffleCards(),
              gameMatchedCards: [],
              gameFirstCard: -1,
            },
          },
          { returnDocument: "after" },
        )) ?? (await ReadingSessionModel.findById(session._id));
        if (!startedSession?.gameCards?.length) {
          return Response.json({ error: "Could not start the verification game. Please try again." }, { status: 503 });
        }
        updatedSession = startedSession;
      }
    } else if (action === "retry") {
      const retriedSession = await ReadingSessionModel.findOneAndUpdate(
        { _id: session._id, gameVerified: false },
        {
          $set: {
            gameCards: shuffleCards(),
            gameMatchedCards: [],
            gameFirstCard: -1,
          },
        },
        { returnDocument: "after" },
      );
      if (!retriedSession) {
        return Response.json({ error: "Could not restart the verification game. Please try again." }, { status: 409 });
      }
      updatedSession = retriedSession;
    } else {
      const index = cardIndex as number;
      if (
        index < 0 ||
        index >= session.gameCards.length ||
        session.gameCards.length !== REWARD_GAME_TARGET_PAIRS * 2
      ) {
        return Response.json({ error: "Start a new game before choosing a card." }, { status: 400 });
      }
      if ((session.gameMatchedCards ?? []).includes(index)) {
        return Response.json({ error: "That pair has already been matched." }, { status: 409 });
      }

      if (session.gameFirstCard < 0) {
        const nextSession = await ReadingSessionModel.findOneAndUpdate(
          {
            _id: session._id,
            gameVerified: false,
            gameFirstCard: -1,
            gameMatchedCards: { $ne: index },
          },
          { $set: { gameFirstCard: index } },
          { returnDocument: "after" },
        );
        if (!nextSession) {
          return Response.json({ error: "The game changed. Choose a card again." }, { status: 409 });
        }
        updatedSession = nextSession;
        return Response.json(
          { status: "playing", ...makeResponse(updatedSession), revealedCards: [{ index, value: session.gameCards[index] }] },
          { headers: { "Cache-Control": "no-store" } },
        );
      }

      const firstIndex = session.gameFirstCard;
      if (firstIndex === index) {
        return Response.json({ error: "Choose a different second card." }, { status: 400 });
      }
      const pairMatched = session.gameCards[firstIndex] === session.gameCards[index];
      const nextMatchedCards = pairMatched
        ? [...new Set([...(session.gameMatchedCards ?? []), firstIndex, index])]
        : session.gameMatchedCards ?? [];
      const nextSession = await ReadingSessionModel.findOneAndUpdate(
        { _id: session._id, gameVerified: false, gameFirstCard: firstIndex },
        {
          $set: {
            gameFirstCard: -1,
            gameMatchedCards: nextMatchedCards,
            ...(nextMatchedCards.length === REWARD_GAME_TARGET_PAIRS * 2 ? { gameVerified: true } : {}),
          },
        },
        { returnDocument: "after" },
      );
      if (!nextSession) {
        return Response.json({ error: "The game changed. Choose a card again." }, { status: 409 });
      }
      updatedSession = nextSession;

      const revealedCards = [
        { index: firstIndex, value: session.gameCards[firstIndex] },
        { index, value: session.gameCards[index] },
      ];
      if (!updatedSession.gameVerified) {
        return Response.json(
          {
            status: "playing",
            ...makeResponse(updatedSession),
            pairMatched,
            revealedCards,
          },
          { headers: { "Cache-Control": "no-store" } },
        );
      }
    }

    if (!updatedSession.gameVerified) {
      return Response.json(
        { status: "playing", ...makeResponse(updatedSession) },
        { headers: { "Cache-Control": "no-store" } },
      );
    }

    const reward = await claimRewardIfEligible(
      userId,
      body.articleId,
      {
        activeSeconds: updatedSession.activeSeconds,
        completedQuizSections: updatedSession.completedQuizSections ?? [],
        quizFailed: updatedSession.quizFailed ?? false,
        gameVerified: true,
      },
      quizzes.length,
    );
    if (!reward) return Response.json({ error: "Story not found." }, { status: 404 });

    return Response.json(
      {
        ...reward,
        ...makeResponse(updatedSession),
        status: reward.status,
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json(
      { error: "Could not verify the game challenge." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
