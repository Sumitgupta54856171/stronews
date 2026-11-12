import { model, models, Schema } from "mongoose";

export type User = {
  email: string;
  passwordHash?: string;
  passwordSalt?: string;
  googleId?: string;
  createdAt: Date;
  updatedAt: Date;
};

const userSchema = new Schema<User>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, maxlength: 254 },
    passwordHash: { type: String, select: false },
    passwordSalt: { type: String, select: false },
    googleId: { type: String, unique: true, sparse: true, select: false },
  },
  { timestamps: true },
);

export const UserModel = models.User ?? model<User>("User", userSchema);

let emailIndexPromise: Promise<string> | null = null;

export function ensureUniqueUserEmailIndex() {
  emailIndexPromise ??= UserModel.collection
    .createIndex({ email: 1 }, { unique: true, name: "email_1" })
    .catch((error: unknown) => {
      emailIndexPromise = null;
      throw error;
    });
  return emailIndexPromise;
}
