"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, CircleHelp, RotateCcw } from "lucide-react";
import { useToast } from "@/components/ui/toast-provider";
import type { NewsQuiz } from "@/lib/news/types";
import { getAuthHeaders } from "@/lib/auth-client";
import Link from "next/link";
import type { QuizProgress } from "@/lib/rewards/types";

type QuizResponse = QuizProgress & {
  activeSeconds: number;
  quizCount: number;
  status?: string;
  error?: string;
  reward?: { coins: number; title: string };
};

type ArticleSectionQuizProps = {
  articleId: string;
  sectionIndex: number;
  quiz: NewsQuiz;
  completed: boolean;
  failed: boolean;
  failedSectionIndex: number;
  onProgress: (progress: QuizProgress) => void;
};

export default function ArticleSectionQuiz({
  articleId,
  sectionIndex,
  quiz,
  completed,
  failed,
  failedSectionIndex,
  onProgress,
}: ArticleSectionQuizProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<"correct" | "incorrect" | "earned" | "already_earned" | null>(null);
  const [earnedCoins, setEarnedCoins] = useState(0);
  const toast = useToast();
  const isSignedIn = Boolean(getAuthHeaders().Authorization);

  async function submitAnswer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (selectedOption === null || submitting || completed || failed) return;
    setSubmitting(true);

    try {
      const response = await fetch("/api/rewards/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ articleId, sectionIndex, selectedOption }),
        cache: "no-store",
      });
      const payload = await response.json() as QuizResponse;
      if (!response.ok) throw new Error(payload.error ?? "Could not submit your answer.");

      onProgress({
        completedQuizSections: payload.completedQuizSections,
        quizFailed: payload.quizFailed,
        quizFailedSection: payload.quizFailedSection ?? -1,
      });
      if (payload.status === "incorrect" || payload.status === "quiz_failed") {
        setResult("incorrect");
        toast.error("Incorrect answer. Retry this quiz to continue toward your reward.");
      } else if (payload.status === "earned") {
        setResult("earned");
        const coins = payload.reward?.coins ?? 0;
        setEarnedCoins(coins);
        toast.success(`You earned ${coins} coins for this story!`);
      } else if (payload.status === "already_earned") {
        setResult("already_earned");
      } else {
        setResult("correct");
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not submit your answer.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  }

  async function retryQuiz() {
    if (submitting) return;
    setSubmitting(true);
    try {
      const response = await fetch("/api/rewards/quiz/retry", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ articleId, sectionIndex }),
        cache: "no-store",
      });
      const payload = await response.json() as QuizResponse;
      if (!response.ok) throw new Error(payload.error ?? "Could not retry this quiz.");
      onProgress({
        completedQuizSections: payload.completedQuizSections,
        quizFailed: false,
        quizFailedSection: -1,
      });
      setSelectedOption(null);
      setResult(null);
      toast.info("Quiz restarted. Try again.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not retry this quiz.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  }

  const isComplete = completed || result === "correct" || result === "earned" || result === "already_earned";
  const isFailed = (failed && (failedSectionIndex < 0 || failedSectionIndex === sectionIndex)) || result === "incorrect";
  const isBlocked = failed && !isFailed && !isComplete;

  return (
    <aside className="my-5 rounded-lg border border-[#dedbd2] bg-white p-4" aria-label={`Quiz for section ${sectionIndex + 1}`}>
      <h3 className="flex items-center gap-2 text-sm font-semibold text-[#171918]">
        <CircleHelp className="size-4 text-emerald-800" />
        Check your understanding
      </h3>
      <p className="mt-2 text-sm font-medium text-stone-800">{quiz.question}</p>
      <form className="mt-3 space-y-2" onSubmit={submitAnswer}>
        {quiz.options.map((option, optionIndex) => (
          <label
            key={`${sectionIndex}-${optionIndex}`}
            className={`flex cursor-pointer items-start gap-2 rounded-md border px-3 py-2 text-sm ${
              selectedOption === optionIndex ? "border-emerald-700 bg-emerald-50" : "border-stone-200"
            } ${(isComplete || isFailed) ? "cursor-default opacity-75" : ""}`}
          >
            <input
              type="radio"
              name={`article-quiz-${articleId}-${sectionIndex}`}
              className="mt-1 accent-emerald-800"
              checked={selectedOption === optionIndex}
              onChange={() => setSelectedOption(optionIndex)}
              disabled={isComplete || isFailed || isBlocked || submitting}
              required
            />
            <span>{option}</span>
          </label>
        ))}
        {!isComplete && !failed && isSignedIn && (
          <button
            type="submit"
            disabled={selectedOption === null || submitting}
            className="mt-1 inline-flex h-9 items-center rounded-md bg-[#176f58] px-3 text-xs font-semibold text-white hover:bg-[#125943] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "Checking…" : "Submit answer"}
          </button>
        )}
        {!isComplete && !failed && !isSignedIn && (
          <Link className="mt-1 inline-flex text-xs font-semibold text-emerald-900 underline" href="/login">
            Sign in to submit and earn coins
          </Link>
        )}
      </form>
      {isComplete && (
        <p className="mt-3 flex items-center gap-2 text-xs font-medium text-emerald-800" role="status">
          <CheckCircle2 className="size-4" />
          {result === "earned"
            ? `Correct — ${earnedCoins} coins earned.`
            : result === "already_earned"
              ? "Quiz complete. You have already earned coins for this story."
              : "Correct. This section quiz is complete."}
        </p>
      )}
      {isFailed && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-medium text-rose-700" role="alert">
            Incorrect answer. Retry this quiz to continue.
          </p>
          <button
            type="button"
            disabled={submitting}
            onClick={() => void retryQuiz()}
            className="inline-flex h-8 items-center gap-1.5 rounded-md border border-[#dedbd2] bg-white px-3 text-xs font-semibold text-stone-700 hover:bg-stone-50 disabled:opacity-50"
          >
            <RotateCcw className="size-3.5" /> {submitting ? "Retrying…" : "Retry quiz"}
          </button>
        </div>
      )}
      {isBlocked && (
        <p className="mt-3 text-xs text-stone-600">
          Retry section {failedSectionIndex + 1} before continuing to the next quiz.
        </p>
      )}
    </aside>
  );
}
