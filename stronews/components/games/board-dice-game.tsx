"use client";

import { useEffect, useState } from "react";
import { Dices, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const finish = 30;
const ladders: Record<number, number> = { 3: 7, 8: 15, 19: 24 };
const snakes: Record<number, number> = { 12: 5, 26: 17 };
type Turn = "player" | "computer";

function moveToken(position: number, dice: number) {
  const nextPosition = position + dice;
  if (nextPosition > finish) return position;
  return ladders[nextPosition] ?? snakes[nextPosition] ?? nextPosition;
}

export default function BoardDiceGame() {
  const [playerPosition, setPlayerPosition] = useState(1);
  const [computerPosition, setComputerPosition] = useState(1);
  const [turn, setTurn] = useState<Turn>("player");
  const [message, setMessage] = useState("Roll the dice to start.");
  const [lastRoll, setLastRoll] = useState<number | null>(null);
  const winner =
    playerPosition === finish ? "player" : computerPosition === finish ? "computer" : null;

  async function rollDice() {
    if (winner || turn !== "player") return;
    const dice = 1 + Math.floor(Math.random() * 6);
    setLastRoll(dice);
    const nextPosition = moveToken(playerPosition, dice);
    setPlayerPosition(nextPosition);
    if (nextPosition === finish) {
      setMessage("You reached the finish first!");
      return;
    }
    setMessage(`You rolled ${dice}. Computer's turn.`);
    setTurn("computer");
  }

  useEffect(() => {
    if (turn !== "computer" || winner) return;
    const timeout = window.setTimeout(() => {
      const dice = 1 + Math.floor(Math.random() * 6);
      setLastRoll(dice);
      const nextPosition = moveToken(computerPosition, dice);
      setComputerPosition(nextPosition);
      if (nextPosition === finish) {
        setMessage("Computer reached the finish first. Try again!");
        return;
      }
      setMessage(`Computer rolled ${dice}. Your turn.`);
      setTurn("player");
    }, 750);
    return () => window.clearTimeout(timeout);
  }, [computerPosition, turn, winner]);

  function restart() {
    setPlayerPosition(1);
    setComputerPosition(1);
    setTurn("player");
    setMessage("Roll the dice to start.");
    setLastRoll(null);
  }

  return (
    <Card className="rounded-xl border-[#e2dfd7] bg-white py-0">
      <CardContent className="p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-800">
              Board Games
            </p>
            <h2 className="font-editorial mt-1 text-3xl">Dice Ladder</h2>
          </div>
          <Badge variant="outline" className="h-6 rounded-full px-3 text-[11px] text-emerald-900">
            <Dices /> Last roll: {lastRoll ?? "-"}
          </Badge>
        </div>

        <div className="mx-auto mt-7 grid max-w-lg grid-cols-6 gap-1">
          {Array.from({ length: finish }, (_, index) => {
            const square = index + 1;
            const hasPlayer = square === playerPosition;
            const hasComputer = square === computerPosition;
            return (
              <div
                key={square}
                className={`grid aspect-square place-items-center rounded-md border text-[10px] font-semibold ${
                  hasPlayer || hasComputer
                    ? "border-emerald-700 bg-[#e6eee9] text-emerald-900"
                    : ladders[square]
                      ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                      : snakes[square]
                        ? "border-rose-300 bg-rose-50 text-rose-700"
                        : "border-[#dedbd2] bg-white text-stone-400"
                }`}
                title={`Square ${square}`}
              >
                {hasPlayer ? "P" : hasComputer ? "C" : square}
              </div>
            );
          })}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-medium text-stone-600" role="status">
            {winner === "player"
              ? "You win!"
              : winner === "computer"
                ? "Computer wins!"
                : message}
          </p>
          <div className="flex gap-2">
            <Button className="bg-[#176f58]" disabled={Boolean(winner) || turn !== "player"} onClick={rollDice} type="button">
              Roll dice
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
