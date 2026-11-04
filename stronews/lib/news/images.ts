import mongoose from "mongoose";
import { connectMongo } from "@/lib/mongodb";

export async function getNewsImageBucket() {
  await connectMongo();
  const database = mongoose.connection.db;
  if (!database) throw new Error("MongoDB is not connected.");
  return new mongoose.mongo.GridFSBucket(database, { bucketName: "newsImages" });
}

export async function getImageValidationError(file: File) {
  if (file.size === 0 || file.size > 8 * 1024 * 1024) return "Each image must be smaller than 8 MB.";
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    return "Images must be JPEG, PNG, or WebP files.";
  }
  const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  const isJpeg = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  const isPng = bytes.slice(0, 8).join(",") === "137,80,78,71,13,10,26,10";
  const isWebp = String.fromCharCode(...bytes.slice(0, 4)) === "RIFF"
    && String.fromCharCode(...bytes.slice(8, 12)) === "WEBP";
  if (!(isJpeg || isPng || isWebp)) return "The file contents are not a valid supported image.";
  return undefined;
}

export async function storeNewsImage(file: File, id: string) {
  const imageId = new mongoose.mongo.ObjectId(id);
  const bucket = await getNewsImageBucket();
  const bytes = new Uint8Array(await file.arrayBuffer());

  await new Promise<void>((resolve, reject) => {
    const upload = bucket.openUploadStreamWithId(imageId, file.name, {
      metadata: { contentType: file.type },
    });
    upload.once("error", reject);
    upload.once("finish", resolve);
    upload.end(bytes);
  });
}

export async function deleteNewsImage(id: string) {
  const bucket = await getNewsImageBucket();
  await bucket.delete(new mongoose.mongo.ObjectId(id));
}