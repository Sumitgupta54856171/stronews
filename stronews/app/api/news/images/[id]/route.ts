import { Readable } from "node:stream";
import mongoose from "mongoose";
import { getNewsImageBucket } from "@/lib/news/images";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  if (!mongoose.mongo.ObjectId.isValid(id)) {
    return Response.json({ error: "Image not found." }, { status: 404 });
  }

  try {
    const bucket = await getNewsImageBucket();
    const [file] = await bucket.find({ _id: new mongoose.mongo.ObjectId(id) }).limit(1).toArray();
    if (!file) return Response.json({ error: "Image not found." }, { status: 404 });

    const stream = bucket.openDownloadStream(file._id);
    return new Response(Readable.toWeb(stream) as ReadableStream, {
      headers: {
        "Content-Type": typeof file.metadata?.contentType === "string"
          ? file.metadata.contentType
          : "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return Response.json({ error: "Could not load this image." }, { status: 503 });
  }
}