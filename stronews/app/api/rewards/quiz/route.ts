import { getAuthenticatedUserId, isAuthConfigured, readRequestJson } from "@/lib/auth";
import { connectMongo } from "@/lib/mongodb";
import { UserModel } from "@/lib/auth/model";
import { ReadingSessionModel } from "@/lib/rewards/models";
import { claimRewardIfEligible } from "@/lib/rewards/claim";
import { getArticleQuizzes } from "@/lib/rewards/quiz-rules";
import { READING_REWARD_SECONDS } from "@/lib/rewards/constants";

const SESSION_TTL_MS = 30 * 60 * 1000;

function isArticleId(value: unknown): value is string {
  return typeof value === "string" && value.length > 0 && value.length <= 180;
}

function isInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value);
}

export async function POST(request: Request) {
  if (!isAuthConfigured()) {
    return Response.json(
      { error: "Rewards require MongoDB and AUTH_SECRET to be configured." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  const userId = getAuthenticatedUserId(request);
  if (!userId) return Response.json({ error: "Sign in to answer reward quizzes." }, { status: 401 });

  const body = await readRequestJson(request);
  if (
    typeof body !== "object" ||
    body === null ||
    !("articleId" in body) ||
    !("sectionIndex" in body) ||
    !("selectedOption" in body) ||
    !isArticleId(body.articleId) ||
    !isInteger(body.sectionIndex) ||
    !isInteger(body.selectedOption)
  ) {
    return Response.json({ error: "A story, section, and answer choice are required." }, { status: 400 });
  }

  try {
    await connectMongo();
    const user = await UserModel.findById(userId).select("_id").lean();
    if (!user) return Response.json({ error: "Sign in to answer reward quizzes." }, { status: 401 });

    const quizzes = await getArticleQuizzes(body.articleId);
    if (!quizzes?.length) return Response.json({ error: "This story has no reward quiz." }, { status: 404 });
    const quiz = quizzes[body.sectionIndex];
    if (!quiz || body.selectedOption < 0 || body.selectedOption >= quiz.options.length) {
      return Response.json({ error: "Choose a valid answer for this section." }, { status: 400 });
    }

    let session = await ReadingSessionModel.findOne({ userId, articleId: body.articleId });
    if (!session || session.expiresAt <= new Date()) {
      return Response.json({ error: "Start the reading timer before answering the quiz." }, { status: 410 });
    }

    const completedQuizSections = session.completedQuizSections ?? [];
    if (session.quizFailed) {
      return Response.json({
        status: "quiz_failed",
        activeSeconds: session.activeSeconds,
        requiredSeconds: READING_REWARD_SECONDS,
        completedQuizSections,
        quizCount: quizzes.length,
        quizFailed: true,
        quizFailedSection: session.quizFailedSection ?? -1,
      }, { headers: { "Cache-Control": "no-store" } });
    }

    if (completedQuizSections.includes(body.sectionIndex)) {
      const progress = await claimRewardIfEligible(
        userId,
        body.articleId,
        {
          activeSeconds: session.activeSeconds,
          completedQuizSections,
          quizFailed: false,
          gameVerified: session.gameVerified ?? false,
        },
        quizzes.length,
      );
      if (!progress) return Response.json({ error: "Story not found." }, { status: 404 });
      return Response.json(
        progress.status === "earned" || progress.status === "already_earned"
          ? progress
          : { ...progress, status: "correct" },
        { headers: { "Cache-Control": "no-store" } },
      );
    }

    if (body.selectedOption !== quiz.correctOption) {
      await ReadingSessionModel.updateOne(
        { _id: session._id, expiresAt: { $gt: new Date() }, quizFailed: { $ne: true } },
        {
          $set: { quizFailed: true, quizFailedSection: body.sectionIndex },
          $inc: { quizAttempts: 1 },
        },
      );
    } else {
      await ReadingSessionModel.updateOne(
        {
          _id: session._id,
          expiresAt: { $gt: new Date() },
          quizFailed: { $ne: true },
          completedQuizSections: { $ne: body.sectionIndex },
        },
        {
          $addToSet: { completedQuizSections: body.sectionIndex },
          $inc: { quizAttempts: 1 },
          $set: { expiresAt: new Date(Date.now() + SESSION_TTL_MS) },
        },
      );
    }

    session = await ReadingSessionModel.findById(session._id);
    if (!session || session.expiresAt <= new Date()) {
      return Response.json({ error: "Your reading session expired. Restart the timer." }, { status: 410 });
    }

    const progress = {
      activeSeconds: session.activeSeconds,
      completedQuizSections: session.completedQuizSections ?? [],
      quizFailed: session.quizFailed ?? false,
      quizFailedSection: session.quizFailedSection ?? -1,
      gameVerified: session.gameVerified ?? false,
    };
    if (progress.quizFailed) {
      return Response.json(
        { status: "incorrect", ...progress, requiredSeconds: READING_REWARD_SECONDS, quizCount: quizzes.length },
        { headers: { "Cache-Control": "no-store" } },
      );
    }

    const rewardResult = await claimRewardIfEligible(userId, body.articleId, progress, quizzes.length);
    if (!rewardResult) return Response.json({ error: "Story not found." }, { status: 404 });
    return Response.json(
      rewardResult.status === "earned" || rewardResult.status === "already_earned"
        ? rewardResult
        : { ...rewardResult, status: "correct" },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json(
      { error: "Could not record your quiz answer." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
