import { newsResponse } from "@/lib/news/data";
import { connectMongo } from "@/lib/mongodb";
import { NewsArticleModel } from "@/lib/news/model";
import { isDeviceType, NewsViewCounterModel } from "@/lib/news/view-counter";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "A valid device category is required." }, { status: 400 });
  }

  if (
    typeof payload !== "object" ||
    payload === null ||
    !("deviceType" in payload) ||
    !isDeviceType(payload.deviceType)
  ) {
    return Response.json({ error: "Choose mobile, tablet, or desktop." }, { status: 400 });
  }

  if (!process.env.MONGODB_URI) {
    return Response.json({ error: "View tracking requires MONGODB_URI." }, { status: 503 });
  }

  try {
    await connectMongo();
    const isKnownStory =
      newsResponse.articles.some((article) => article.id === id) ||
      Boolean(await NewsArticleModel.exists({ slug: id }));
    if (!isKnownStory) return Response.json({ error: "Story not found." }, { status: 404 });

    const otherDeviceCounts = Object.fromEntries(
      (["mobile", "tablet", "desktop"] as const)
        .filter((device) => device !== payload.deviceType)
        .map((device) => [`deviceViews.${device}`, 0]),
    );
    const counter = await NewsViewCounterModel.findOneAndUpdate(
      { slug: id },
      {
        $inc: {
          viewCount: 1,
          [`deviceViews.${payload.deviceType}`]: 1,
        },
        $setOnInsert: { slug: id, ...otherDeviceCounts },
      },
      { returnDocument: "after", upsert: true, setDefaultsOnInsert: false },
    ).lean();

    if (!counter) {
      return Response.json({ error: "Could not record this story view." }, { status: 503 });
    }

    return Response.json({
      viewCount: counter.viewCount,
      deviceViews: counter.deviceViews,
    });
  } catch {
    return Response.json({ error: "Could not record this story view." }, { status: 503 });
  }
}
