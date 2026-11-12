import { getAuthenticatedUserId, isAuthConfigured } from "@/lib/auth";
import { connectMongo } from "@/lib/mongodb";
import { UserModel } from "@/lib/auth/model";
import { RewardClaimModel } from "@/lib/rewards/models";
import { getCoinBalance } from "@/lib/rewards/balance";

export async function GET(request: Request) {
  if (!isAuthConfigured()) {
    return Response.json(
      { error: "Rewards require MongoDB and AUTH_SECRET to be configured." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  const userId = getAuthenticatedUserId(request);
  if (!userId) {
    return Response.json({ error: "Sign in to view your rewards." }, { status: 401 });
  }

  try {
    await connectMongo();
    const user = await UserModel.findById(userId).select("_id").lean();
    if (!user) return Response.json({ error: "Sign in to view your rewards." }, { status: 401 });

    const [balance, claims] = await Promise.all([
      getCoinBalance(userId),
      RewardClaimModel.find({ userId })
        .sort({ createdAt: -1 })
        .limit(100)
        .select("articleId title category coins createdAt")
        .lean(),
    ]);

    return Response.json(
      {
        balance,
        claims: claims.map((claim) => ({
          articleId: claim.articleId,
          title: claim.title,
          category: claim.category,
          coins: claim.coins,
          earnedAt: claim.createdAt,
        })),
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json(
      { error: "Could not load your rewards." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
