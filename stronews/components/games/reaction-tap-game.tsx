"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const totalRounds = 5;
type Stage = "idle" | "waiting" | "ready";

export default function ReactionTapGame() {
  const [stage, setStage] = useState<Stage>("idle");
  const [times, setTimes] = useState<number[]>([]);
  const timeoutRef = useRef<number | null>(null);
  const startedAtRef = useRef(0);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  function startRound() {
    if (stage !== "idle") return;
    setStage("waiting");
    timeoutRef.current = window.setTimeout(() => {
      startedAtRef.current = performance.now();
      setStage("ready");
    }, 900 + Math.random() * 2500);
  }

  function tapPanel() {
    if (stage === "idle") {
      startRound();
      return;
    }
    if (stage === "waiting") {
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
      setStage("idle");
      return;
    }

    const reactionTime = Math.round(performance.now() - startedAtRef.current);
    const nextTimes = [...times, reactionTime].slice(-totalRounds);
    setTimes(nextTimes);
    setStage("idle");
  }

  function restart() {
    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    setStage("idle");
    setTimes([]);
  }

  const average =
    times.length > 0
      ? Math.round(times.reduce((total, time) => total + time, 0) / times.length)
      : null;
  const best = times.length > 0 ? Math.min(...times) : null;

  return (
    <Card className="rounded-xl border-[#e2dfd7] bg-white py-0">
      <CardContent className="p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-800">
              Arcade Games
            </p>
            <h2 className="font-editorial mt-1 text-3xl">Reaction Tap</h2>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="h-6 rounded-full px-3 text-[11px] text-emerald-900">
              Round: {Math.min(times.length + (stage === "idle" ? 1 : 0), totalRounds)}/
              {totalRounds}
            </Badge>
            {average !== null && (
              <Badge variant="outline" className="h-6 rounded-full px-3 text-[11px] text-emerald-900">
                Avg: {average}ms
              </Badge>
            )}
          </div>
        </div>

        <button
          className={`mt-7 grid min-h-52 w-full place-items-center rounded-xl border text-center transition ${
            stage === "ready"
              ? "border-emerald-700 bg-emerald-100"
              : stage === "waiting"
                ? "border-stone-300 bg-stone-100"
                : "border-[#dedbd2] bg-[#f7f6f2]"
          }`}
          onClick={tapPanel}
          type="button"
        >
          <span className="px-5">
            <span className="font-editorial block text-3xl">
              {stage === "ready" ? "Tap now!" : stage === "waiting" ? "Wait for green…" : "Start"}
            </span>
            <span className="mt-2 block text-sm text-stone-600">
              {stage === "waiting"
                ? "Tap too early and the round restarts."
                : "Tap the panel, wait for green, then tap as fast as you can."}
            </span>
          </span>
        </button>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-stone-600" role="status">
            {best !== null
              ? `Best: ${best}ms · Average: ${average}ms`
              : "Complete 5 rounds to see your average."}
          </p>
          <Button variant="outline" className="bg-white" onClick={restart} type="button">
            <RotateCcw /> Restart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
