"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RotateCcw, Trophy } from "lucide-react";
import { getAuthHeaders } from "@/lib/auth-client";
import { REWARD_GAME_TARGET_PAIRS } from "@/lib/rewards/game-rules";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast-provider";

type RevealedCard = { index: number; value: number };
type GameResponse = {
  status?: string;
  matchedPairs?: number;
  targetPairs?: number;
  matchedCards?: RevealedCard[];
  firstCard?: RevealedCard | null;
  revealedCards?: RevealedCard[];
  pairMatched?: boolean;
  reward?: { coins: number; title: string };
  error?: string;
};

type ArticleGameVerificationProps = {
  articleId: string;
  onRewarded: (status: "earned" | "already_earned", coins: number) => void;
};

export default function ArticleGameVerification({
  articleId,
  onRewarded,
}: ArticleGameVerificationProps) {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [visibleCards, setVisibleCards] = useState<Record<number, number>>({});
  const mismatchTimer = useRef<number | null>(null);
  const toast = useToast();

  const sendAction = useCallback(async (action: "start" | "flip" | "retry", cardIndex?: number) => {
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/rewards/game", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ articleId, action, ...(cardIndex === undefined ? {} : { cardIndex }) }),
        cache: "no-store",
      });
      const result = await response.json() as GameResponse;
      if (!response.ok) throw new Error(result.error ?? "Could not verify the game challenge.");

      const knownCards: Record<number, number> = {};
      for (const card of result.matchedCards ?? []) knownCards[card.index] = card.value;
      if (result.firstCard) knownCards[result.firstCard.index] = result.firstCard.value;
      for (const card of result.revealedCards ?? []) knownCards[card.index] = card.value;
      setVisibleCards(knownCards);
      setMatchedPairs(result.matchedPairs ?? 0);

      if (result.status === "earned" || result.status === "already_earned") {
        onRewarded(result.status, result.reward?.coins ?? 0);
      } else if (result.pairMatched === false && result.revealedCards?.length) {
        if (mismatchTimer.current !== null) window.clearTimeout(mismatchTimer.current);
        mismatchTimer.current = window.setTimeout(() => {
          setVisibleCards((current) => {
            const remaining: Record<number, number> = {};
            for (const card of result.matchedCards ?? []) remaining[card.index] = card.value;
            return remaining;
          });
          mismatchTimer.current = null;
        }, 850);
      }
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : "Could not verify the game challenge.";
      setError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  }, [articleId, onRewarded, toast]);

  useEffect(() => {
    void sendAction("start");
    return () => {
      if (mismatchTimer.current !== null) window.clearTimeout(mismatchTimer.current);
    };
  }, [sendAction]);

  function retryChallenge() {
    if (mismatchTimer.current !== null) window.clearTimeout(mismatchTimer.current);
    mismatchTimer.current = null;
    setVisibleCards({});
    setMatchedPairs(0);
    void sendAction("retry");
  }

  return (
    <Card className="mt-4 rounded-lg border-[#cbded2] bg-white py-0">
      <CardContent className="p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-emerald-800">
              Final verification
            </p>
            <h3 className="mt-1 flex items-center gap-2 text-sm font-semibold text-[#171918]">
              <Trophy className="size-4 text-emerald-800" /> Match {REWARD_GAME_TARGET_PAIRS} pairs to claim your news coins
            </h3>
            <p className="mt-1 text-xs leading-5 text-stone-600">
              Each matching pair is one point. Match all 10 pairs; use Retry to restart this challenge.
            </p>
          </div>
          <span className="rounded-full bg-[#edf3ef] px-3 py-1 font-mono text-xs font-semibold text-emerald-900">
            Score: {matchedPairs}/{REWARD_GAME_TARGET_PAIRS}
          </span>
        </div>

        {loading ? (
          <p className="mt-4 text-sm text-stone-600">Preparing your game check…</p>
        ) : (
          <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-5">
            {Array.from({ length: REWARD_GAME_TARGET_PAIRS * 2 }, (_, index) => {
              const isVisible = visibleCards[index] !== undefined;
              return (
                <button
                  key={index}
                  type="button"
                  disabled={submitting || isVisible}
                  onClick={() => void sendAction("flip", index)}
                  aria-label={isVisible ? `Card ${index + 1}: ${visibleCards[index]}` : `Reveal card ${index + 1}`}
                  className={`grid aspect-square place-items-center rounded-lg border text-lg font-bold transition ${
                    isVisible
                      ? "border-emerald-700 bg-emerald-50 text-emerald-900"
                      : "border-[#dedbd2] bg-[#f7f6f2] text-stone-500 hover:border-emerald-700"
                  } disabled:cursor-default`}
                >
                  {isVisible ? visibleCards[index] : "?"}
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          {error ? <p role="alert" className="text-xs text-rose-700">{error}</p> : <span />}
          <Button
            type="button"
            variant="outline"
            className="bg-white"
            onClick={retryChallenge}
            disabled={submitting || loading}
          >
            <RotateCcw /> Retry challenge
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
