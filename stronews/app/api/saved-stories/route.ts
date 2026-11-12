import { getAuthenticatedUserId, isAuthConfigured, readRequestJson } from "@/lib/auth";
import { UserModel } from "@/lib/auth/model";
import { connectMongo } from "@/lib/mongodb";
import { SavedStoryModel } from "@/lib/news/saved-story-model";

function notSignedIn() {
  return Response.json(
    { error: "Not signed in." },
    { status: 401, headers: { "Cache-Control": "no-store" } },
  );
}

function isArticleId(value: unknown): value is string {
  return typeof value === "string" && value.length > 0 && value.length <= 180;
}

function getArticleId(value: unknown) {
  return typeof value === "object" && value !== null && "articleId" in value
    ? value.articleId
    : null;
}

async function getExistingUserId(request: Request) {
  const userId = getAuthenticatedUserId(request);
  if (!userId) return null;

  await connectMongo();
  const user = await UserModel.findById(userId).select("_id").lean();
  return user ? String(user._id) : null;
}

export async function GET(request: Request) {
  if (!isAuthConfigured()) {
    return Response.json(
      { error: "Saved stories require authentication." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const userId = await getExistingUserId(request);
    if (!userId) return notSignedIn();
    const records = await SavedStoryModel.find({ userId })
      .sort({ createdAt: -1 })
      .select("articleId")
      .lean();
    return Response.json(
      { savedIds: records.map((record) => record.articleId) },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json(
      { error: "Could not load your saved stories." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}

export async function POST(request: Request) {
  if (!isAuthConfigured()) {
    return Response.json(
      { error: "Saved stories require authentication." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  const value = await readRequestJson(request);
  const articleId = getArticleId(value);
  if (!isArticleId(articleId)) {
    return Response.json(
      { error: "A valid story is required." },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    await connectMongo();
    const userId = await getExistingUserId(request);
    if (!userId) return notSignedIn();
    await SavedStoryModel.updateOne(
      { userId, articleId },
      { $setOnInsert: { userId, articleId } },
      { upsert: true },
    );
    return Response.json(
      { saved: true },
      { status: 201, headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json(
      { error: "Could not save this story." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}

export async function DELETE(request: Request) {
  if (!isAuthConfigured()) {
    return Response.json(
      { error: "Saved stories require authentication." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  const value = await readRequestJson(request);
  const articleId = getArticleId(value);
  if (!isArticleId(articleId)) {
    return Response.json(
      { error: "A valid story is required." },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    await connectMongo();
    const userId = await getExistingUserId(request);
    if (!userId) return notSignedIn();
    await SavedStoryModel.deleteOne({ userId, articleId });
    return Response.json(
      { saved: false },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json(
      { error: "Could not remove this saved story." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
