"use client";

import { useEffect, useRef, useState } from "react";
import { Activity, Crosshair, RotateCcw, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const totalBalls = 12;
const maxWickets = 3;
const highScoreKey = "stronews.cricket.highScore";

type Status = "ready" | "running" | "finished";
type DeliveryResult = { label: string; runs: number; isWicket: boolean };

function getShotOutcome(difference: number): DeliveryResult {
  if (difference <= 3) {
    return { label: "Perfect timing! SIX", runs: 6, isWicket: false };
  }
  if (difference <= 8) {
    return { label: "Boundary! FOUR runs", runs: 4, isWicket: false };
  }
  if (difference <= 16) {
    return { label: "Well placed. TWO runs", runs: 2, isWicket: false };
  }
  if (difference <= 28) {
    return { label: "Quick single", runs: 1, isWicket: false };
  }
  return { label: "Too far from the sweet spot. OUT!", runs: 0, isWicket: true };
}

export default function CricketRunGame() {
  const [position, setPosition] = useState(0);
  const [target, setTarget] = useState(50);
  const [deliverySpeed, setDeliverySpeed] = useState(50);
  const [ball, setBall] = useState(1);
  const [score, setScore] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [status, setStatus] = useState<Status>("ready");
  const [lastResult, setLastResult] = useState("Press Start to face the first ball.");
  const [history, setHistory] = useState<DeliveryResult[]>([]);
  const [highScore, setHighScore] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const savedScore = Number(window.localStorage.getItem(highScoreKey) ?? "0");
    if (Number.isFinite(savedScore) && savedScore > 0) setHighScore(savedScore);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearInterval(timerRef.current);
    };
  }, []);

  function finishDelivery(result: DeliveryResult) {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }

    setHistory((currentHistory) => [...currentHistory.slice(-7), result]);
    setLastResult(result.label);
    if (result.isWicket) setWickets((currentWickets) => currentWickets + 1);
    else setScore((currentScore) => currentScore + result.runs);

    const nextBall = ball + 1;
    const nextWickets = wickets + (result.isWicket ? 1 : 0);
    const inningsOver = nextBall > totalBalls || nextWickets >= maxWickets;
    setBall(Math.min(nextBall, totalBalls));
    setStatus(inningsOver ? "finished" : "ready");
  }

  useEffect(() => {
    if (status !== "running" || position < 100) return;
    finishDelivery({ label: "Bowled! You missed the ball.", runs: 0, isWicket: true });
  }, [position, status]);

  useEffect(() => {
    if (status !== "finished") return;
    if (score <= highScore) return;
    setHighScore(score);
    window.localStorage.setItem(highScoreKey, String(score));
  }, [highScore, score, status]);

  function startDelivery() {
    if (status !== "ready") return;
    const speed = 38 + Math.random() * 30;
    setPosition(0);
    setTarget(25 + Math.random() * 50);
    setDeliverySpeed(speed);
    setLastResult("Watch the ball and play in the green zone.");
    setStatus("running");

    timerRef.current = window.setInterval(() => {
      setPosition((currentPosition) => Math.min(currentPosition + 2.2, 100));
    }, speed);
  }

  function playShot() {
    if (status !== "running") return;
    finishDelivery(getShotOutcome(Math.abs(position - target)));
  }

  useEffect(() => {
    function handleSpace(event: KeyboardEvent) {
      if (event.code !== "Space" || event.repeat) return;
      event.preventDefault();
      if (status === "running") playShot();
      else if (status === "ready") startDelivery();
    }

    window.addEventListener("keydown", handleSpace);
    return () => window.removeEventListener("keydown", handleSpace);
  });

  function restart() {
    if (timerRef.current !== null) window.clearInterval(timerRef.current);
    timerRef.current = null;
    setPosition(0);
    setTarget(50);
    setDeliverySpeed(50);
    setBall(1);
    setScore(0);
    setWickets(0);
    setStatus("ready");
    setLastResult("Press Start to face the first ball.");
    setHistory([]);
  }

  const ballsFaced = status === "running" ? ball - 1 : ball;
  const strikeRate = ballsFaced > 0 ? Math.round((score / ballsFaced) * 100) : 0;

  return (
    <Card className="rounded-xl border-[#e2dfd7] bg-white py-0">
      <CardContent className="p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-800">
              Cricket & Sports Games
            </p>
            <h2 className="font-editorial mt-1 text-3xl">Cricket Run</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="h-6 rounded-full px-3 text-[11px] text-emerald-900">
              Ball {Math.min(ball, totalBalls)}/{totalBalls}
            </Badge>
            <Badge variant="outline" className="h-6 rounded-full px-3 text-[11px] text-emerald-900">
              <Trophy /> {score}/{wickets}
            </Badge>
            <Badge variant="outline" className="h-6 rounded-full px-3 text-[11px] text-emerald-900">
              <Activity /> SR {strikeRate}
            </Badge>
            <Badge variant="outline" className="h-6 rounded-full px-3 text-[11px] text-emerald-900">
              Best {highScore}
            </Badge>
          </div>
        </div>

        <section className="mt-7 rounded-xl border border-[#dedbd2] bg-[#f7f6f2] p-4">
          <div className="flex items-center justify-between gap-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-500">
            <span className="inline-flex items-center gap-1.5">
              <Crosshair className="size-3.5 text-emerald-700" /> Timing meter
            </span>
            <span>Delivery speed: {Math.round(52000 / deliverySpeed)}%</span>
          </div>

          <div className="relative mt-4 h-14 overflow-hidden rounded-lg border border-[#d7d3ca] bg-white">
            <div
              className="absolute inset-y-0 border-x border-emerald-600/60 bg-emerald-500/25"
              style={{ left: `${target - 16}%`, width: "32%" }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-y-0 border-x border-emerald-700/70 bg-emerald-500/40"
              style={{ left: `${target - 8}%`, width: "16%" }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-y-0 bg-emerald-700/80"
              style={{ left: `${target - 3}%`, width: "6%" }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-y-1 w-3 rounded-full bg-rose-600 shadow-[0_0_0_3px_rgba(244,63,94,0.18)]"
              style={{ left: `${position}%` }}
              aria-hidden="true"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {history.map((result, index) => (
              <span
                key={`${index}-${result.label}`}
                className={`grid size-6 place-items-center rounded-full text-[10px] font-bold ${
                  result.isWicket
                    ? "bg-rose-100 text-rose-800"
                    : result.runs >= 4
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-stone-100 text-stone-700"
                }`}
              >
                {result.isWicket ? "W" : result.runs}
              </span>
            ))}
            {history.length === 0 && (
              <span className="text-xs text-stone-500">
                Your recent deliveries will appear here.
              </span>
            )}
          </div>
        </section>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-medium text-stone-600" role="status">
            {status === "finished"
              ? `Innings complete! You scored ${score} for ${wickets}. Best: ${highScore}.`
              : lastResult}
          </p>
          <div className="flex flex-wrap gap-2">
            {status === "ready" && (
              <Button className="bg-[#176f58]" onClick={startDelivery} type="button">
                {ball === 1 ? "Start innings" : "Next ball"}
              </Button>
            )}
            {status === "running" && (
              <Button className="bg-[#176f58]" onClick={playShot} type="button">
                Play shot
              </Button>
            )}
            <Button onClick={restart} type="button" variant="outline">
              <RotateCcw /> Restart
            </Button>
          </div>
        </div>
        <p className="mt-2 text-xs text-stone-500">
          Tip: press{" "}
          <kbd className="rounded border border-stone-300 bg-white px-1">Space</kbd> to start a
          delivery or play a shot.
        </p>
      </CardContent>
    </Card>
  );
}
