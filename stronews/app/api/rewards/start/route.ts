import { getAuthenticatedUserId, isAuthConfigured, readRequestJson } from "@/lib/auth";
import { connectMongo } from "@/lib/mongodb";
import { UserModel } from "@/lib/auth/model";
import { RewardClaimModel, ReadingSessionModel } from "@/lib/rewards/models";
import { getArticleQuizzes } from "@/lib/rewards/quiz-rules";
import { getArticleRewardDetails } from "@/lib/rewards/reward-rules";
import { READING_REWARD_SECONDS } from "@/lib/rewards/constants";

const SESSION_TTL_MS = 30 * 60 * 1000;

function isArticleId(value: unknown): value is string {
  return typeof value === "string" && value.length > 0 && value.length <= 180;
}

export async function POST(request: Request) {
  if (!isAuthConfigured()) {
    return Response.json(
      { error: "Rewards require MongoDB and AUTH_SECRET to be configured." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  const userId = getAuthenticatedUserId(request);
  if (!userId) {
    return Response.json({ error: "Sign in to earn coins." }, { status: 401 });
  }

  const body = await readRequestJson(request);
  const articleId = typeof body === "object" && body !== null && "articleId" in body
    ? body.articleId
    : undefined;
  if (!isArticleId(articleId)) {
    return Response.json({ error: "A valid story is required." }, { status: 400 });
  }

  try {
    await connectMongo();
    const user = await UserModel.findById(userId).select("_id").lean();
    if (!user) return Response.json({ error: "Sign in to earn coins." }, { status: 401 });

    const existingClaim = await RewardClaimModel.findOne({ userId, articleId }).select("_id").lean();
    if (existingClaim) {
      const [session, quizzes] = await Promise.all([
        ReadingSessionModel.findOne({ userId, articleId }).select("completedQuizSections quizFailed").lean(),
        getArticleQuizzes(articleId),
      ]);
      return Response.json(
        {
          status: "already_earned",
          completedQuizSections: session?.completedQuizSections ?? [],
          quizFailed: session?.quizFailed ?? false,
          quizFailedSection: session?.quizFailedSection ?? -1,
          quizCount: quizzes?.length ?? 0,
        },
        { headers: { "Cache-Control": "no-store" } },
      );
    }

    const reward = await getArticleRewardDetails(articleId);
    if (!reward) return Response.json({ error: "Story not found." }, { status: 404 });
    const quizzes = await getArticleQuizzes(articleId);
    if (!quizzes?.length) {
      return Response.json({ error: "This story is not configured with section quizzes yet." }, { status: 409 });
    }

    const now = new Date();
    let session = await ReadingSessionModel.findOne({ userId, articleId });
    if (session?.quizFailed) {
      return Response.json(
        {
          status: "quiz_failed",
          activeSeconds: session.activeSeconds,
          requiredSeconds: READING_REWARD_SECONDS,
          completedQuizSections: session.completedQuizSections ?? [],
          quizCount: quizzes.length,
          quizFailed: true,
          quizFailedSection: session.quizFailedSection ?? -1,
          category: reward.category,
          coins: reward.coins,
          title: reward.title,
        },
        { headers: { "Cache-Control": "no-store" } },
      );
    }
    if (!session || session.expiresAt <= now) {
      try {
        session = await ReadingSessionModel.findOneAndUpdate(
          { userId, articleId },
          {
            $set: {
              startedAt: now,
              lastHeartbeatAt: now,
              activeSeconds: 0,
              quizFailedSection: -1,
              gameVerified: false,
              gameCards: [],
              gameMatchedCards: [],
              gameFirstCard: -1,
              expiresAt: new Date(now.getTime() + SESSION_TTL_MS),
            },
            $setOnInsert: {
              completedQuizSections: [],
              quizFailed: false,
              quizAttempts: 0,
            },
          },
          { upsert: true, returnDocument: "after", setDefaultsOnInsert: true },
        );
      } catch (error) {
        const duplicate = typeof error === "object" && error !== null && "code" in error && error.code === 11000;
        if (!duplicate) throw error;
        session = await ReadingSessionModel.findOne({ userId, articleId });
      }
    }
    if (!session) {
      return Response.json({ error: "Could not start the reading timer." }, { status: 503 });
    }

    return Response.json(
      {
        status: "reading",
        activeSeconds: session.activeSeconds,
        requiredSeconds: READING_REWARD_SECONDS,
        completedQuizSections: session.completedQuizSections ?? [],
        quizCount: quizzes.length,
        quizFailed: session.quizFailed ?? false,
        quizFailedSection: session.quizFailedSection ?? -1,
        gameVerified: session.gameVerified ?? false,
        category: reward.category,
        coins: reward.coins,
        title: reward.title,
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json(
      { error: "Could not start the reading timer." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
