import { Types } from "mongoose";
import { DailySpinRewardModel, RewardClaimModel } from "@/lib/rewards/models";

export async function getCoinBalance(userId: string) {
  const objectId = new Types.ObjectId(userId);
  const [claims, spins] = await Promise.all([
    RewardClaimModel.aggregate([
      { $match: { userId: objectId } },
      { $group: { _id: null, coins: { $sum: "$coins" } } },
    ]),
    DailySpinRewardModel.aggregate([
      { $match: { userId: objectId } },
      { $group: { _id: null, coins: { $sum: "$coins" } } },
    ]),
  ]);
  return (claims[0]?.coins ?? 0) + (spins[0]?.coins ?? 0);
}
