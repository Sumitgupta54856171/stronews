import { model, models, Schema, Types } from "mongoose";

export type SavedStory = {
  userId: Types.ObjectId;
  articleId: string;
  createdAt: Date;
  updatedAt: Date;
};

const savedStorySchema = new Schema<SavedStory>(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    articleId: { type: String, required: true, maxlength: 180 },
  },
  { timestamps: true },
);

savedStorySchema.index({ userId: 1, articleId: 1 }, { unique: true });

export const SavedStoryModel =
  models.SavedStory ?? model<SavedStory>("SavedStory", savedStorySchema);
