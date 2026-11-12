"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Coins, ExternalLink, Trophy, Zap } from "lucide-react";
import { getAuthHeaders, getAuthToken } from "@/lib/auth-client";
import { useToast } from "@/components/ui/toast-provider";

type RewardClaim = {
  articleId: string;
  title: string;
  category: string;
  coins: number;
  earnedAt: string;
};

type RewardsResponse = {
  balance?: number;
  claims?: RewardClaim[];
  error?: string;
};

export default function RewardsDashboard() {
  const [balance, setBalance] = useState<number | null>(null);
  const [claims, setClaims] = useState<RewardClaim[]>([]);
  const [signedOut, setSignedOut] = useState(false);
  const [error, setError] = useState("");
  const toast = useToast();

  useEffect(() => {
    let active = true;
    if (!getAuthToken()) {
      setSignedOut(true);
      return () => {
        active = false;
      };
    }

    fetch("/api/rewards", { headers: getAuthHeaders(), cache: "no-store" })
      .then(async (response) => {
        const result = await response.json() as RewardsResponse;
        if (!active) return;
        if (response.status === 401) {
          setSignedOut(true);
          return;
        }
        if (!response.ok) {
          const message = result.error ?? "Could not load your reward balance.";
          setError(message);
          toast.error(message);
          return;
        }
        setBalance(result.balance ?? 0);
        setClaims(result.claims ?? []);
      })
      .catch(() => {
        if (active) {
          const message = "Could not reach the rewards service. Please try again later.";
          setError(message);
          toast.error(message);
        }
      });

    return () => {
      active = false;
    };
  }, [toast]);

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-7 sm:py-12">
      <div className="mb-7">
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-800">Reader rewards</p>
        <h1 className="font-editorial mt-1 text-4xl sm:text-5xl">Your coin balance</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600">
          Read a story for three active minutes, answer every section quiz correctly, and pass the final game check to earn coins. Each story can earn coins once per account.
        </p>
        <Link
          href="/spin"
          className="mt-4 inline-flex h-10 items-center gap-2 rounded-md bg-[#176f58] px-4 text-sm font-medium text-white transition hover:bg-[#125943]"
        >
          <Zap className="size-4" /> Try your daily spin
        </Link>
      </div>

      <section className="rounded-xl border border-[#d7e4dc] bg-[#edf3ef] p-6 sm:p-8">
        <div className="flex items-center gap-4">
          <span className="flex size-14 items-center justify-center rounded-full bg-white text-emerald-800">
            <Coins className="size-7" />
          </span>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-stone-600">Available coins</p>
            <p className="mt-1 font-mono text-4xl font-bold text-[#171918]">
              {balance ?? "—"}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-xl border border-[#e2dfd7] bg-white p-5 sm:p-6">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-[#171918]">
          <Trophy className="size-4 text-emerald-800" /> Coin rules
        </h2>
        <ul className="mt-3 space-y-2 text-sm text-stone-600">
          <li>3 coins: Technology, AI, finance, and business news.</li>
          <li>2 coins: all other news stories.</li>
          <li>Coins are awarded after three minutes of active reading, correct answers to all section quizzes, and passing the final game check.</li>
          <li>After reading and quizzes, match all 10 pairs in the game verification challenge to claim the story reward. You can retry the challenge.</li>
          <li>If you answer a quiz incorrectly, retry that question and answer it correctly to continue.</li>
          <li>Each signed-in account can earn coins once per story.</li>
          <li>Daily spin: one spin per UTC day for a server-assigned reward of 1–8 coins.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-[#171918]">Recent rewards</h2>
        {signedOut ? (
          <div className="mt-3 rounded-lg border border-[#e2dfd7] bg-white p-5">
            <p className="text-sm text-stone-600">Sign in to see your balance and reward history.</p>
            <Link href="/login" className="mt-3 inline-flex h-8 items-center rounded-md bg-[#176f58] px-3 text-xs font-medium text-white hover:bg-[#125943]">
              Sign in
            </Link>
          </div>
        ) : error ? (
          <p role="alert" className="mt-3 rounded-lg border border-rose-200 bg-white p-4 text-sm text-rose-700">{error}</p>
        ) : claims.length ? (
          <ul className="mt-3 divide-y divide-[#e9e6df] rounded-lg border border-[#e2dfd7] bg-white">
            {claims.map((claim) => (
              <li key={claim.articleId} className="flex flex-wrap items-center justify-between gap-3 p-4">
                <div className="min-w-0">
                  <Link href={`/news/${encodeURIComponent(claim.articleId)}`} className="font-medium text-[#171918] hover:text-emerald-800">
                    {claim.title}
                  </Link>
                  <p className="mt-1 text-xs text-stone-500">
                    {claim.category} · {new Date(claim.earnedAt).toLocaleDateString()}
                  </p>
                </div>
                <span className="shrink-0 font-mono text-sm font-semibold text-emerald-900">+{claim.coins} coins</span>
              </li>
            ))}
          </ul>
        ) : balance !== null ? (
          <div className="mt-3 rounded-lg border border-[#e2dfd7] bg-white p-5">
            <p className="text-sm text-stone-600">No rewards yet. Pick a story and start reading.</p>
            <Link href="/" className="mt-3 inline-flex h-8 items-center gap-1.5 rounded-md border border-[#dedbd2] px-3 text-xs font-medium text-stone-700 hover:bg-stone-50">
              <ExternalLink className="size-3.5" /> Browse stories
            </Link>
          </div>
        ) : null}
      </section>
    </main>
  );
}
