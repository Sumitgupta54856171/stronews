"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Coins, RotateCw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAuthHeaders, getAuthToken } from "@/lib/auth-client";

type SpinResponse = {
  spinDate?: string;
  alreadySpun?: boolean;
  coins?: number | null;
  balance?: number;
  error?: string;
};

const segments = Array.from({ length: 8 }, (_, index) => index + 1);
export default function DailySpinWheel() {
  const [signedOut, setSignedOut] = useState(false);
  const [loading, setLoading] = useState(true);
  const [spinning, setSpinning] = useState(false);
  const [alreadySpun, setAlreadySpun] = useState(false);
  const [coins, setCoins] = useState<number | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    if (!getAuthToken()) {
      setSignedOut(true);
      setLoading(false);
      return () => {
        active = false;
      };
    }

    fetch("/api/rewards/spin", { headers: getAuthHeaders(), cache: "no-store" })
      .then(async (response) => {
        const result = await response.json() as SpinResponse;
        if (!active) return;
        if (response.status === 401) {
          setSignedOut(true);
          return;
        }
        if (!response.ok) throw new Error(result.error ?? "Could not load spin status.");
        setAlreadySpun(result.alreadySpun ?? false);
        setCoins(result.coins ?? null);
        setBalance(result.balance ?? null);
      })
      .catch((requestError: unknown) => {
        if (active) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Could not load your daily spin.",
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  async function spin() {
    if (spinning || alreadySpun || signedOut) return;
    setSpinning(true);
    setError("");

    try {
      const response = await fetch("/api/rewards/spin", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({}),
        cache: "no-store",
      });
      const result = await response.json() as SpinResponse;
      if (response.status === 401) {
        setSignedOut(true);
        setSpinning(false);
        return;
      }
      if (!response.ok) throw new Error(result.error ?? "Could not spin the wheel.");
      const prize = result.coins;
      if (typeof prize !== "number") {
        throw new Error("The spin result was missing. Please refresh and check your balance.");
      }

      setAlreadySpun(true);
      setCoins(prize);
      setBalance(result.balance ?? null);

      if (!result.alreadySpun) {
        setRotation((current) => current + 360 * 5 - (prize - 1) * 45);
        window.setTimeout(() => setSpinning(false), 5200);
      } else {
        setSpinning(false);
      }
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Could not spin the wheel. Please try again.",
      );
      setSpinning(false);
    }
  }

  const wheelBackground =
    "conic-gradient(from -22.5deg, #176f58 0deg 45deg, #e6eee9 45deg 90deg, #b97828 90deg 135deg, #f3ead7 135deg 180deg, #517b9d 180deg 225deg, #e6eee9 225deg 270deg, #ad5260 270deg 315deg, #f3ead7 315deg 360deg)";

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-7 sm:py-12">
      <header className="mb-7 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-800">
          Daily reader rewards
        </p>
        <h1 className="font-editorial mt-1 text-4xl sm:text-5xl">Daily spin</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-stone-600">
          Spin once each UTC day for a chance to win 1–8 coins. Your result is saved to your account.
        </p>
      </header>

      <section className="rounded-xl border border-[#d7e4dc] bg-[#edf3ef] p-5 sm:p-8">
        <div className="mb-5 flex items-center justify-center gap-2 text-sm font-medium text-stone-700">
          <Coins className="size-4 text-emerald-800" />
          Coin balance: <span className="font-mono font-bold">{balance ?? "—"}</span>
        </div>

        <div className="relative mx-auto aspect-square w-[min(76vw,320px)]">
          <div
            aria-label="Wheel with coin prizes from 1 to 8"
            className="absolute inset-0 rounded-full border-[8px] border-white shadow-xl"
            style={{
              background: wheelBackground,
              transform: `rotate(${rotation}deg)`,
              transition: spinning
                ? "transform 5s cubic-bezier(0.12, 0.72, 0.12, 1)"
                : "none",
            }}
          >
            {segments.map((value) => (
              <span
                key={value}
                className="absolute left-1/2 top-1/2 -ml-4 -mt-4 grid size-8 place-items-center rounded-full bg-white/90 text-sm font-bold text-[#171918] shadow-sm"
                style={{
                  transform: `rotate(${(value - 1) * 45}deg) translateY(-min(34vw, 136px)) rotate(-${(value - 1) * 45}deg)`,
                }}
              >
                {value}
              </span>
            ))}
          </div>
          <span className="absolute -top-2 left-1/2 z-10 -translate-x-1/2 border-x-[12px] border-t-[25px] border-x-transparent border-t-rose-700 drop-shadow" />
          <div className="absolute inset-0 grid place-items-center">
            <Button
              type="button"
              onClick={() => void spin()}
              disabled={loading || spinning || alreadySpun || signedOut}
              className="size-20 rounded-full border-4 border-white bg-[#171918] text-white shadow-lg hover:bg-[#303330]"
              aria-label="Spin for daily coins"
            >
              <span className="flex flex-col items-center gap-1">
                <RotateCw className="size-5" />
                <span className="text-[10px]">{spinning ? "SPINNING" : "SPIN"}</span>
              </span>
            </Button>
          </div>
        </div>

        <div className="mt-6 min-h-12 text-center" aria-live="polite">
          {loading ? (
            <p className="text-sm text-stone-600">Checking today’s spin…</p>
          ) : signedOut ? (
            <p className="text-sm text-stone-600">
              <Link className="font-semibold text-emerald-900 underline" href="/login?next=/spin">
                Sign in
              </Link>{" "}
              to save your daily coins.
            </p>
          ) : alreadySpun ? (
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-900">
              <Sparkles className="size-4" />
              Today you won {coins} {coins === 1 ? "coin" : "coins"}. Come back tomorrow!
            </p>
          ) : (
            <p className="text-sm text-stone-600">Tap Spin to claim today’s random 1–8 coin reward.</p>
          )}
          {error && <p className="mt-2 text-xs text-rose-700" role="alert">{error}</p>}
        </div>
      </section>

    </main>
  );
}
