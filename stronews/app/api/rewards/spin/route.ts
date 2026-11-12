import { randomInt } from "node:crypto";
import {
  getAuthenticatedUserId,
  isAuthConfigured,
} from "@/lib/auth";
import { UserModel } from "@/lib/auth/model";
import { connectMongo } from "@/lib/mongodb";
import { getCoinBalance } from "@/lib/rewards/balance";
import { DailySpinRewardModel } from "@/lib/rewards/models";

function getUtcSpinDate() {
  return new Date().toISOString().slice(0, 10);
}

function isDuplicateKeyError(error: unknown) {
  return typeof error === "object" && error !== null && "code" in error && error.code === 11000;
}

function unavailable() {
  return Response.json(
    { error: "Daily spins require MongoDB and AUTH_SECRET to be configured." },
    { status: 503, headers: { "Cache-Control": "no-store" } },
  );
}

function unauthorized() {
  return Response.json(
    { error: "Sign in to use the daily spin." },
    { status: 401, headers: { "Cache-Control": "no-store" } },
  );
}

export async function GET(request: Request) {
  if (!isAuthConfigured()) return unavailable();
  const userId = getAuthenticatedUserId(request);
  if (!userId) return unauthorized();

  try {
    await connectMongo();
    const user = await UserModel.findById(userId).select("_id").lean();
    if (!user) return unauthorized();

    const spinDate = getUtcSpinDate();
    const [spin, balance] = await Promise.all([
      DailySpinRewardModel.findOne({ userId, spinDate }).select("coins").lean(),
      getCoinBalance(userId),
    ]);

    return Response.json(
      { spinDate, alreadySpun: Boolean(spin), coins: spin?.coins ?? null, balance },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Could not load the daily spin status.", error);
    return Response.json(
      { error: "Could not load your daily spin. Please try again." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}

export async function POST(request: Request) {
  if (!isAuthConfigured()) return unavailable();
  const userId = getAuthenticatedUserId(request);
  if (!userId) return unauthorized();

  try {
    await connectMongo();
    const user = await UserModel.findById(userId).select("_id").lean();
    if (!user) return unauthorized();

    const spinDate = getUtcSpinDate();
    let spin = await DailySpinRewardModel.findOne({ userId, spinDate }).lean();
    let alreadySpun = Boolean(spin);

    if (!spin) {
      try {
        spin = await DailySpinRewardModel.create({
          userId,
          spinDate,
          coins: randomInt(1, 9),
        });
      } catch (error) {
        if (!isDuplicateKeyError(error)) throw error;
        spin = await DailySpinRewardModel.findOne({ userId, spinDate }).lean();
        alreadySpun = true;
      }
    }

    if (!spin) {
      throw new Error("The daily spin result could not be saved.");
    }

    return Response.json(
      {
        spinDate,
        alreadySpun,
        coins: spin.coins,
        balance: await getCoinBalance(userId),
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Could not complete the daily spin.", error);
    return Response.json(
      { error: "Could not complete your daily spin. Please try again." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
