import { model, models, Schema, Types } from "mongoose";
import { ARTICLE_REWARD_CATEGORIES, type ArticleRewardCategory } from "@/lib/news/types";
import { READING_REWARD_SECONDS } from "@/lib/rewards/constants";

export type ReadingSession = {
  userId: Types.ObjectId;
  articleId: string;
  startedAt: Date;
  lastHeartbeatAt: Date;
  activeSeconds: number;
  completedQuizSections: number[];
  quizFailed: boolean;
  quizFailedSection: number;
  quizAttempts: number;
  gameVerified: boolean;
  gameCards: number[];
  gameMatchedCards: number[];
  gameFirstCard: number;
  expiresAt: Date;
};

const readingSessionSchema = new Schema<ReadingSession>(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    articleId: { type: String, required: true },
    startedAt: { type: Date, required: true },
    lastHeartbeatAt: { type: Date, required: true },
    activeSeconds: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: READING_REWARD_SECONDS,
    },
    completedQuizSections: { type: [Number], required: true, default: [] },
    quizFailed: { type: Boolean, required: true, default: false },
    quizFailedSection: { type: Number, required: true, default: -1 },
    quizAttempts: { type: Number, required: true, default: 0, min: 0 },
    gameVerified: { type: Boolean, required: true, default: false },
    gameCards: { type: [Number], required: true, default: [] },
    gameMatchedCards: { type: [Number], required: true, default: [] },
    gameFirstCard: { type: Number, required: true, default: -1 },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true },
);

readingSessionSchema.index({ userId: 1, articleId: 1 }, { unique: true });

export const ReadingSessionModel =
  models.ReadingSession ?? model<ReadingSession>("ReadingSession", readingSessionSchema);

export type RewardClaim = {
  userId: Types.ObjectId;
  articleId: string;
  title: string;
  category: ArticleRewardCategory;
  coins: number;
  createdAt: Date;
  updatedAt: Date;
};

const rewardClaimSchema = new Schema<RewardClaim>(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    articleId: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, enum: ARTICLE_REWARD_CATEGORIES, required: true },
    coins: { type: Number, required: true, min: 2, max: 3 },
  },
  { timestamps: true },
);

rewardClaimSchema.index({ userId: 1, articleId: 1 }, { unique: true });

export const RewardClaimModel =
  models.RewardClaim ?? model<RewardClaim>("RewardClaim", rewardClaimSchema);

export type DailySpinReward = {
  userId: Types.ObjectId;
  spinDate: string;
  coins: number;
  createdAt: Date;
  updatedAt: Date;
};

const dailySpinRewardSchema = new Schema<DailySpinReward>(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    spinDate: { type: String, required: true, match: /^\d{4}-\d{2}-\d{2}$/ },
    coins: { type: Number, required: true, min: 1, max: 8 },
  },
  { timestamps: true },
);

dailySpinRewardSchema.index({ userId: 1, spinDate: 1 }, { unique: true });

export const DailySpinRewardModel =
  models.DailySpinReward ??
  model<DailySpinReward>("DailySpinReward", dailySpinRewardSchema);
