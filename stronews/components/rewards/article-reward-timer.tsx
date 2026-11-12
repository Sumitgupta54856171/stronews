"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Coins } from "lucide-react";
import { getAuthHeaders, getAuthToken } from "@/lib/auth-client";
import { useToast } from "@/components/ui/toast-provider";
import type { QuizProgress } from "@/lib/rewards/types";
import { READING_REWARD_SECONDS } from "@/lib/rewards/constants";
import ArticleGameVerification from "@/components/rewards/article-game-verification";

type RewardState =
  | "loading"
  | "signed_out"
  | "reading"
  | "earned"
  | "already_earned"
  | "quiz_failed"
  | "expired"
  | "error";

type RewardResponse = {
  status?: string;
  activeSeconds?: number;
  requiredSeconds?: number;
  category?: string;
  coins?: number;
  balance?: number;
  completedQuizSections?: number[];
  quizCount?: number;
  quizFailed?: boolean;
  quizFailedSection?: number;
  gameVerified?: boolean;
  reward?: { category: string; coins: number; title: string };
  error?: string;
};

type ArticleRewardTimerProps = {
  articleId: string;
  quizCount: number;
  onQuizProgress: (progress: QuizProgress) => void;
};

function formatTime(seconds: number) {
  const remaining = Math.max(0, READING_REWARD_SECONDS - seconds);
  return `${Math.floor(remaining / 60)}:${String(remaining % 60).padStart(2, "0")}`;
}

