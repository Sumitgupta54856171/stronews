"use client";

import { useEffect, useRef, useState } from "react";
import { Play, RotateCcw, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const winningScore = 5;
type Stage = "idle" | "waiting" | "ready";

export default function ReactionDuelGame() {
  const [stage, setStage] = useState<Stage>("idle");
  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playerTwoScore, setPlayerTwoScore] = useState(0);
  const [message, setMessage] = useState("Player 1 uses A. Player 2 uses L.");
  const startedAtRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);
  const stageRef = useRef(stage);

  useEffect(() => {
    stageRef.current = stage;
  }, [stage]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  function startRound() {
    if (stage !== "idle" || playerOneScore >= winningScore || playerTwoScore >= winningScore) return;
    setStage("waiting");
    setMessage("Wait for green…");
    timeoutRef.current = window.setTimeout(() => {
      startedAtRef.current = performance.now();
      setStage("ready");
      setMessage("Green! Press your key.");
    }, 900 + Math.random() * 2600);
  }

  function awardPoint(player: 1 | 2) {
    const reaction = Math.round(performance.now() - startedAtRef.current);
    if (player === 1) setPlayerOneScore((score) => score + 1);
    else setPlayerTwoScore((score) => score + 1);
    setStage("idle");
    setMessage(`Player ${player} scored in ${reaction}ms.`);
  }

  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      const key = event.key.toLowerCase();
      if (key !== "a" && key !== "l") return;
      if (stageRef.current === "waiting") {
        if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
        setStage("idle");
        setMessage(`${key === "a" ? "Player 1" : "Player 2"} pressed too early.`);
        return;
      }
      if (stageRef.current === "ready") awardPoint(key === "a" ? 1 : 2);
    }
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  function restart() {
    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    setStage("idle");
    setPlayerOneScore(0);
    setPlayerTwoScore(0);
    setMessage("Player 1 uses A. Player 2 uses L.");
  }

  const isOver = playerOneScore >= winningScore || playerTwoScore >= winningScore;

  return (
    <Card className="rounded-xl border-[#e2dfd7] bg-white py-0">
      <CardContent className="p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-800">
              Multiplayer Games
            </p>
            <h2 className="font-editorial mt-1 text-3xl">Reaction Duel</h2>
          </div>
          <Badge variant="outline" className="h-6 rounded-full px-3 text-[11px] text-emerald-900">
            <Users /> {playerOneScore}–{playerTwoScore}
          </Badge>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <button
            className={`grid min-h-36 place-items-center rounded-xl border text-center transition ${
              stage === "ready"
                ? "border-emerald-700 bg-emerald-100"
                : "border-[#dedbd2] bg-[#f7f6f2]"
            }`}
            onClick={() => stage === "ready" && awardPoint(1)}
            type="button"
          >
            <span>
              <span className="font-editorial block text-2xl">Player 1</span>
              <span className="mt-1 block text-sm text-stone-600">Key: A</span>
            </span>
          </button>
          <button
            className={`grid min-h-36 place-items-center rounded-xl border text-center transition ${
              stage === "ready"
                ? "border-emerald-700 bg-emerald-100"
                : "border-[#dedbd2] bg-[#f7f6f2]"
            }`}
            onClick={() => stage === "ready" && awardPoint(2)}
            type="button"
          >
            <span>
              <span className="font-editorial block text-2xl">Player 2</span>
              <span className="mt-1 block text-sm text-stone-600">Key: L</span>
            </span>
          </button>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-medium text-stone-600" role="status">
            {isOver
              ? `${playerOneScore >= winningScore ? "Player 1" : "Player 2"} wins!`
              : message}
          </p>
          <div className="flex gap-2">
            <Button className="bg-[#176f58]" disabled={stage !== "idle" || isOver} onClick={startRound} type="button">
              <Play /> {stage === "idle" ? "Start round" : "Waiting…"}
            </Button>
            <Button onClick={restart} type="button" variant="outline">
              <RotateCcw /> Restart
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
