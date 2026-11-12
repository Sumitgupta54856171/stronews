"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Play, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const laneCount = 5;
const rows = 8;
type Status = "idle" | "running" | "over";

export default function LaneRacerGame() {
  const [playerLane, setPlayerLane] = useState(2);
  const [obstacleLane, setObstacleLane] = useState(0);
  const [distance, setDistance] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [highScore, setHighScore] = useState(0);
  const statusRef = useRef(status);
  const playerLaneRef = useRef(playerLane);

  useEffect(() => {
    statusRef.current = status;
  }, [status]);
  useEffect(() => {
    playerLaneRef.current = playerLane;
  }, [playerLane]);

  const step = useCallback(() => {
    setDistance((currentDistance) => currentDistance + 1);
    setObstacleLane((currentLane) => {
      const nextLane = Math.floor(Math.random() * laneCount);
      if (nextLane === playerLaneRef.current) {
        setStatus("over");
      }
      return nextLane;
    });
  }, []);

  useEffect(() => {
    if (status !== "running") return;
    const interval = window.setInterval(step, 250);
    return () => window.clearInterval(interval);
  }, [status, step]);

  useEffect(() => {
    if (status === "over" && distance > highScore) setHighScore(distance);
  }, [distance, highScore, status]);

  const move = useCallback((direction: -1 | 1) => {
    if (statusRef.current !== "running") return;
    setPlayerLane((currentLane) => Math.min(laneCount - 1, Math.max(0, currentLane + direction)));
  }, []);

  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        move(-1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        move(1);
      }
    }
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [move]);

  function restart() {
    setPlayerLane(2);
    setObstacleLane(0);
    setDistance(0);
    setStatus("idle");
  }

  return (
    <Card className="rounded-xl border-[#e2dfd7] bg-white py-0">
      <CardContent className="p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-800">
              Racing Games
            </p>
            <h2 className="font-editorial mt-1 text-3xl">Lane Racer</h2>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="h-6 rounded-full px-3 text-[11px] text-emerald-900">
              Distance: {distance}
            </Badge>
            <Badge variant="outline" className="h-6 rounded-full px-3 text-[11px] text-emerald-900">
              Best: {highScore}
            </Badge>
          </div>
        </div>

        <div className="mx-auto mt-7 grid max-w-sm grid-cols-5 gap-1 rounded-xl bg-[#e4e0d7] p-2">
          {Array.from({ length: rows }, (_, rowIndex) =>
            Array.from({ length: laneCount }, (_, laneIndex) => {
              const isPlayer = rowIndex === rows - 1 && laneIndex === playerLane;
              const isObstacle = rowIndex === 0 && laneIndex === obstacleLane;
              return (
                <div
                  key={`${rowIndex}-${laneIndex}`}
                  className={`aspect-square rounded-[3px] ${
                    isPlayer ? "bg-emerald-700" : isObstacle ? "bg-rose-600" : "bg-[#f7f6f2]"
                  }`}
                />
              );
            }),
          )}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm font-medium text-stone-600" role="status">
            {status === "over"
              ? "Crash! Restart to race again."
              : status === "running"
                ? "Dodge the red obstacle."
                : "Press start and use the arrows to change lanes."}
          </p>
          <div className="flex gap-2">
            <Button
              className="bg-[#176f58]"
              disabled={status === "over"}
              onClick={() => setStatus((current) => (current === "running" ? "idle" : "running"))}
              type="button"
            >
              <Play /> {status === "running" ? "Pause" : "Start"}
            </Button>
            <Button onClick={restart} type="button" variant="outline">
              <RotateCcw /> Restart
            </Button>
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-2">
          <Button onClick={() => move(-1)} size="icon-sm" type="button" variant="outline">
            <ArrowLeft />
          </Button>
          <Button disabled size="icon-sm" type="button" variant="outline">
            <ArrowUp />
          </Button>
          <Button disabled size="icon-sm" type="button" variant="outline">
            <ArrowDown />
          </Button>
          <Button onClick={() => move(1)} size="icon-sm" type="button" variant="outline">
            <ArrowRight />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