export default function ArticleRewardTimer({
  articleId,
  quizCount,
  onQuizProgress,
}: ArticleRewardTimerProps) {
  const [status, setStatus] = useState<RewardState>("loading");
  const [activeSeconds, setActiveSeconds] = useState(0);
  const [readingComplete, setReadingComplete] = useState(false);
  const [category, setCategory] = useState("");
  const [coins, setCoins] = useState(0);
  const [completedQuizSections, setCompletedQuizSections] = useState<number[]>([]);
  const [quizFailed, setQuizFailed] = useState(false);
  const [error, setError] = useState("");
  const toast = useToast();
  const handleGameRewarded = useCallback((resultStatus: "earned" | "already_earned", earnedCoins: number) => {
    setStatus(resultStatus);
    if (earnedCoins > 0) setCoins(earnedCoins);
    if (resultStatus === "earned") toast.success(`You earned ${earnedCoins} coins for this story!`);
  }, [toast]);

  useEffect(() => {
    let active = true;
    let timerId: number | undefined;
    let heartbeatId: number | undefined;
    let heartbeatBusy = false;
    let sessionReady = false;
    let lastServerSync = 0;
    let lastNotifiedError = "";
    const token = getAuthToken();

    function notifyError(message: string) {
      if (message !== lastNotifiedError) toast.error(message);
      lastNotifiedError = message;
    }

    function stopTimers() {
      if (timerId !== undefined) window.clearInterval(timerId);
      if (heartbeatId !== undefined) window.clearInterval(heartbeatId);
      sessionReady = false;
    }

    if (!token) {
      setStatus("signed_out");
      return () => {
        active = false;
      };
    }

    async function sendHeartbeat(isVisible: boolean) {
      if (heartbeatBusy) return;
      heartbeatBusy = true;
      try {
        const response = await fetch("/api/rewards/heartbeat", {
          method: "POST",
          headers: { "Content-Type": "application/json", ...getAuthHeaders() },
          body: JSON.stringify({ articleId, active: isVisible }),
          cache: "no-store",
        });
        const result = await response.json() as RewardResponse;
        if (!active) return;
        if (response.status === 401) {
          stopTimers();
          setStatus("signed_out");
          notifyError("Your session expired. Sign in again to earn coins.");
          return;
        }
        if (response.status === 410) {
          stopTimers();
          setStatus("expired");
          const message = result.error ?? "Reading session expired. Reload this story to restart.";
          setError(message);
          notifyError(message);
          return;
        }
        if (!response.ok) {
          const message = result.error ?? "Could not update your reward progress. Retrying…";
          setError(message);
          notifyError(message);
          return;
        }

        setError("");
        lastNotifiedError = "";
        onQuizProgress({
          completedQuizSections: result.completedQuizSections ?? [],
          quizFailed: result.quizFailed ?? false,
          quizFailedSection: result.quizFailedSection ?? -1,
        });
        setCompletedQuizSections(result.completedQuizSections ?? []);
        setQuizFailed(result.quizFailed ?? false);
        if (result.status === "earned" || result.status === "already_earned") {
          stopTimers();
          setStatus(result.status);
          const earnedCoins = result.reward?.coins ?? 0;
          setCoins(earnedCoins);
          if (result.status === "earned") toast.success(`You earned ${earnedCoins} coins for reading this story!`);
          return;
        }
        if (typeof result.activeSeconds === "number") {
          setActiveSeconds(result.activeSeconds);
          setReadingComplete(result.activeSeconds >= READING_REWARD_SECONDS);
          lastServerSync = Date.now();
        }
      } catch {
        if (active) {
          const message = "Connection interrupted. Your progress will retry automatically.";
          setError(message);
          notifyError(message);
        }
      } finally {
        heartbeatBusy = false;
      }
    }

    async function startReading() {
      try {
        const response = await fetch("/api/rewards/start", {
          method: "POST",
          headers: { "Content-Type": "application/json", ...getAuthHeaders() },
          body: JSON.stringify({ articleId }),
          cache: "no-store",
        });
        const result = await response.json() as RewardResponse;
        if (!active) return;
        if (response.status === 401) {
          setStatus("signed_out");
          notifyError("Sign in to earn coins for this story.");
          return;
        }
        if (!response.ok) {
          setStatus("error");
          const message = result.error ?? "Could not start the reading timer.";
          setError(message);
          notifyError(message);
          return;
        }
        onQuizProgress({
          completedQuizSections: result.completedQuizSections ?? [],
          quizFailed: result.quizFailed ?? false,
          quizFailedSection: result.quizFailedSection ?? -1,
        });
        setCompletedQuizSections(result.completedQuizSections ?? []);
        setQuizFailed(result.quizFailed ?? false);
        if (result.status === "quiz_failed") {
          setActiveSeconds(result.activeSeconds ?? 0);
        }
        if (result.status === "already_earned") {
          setStatus("already_earned");
          return;
        }

        setActiveSeconds(result.activeSeconds ?? 0);
        setReadingComplete((result.activeSeconds ?? 0) >= READING_REWARD_SECONDS);
        lastServerSync = Date.now();
        setCategory(result.category ?? "");
        setCoins(result.coins ?? 0);
        setStatus("reading");
        sessionReady = true;
        timerId = window.setInterval(() => {
          if (document.visibilityState === "visible") {
            setActiveSeconds((seconds) => Math.min(READING_REWARD_SECONDS, seconds + 1));
          }
        }, 1000);
        heartbeatId = window.setInterval(() => {
          if (document.visibilityState === "visible") void sendHeartbeat(true);
        }, 15_000);
        if ((result.activeSeconds ?? 0) >= READING_REWARD_SECONDS) void sendHeartbeat(true);
      } catch {
        if (active) {
          setStatus("error");
          const message = "Could not reach the rewards service.";
          setError(message);
          notifyError(message);
        }
      }
    }

    function onVisibilityChange() {
      if (sessionReady) void sendHeartbeat(document.visibilityState === "visible");
    }

    void startReading();
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      active = false;
      stopTimers();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (lastServerSync) void sendHeartbeat(false);
    };
  }, [articleId, onQuizProgress, toast]);

  const progress = Math.min(100, (activeSeconds / READING_REWARD_SECONDS) * 100);
  const quizComplete =
    quizCount > 0 &&
    new Set(completedQuizSections.filter((index) => index >= 0 && index < quizCount)).size >= quizCount;
  const canPlayVerification = status === "reading" && readingComplete && quizComplete && !quizFailed;

  return (
    <aside className="my-6 rounded-lg border border-[#d7e4dc] bg-[#edf3ef] p-4" aria-live="polite">
      <div className="flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-emerald-800">
          <Coins className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          {status === "signed_out" ? (
            <>
              <p className="text-sm font-semibold text-[#171918]">Earn coins while reading</p>
              <p className="mt-1 text-xs leading-5 text-stone-600">Sign in, read for 3 active minutes, answer every section quiz correctly, and pass the game check to earn coins.</p>
              <Link className="mt-3 inline-flex text-xs font-semibold text-emerald-900 underline" href="/login">Sign in to earn</Link>
            </>
          ) : status === "loading" ? (
            <p className="text-sm text-stone-600">Checking reading rewards…</p>
          ) : status === "already_earned" || status === "earned" ? (
            <>
              <p className="text-sm font-semibold text-[#171918]">
                {status === "earned"
                  ? `You earned ${coins} coins!`
                  : "You already earned coins for this story."}
              </p>
              {status === "earned" && (
                <p className="mt-1 text-xs text-stone-600">Added to your reward balance.</p>
              )}
              {status === "earned" && (
                <Link className="mt-2 inline-flex text-xs font-semibold text-emerald-900 underline" href="/rewards">
                  View rewards
                </Link>
              )}
            </>
          ) : status === "quiz_failed" ? (
            <p className="text-sm text-rose-700">A section quiz was answered incorrectly, so this story cannot earn a coin reward.</p>
          ) : status === "expired" || status === "error" ? (
            <p className="text-sm text-stone-700">{error || "The reading timer could not start."}</p>
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-[#171918]">
                  Read for 3 minutes to earn {coins} coins
                </p>
                <span className="font-mono text-xs font-semibold text-emerald-900">
                  {formatTime(activeSeconds)} left
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white">
                <div className="h-full rounded-full bg-emerald-700 transition-[width]" style={{ width: `${progress}%` }} />
              </div>
              <p className="mt-2 text-xs text-stone-600">
                {category} · Progress counts while this story is visible. Complete all {quizCount} section quizzes correctly, then match 10 pairs in the final game check.
              </p>
              {error && <p className="mt-2 text-xs text-amber-800">{error}</p>}
            </>
          )}
        </div>
      </div>
      {canPlayVerification && (
        <ArticleGameVerification articleId={articleId} onRewarded={handleGameRewarded} />
      )}
    </aside>
  );
}
