import { getAuthenticatedUserId, isAuthConfigured, readRequestJson } from "@/lib/auth";
import { UserModel } from "@/lib/auth/model";
import { connectMongo } from "@/lib/mongodb";
import { getArticleQuizzes } from "@/lib/rewards/quiz-rules";
import { ReadingSessionModel } from "@/lib/rewards/models";

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
  if (!userId) return Response.json({ error: "Sign in to retry this quiz." }, { status: 401 });

  const body = await readRequestJson(request);
  if (
    typeof body !== "object" ||
    body === null ||
    !("articleId" in body) ||
    !("sectionIndex" in body) ||
    !isArticleId(body.articleId) ||
    typeof body.sectionIndex !== "number" ||
    !Number.isInteger(body.sectionIndex)
  ) {
    return Response.json({ error: "A story and valid quiz section are required." }, { status: 400 });
  }

  try {
    await connectMongo();
    const user = await UserModel.findById(userId).select("_id").lean();
    if (!user) return Response.json({ error: "Sign in to retry this quiz." }, { status: 401 });

    const quizzes = await getArticleQuizzes(body.articleId);
    if (!quizzes?.[body.sectionIndex]) {
      return Response.json({ error: "This story has no quiz in that section." }, { status: 404 });
    }

    const now = new Date();
    const session = await ReadingSessionModel.findOneAndUpdate(
      {
        userId,
        articleId: body.articleId,
        expiresAt: { $gt: now },
        quizFailed: true,
        $or: [{ quizFailedSection: body.sectionIndex }, { quizFailedSection: { $exists: false } }, { quizFailedSection: -1 }],
      },
      {
        $set: {
          quizFailed: false,
          quizFailedSection: -1,
          expiresAt: new Date(now.getTime() + 30 * 60 * 1000),
        },
      },
      { returnDocument: "after" },
    );
    if (!session) {
      return Response.json({ error: "This quiz is not waiting for a retry." }, { status: 409 });
    }

    return Response.json(
      {
        status: "retry_ready",
        activeSeconds: session.activeSeconds,
        completedQuizSections: session.completedQuizSections ?? [],
        quizFailed: false,
        quizFailedSection: -1,
        quizCount: quizzes.length,
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json(
      { error: "Could not restart this quiz." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
