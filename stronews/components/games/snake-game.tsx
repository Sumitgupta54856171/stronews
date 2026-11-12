"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Play, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const gridSize = 15;
const initialSnake = [{ x: 7, y: 8 }, { x: 7, y: 9 }];
const initialFood = { x: 7, y: 4 };
type Direction = { x: number; y: number };
type Status = "idle" | "running" | "over";

function randomFood(snake: Array<{ x: number; y: number }>) {
  let food = { x: 0, y: 0 };
  do {
    food = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };
  } while (snake.some((part) => part.x === food.x && part.y === food.y));
  return food;
}

export default function SnakeGame() {
  const [snake, setSnake] = useState(initialSnake);
  const [food, setFood] = useState(initialFood);
  const [direction, setDirection] = useState<Direction>({ x: 0, y: -1 });
  const directionRef = useRef(direction);
  const [status, setStatus] = useState<Status>("idle");
  const [score, setScore] = useState(0);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  const step = useCallback(() => {
    setSnake((currentSnake) => {
      const head = currentSnake[0];
      const nextHead = {
        x: head.x + directionRef.current.x,
        y: head.y + directionRef.current.y,
      };
      const isCollision =
        nextHead.x < 0 ||
        nextHead.x >= gridSize ||
        nextHead.y < 0 ||
        nextHead.y >= gridSize ||
        currentSnake.some((part) => part.x === nextHead.x && part.y === nextHead.y);

      if (isCollision) {
        setStatus("over");
        return currentSnake;
      }

      const ateFood = nextHead.x === food.x && nextHead.y === food.y;
      const nextSnake = [nextHead, ...(ateFood ? currentSnake : currentSnake.slice(0, -1))];
      if (ateFood) {
        setScore((currentScore) => currentScore + 1);
        setFood(randomFood(nextSnake));
      }
      return nextSnake;
    });
  }, [food]);

  useEffect(() => {
    if (status !== "running") return;
    const interval = window.setInterval(step, 180);
    return () => window.clearInterval(interval);
  }, [status, step]);

  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      const directions: Record<string, Direction> = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
      };
      const nextDirection = directions[event.key];
      if (!nextDirection) return;
      event.preventDefault();
      const current = directionRef.current;
      const isReverse = current.x + nextDirection.x === 0 && current.y + nextDirection.y === 0;
      if (!isReverse) setDirection(nextDirection);
    }

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  function turn(nextDirection: Direction) {
    const current = directionRef.current;
    const isReverse = current.x + nextDirection.x === 0 && current.y + nextDirection.y === 0;
    if (!isReverse && status === "running") setDirection(nextDirection);
  }

  function startOrPause() {
    if (status === "over") return;
    setStatus((currentStatus) => (currentStatus === "running" ? "idle" : "running"));
  }

  function restart() {
    setSnake(initialSnake);
    setFood(initialFood);
    setDirection({ x: 0, y: -1 });
    directionRef.current = { x: 0, y: -1 };
    setScore(0);
    setStatus("idle");
  }

  const cells = Array.from({ length: gridSize * gridSize }, (_, index) => {
    const x = index % gridSize;
    const y = Math.floor(index / gridSize);
    const isSnake = snake.some((part) => part.x === x && part.y === y);
    const isFood = food.x === x && food.y === y;
    return { x, y, isSnake, isFood };
  });

  return (
    <Card className="rounded-xl border-[#e2dfd7] bg-white py-0">
      <CardContent className="p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-800">
              Arcade Games
            </p>
            <h2 className="font-editorial mt-1 text-3xl">Snake</h2>
          </div>
          <Badge variant="outline" className="h-6 rounded-full px-3 text-[11px] text-emerald-900">
            Score: {score}
          </Badge>
        </div>

        <div className="mx-auto mt-7 grid max-w-md grid-cols-[repeat(15,minmax(0,1fr))] gap-px rounded-xl bg-[#e4e0d7] p-1">
          {cells.map((cell) => (
            <div
              key={`${cell.x}-${cell.y}`}
              className={`aspect-square rounded-[2px] ${
                cell.isFood
                  ? "bg-rose-600"
                  : cell.isSnake
                    ? "bg-emerald-700"
                    : "bg-[#f7f6f2]"
              }`}
            />
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm font-medium text-stone-600" role="status">
            {status === "over" ? "Game over!" : status === "running" ? "Running…" : "Press start to play."}
          </p>
          <div className="grid grid-cols-3 gap-1">
            <span />
            <Button onClick={() => turn({ x: 0, y: -1 })} size="icon-sm" type="button" variant="outline">
              <ArrowUp />
            </Button>
            <span />
            <Button onClick={() => turn({ x: -1, y: 0 })} size="icon-sm" type="button" variant="outline">
              <ArrowLeft />
            </Button>
            <Button onClick={() => turn({ x: 0, y: 1 })} size="icon-sm" type="button" variant="outline">
              <ArrowDown />
            </Button>
            <Button onClick={() => turn({ x: 1, y: 0 })} size="icon-sm" type="button" variant="outline">
              <ArrowRight />
            </Button>
          </div>
          <div className="flex gap-2">
            <Button onClick={startOrPause} type="button" className="bg-[#176f58]">
              <Play /> {status === "running" ? "Pause" : status === "over" ? "Finished" : "Start"}
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
