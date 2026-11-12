import { getAuthenticatedUserId, isAuthConfigured, readRequestJson } from "@/lib/auth";
import { connectMongo } from "@/lib/mongodb";
import { UserModel } from "@/lib/auth/model";
import { ReadingSessionModel } from "@/lib/rewards/models";
import { claimRewardIfEligible } from "@/lib/rewards/claim";
import { READING_REWARD_SECONDS } from "@/lib/rewards/constants";
import { getArticleQuizzes } from "@/lib/rewards/quiz-rules";

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
  const active = typeof body === "object" && body !== null && "active" in body
    ? body.active
    : undefined;
  if (!isArticleId(articleId) || typeof active !== "boolean") {
    return Response.json({ error: "A valid story and reading status are required." }, { status: 400 });
  }

  try {
    await connectMongo();
    const user = await UserModel.findById(userId).select("_id").lean();
    if (!user) return Response.json({ error: "Sign in to earn coins." }, { status: 401 });

    const now = new Date();
    let session = await ReadingSessionModel.findOne({ userId, articleId });
    if (!session || session.expiresAt <= now) {
      return Response.json(
        { error: "Your reading session expired. Restart the timer on this story." },
        { status: 410 },
      );
    }

    if (!active) {
      await ReadingSessionModel.updateOne(
        { _id: session._id, lastHeartbeatAt: session.lastHeartbeatAt },
        { $set: { lastHeartbeatAt: now, expiresAt: new Date(now.getTime() + SESSION_TTL_MS) } },
      );
    } else {
      const elapsedSeconds = Math.floor((now.getTime() - session.lastHeartbeatAt.getTime()) / 1000);
      if (elapsedSeconds >= 10) {
        const creditedSeconds = Math.min(20, elapsedSeconds);
        await ReadingSessionModel.updateOne(
          { _id: session._id, lastHeartbeatAt: session.lastHeartbeatAt },
          {
            $set: {
              activeSeconds: Math.min(READING_REWARD_SECONDS, session.activeSeconds + creditedSeconds),
              lastHeartbeatAt: now,
              expiresAt: new Date(now.getTime() + SESSION_TTL_MS),
            },
          },
        );
      }
    }

    session = await ReadingSessionModel.findById(session._id);
    if (!session) {
      return Response.json({ error: "Your reading session expired." }, { status: 410 });
    }

    const quizzes = await getArticleQuizzes(articleId);
    if (!quizzes?.length) return Response.json({ error: "This story has no reward quiz." }, { status: 409 });
    const rewardResult = await claimRewardIfEligible(
      userId,
      articleId,
      {
        activeSeconds: session.activeSeconds,
        completedQuizSections: session.completedQuizSections ?? [],
        quizFailed: session.quizFailed ?? false,
        gameVerified: session.gameVerified ?? false,
      },
      quizzes.length,
    );
    if (!rewardResult) return Response.json({ error: "Story not found." }, { status: 404 });
    return Response.json(
      { ...rewardResult, quizFailedSection: session.quizFailedSection ?? -1 },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json(
      { error: "Could not update your reading reward." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
