import { RewardClaimModel } from "@/lib/rewards/models";
import { READING_REWARD_SECONDS } from "@/lib/rewards/constants";
import { getArticleRewardDetails } from "@/lib/rewards/reward-rules";
import { getCoinBalance } from "@/lib/rewards/balance";

type ReadingProgress = {
  activeSeconds: number;
  completedQuizSections: number[];
  quizFailed: boolean;
  gameVerified: boolean;
};

function isDuplicateKeyError(error: unknown) {
  return typeof error === "object" && error !== null && "code" in error && error.code === 11000;
}

export async function claimRewardIfEligible(
  userId: string,
  articleId: string,
  progress: ReadingProgress,
  quizCount: number,
) {
  const response = {
    activeSeconds: progress.activeSeconds,
    requiredSeconds: READING_REWARD_SECONDS,
    completedQuizSections: progress.completedQuizSections,
    quizCount,
    quizFailed: progress.quizFailed,
    gameVerified: progress.gameVerified,
  };

  if (progress.quizFailed) return { status: "quiz_failed" as const, ...response };
  if (progress.activeSeconds < READING_REWARD_SECONDS) return { status: "reading" as const, ...response };
  const completedCount = new Set(
    progress.completedQuizSections.filter(
      (sectionIndex) => Number.isInteger(sectionIndex) && sectionIndex >= 0 && sectionIndex < quizCount,
    ),
  ).size;
  if (completedCount < quizCount) {
    return { status: "quiz_required" as const, ...response };
  }
  if (!progress.gameVerified) return { status: "game_required" as const, ...response };

  const reward = await getArticleRewardDetails(articleId);
  if (!reward) return null;

  let earned = false;
  let grantedReward = reward;
  try {
    await RewardClaimModel.create({ userId, ...reward });
    earned = true;
  } catch (error) {
    if (!isDuplicateKeyError(error)) throw error;
    const existingClaim = await RewardClaimModel.findOne({ userId, articleId })
      .select("title category coins")
      .lean();
    if (!existingClaim) throw error;
    grantedReward = {
      ...reward,
      title: existingClaim.title,
      category: existingClaim.category,
      coins: existingClaim.coins,
    };
  }

  return {
    status: earned ? "earned" as const : "already_earned" as const,
    ...response,
    balance: await getCoinBalance(userId),
    reward: {
      category: grantedReward.category,
      coins: grantedReward.coins,
      title: grantedReward.title,
    },
  };
}
