"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type ColorRound = {
  tiles: string[];
  oddIndex: number;
};

function createRound(level: number): ColorRound {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 58;
  const lightness = 55;
  const difference = Math.max(2, 12 - level * 0.8);
  const oddIndex = Math.floor(Math.random() * 9);
  const baseColor = `hsl(${hue} ${saturation}% ${lightness}%)`;
  const oddColor = `hsl(${hue} ${saturation}% ${lightness + difference}%)`;

  return {
    tiles: Array.from({ length: 9 }, (_, index) =>
      index === oddIndex ? oddColor : baseColor,
    ),
    oddIndex,
  };
}

export default function ColorMatchGame() {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState<ColorRound>(() => createRound(1));
  const [result, setResult] = useState("");

  function selectTile(index: number) {
    if (index === round.oddIndex) {
      const nextLevel = level + 1;
      setScore((currentScore) => currentScore + nextLevel * 10);
      setLevel(nextLevel);
      setRound(createRound(nextLevel));
      setResult("Correct! The next shade is harder.");
    } else {
      setResult("Not this one. Look for the lighter tile.");
    }
  }

  function restart() {
    setLevel(1);
    setScore(0);
    setRound(createRound(1));
    setResult("");
  }

  return (
    <Card className="rounded-xl border-[#e2dfd7] bg-white py-0">
      <CardContent className="p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-800">
              Creativity
            </p>
            <h2 className="font-editorial mt-1 text-3xl">Color Match</h2>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="h-6 rounded-full px-3 text-[11px] text-emerald-900">
              Level: {level}
            </Badge>
            <Badge variant="outline" className="h-6 rounded-full px-3 text-[11px] text-emerald-900">
              Score: {score}
            </Badge>
          </div>
        </div>

        <p className="mt-5 text-sm text-stone-600">
          Tap the tile whose colour is slightly lighter than the others.
        </p>

        <div className="mx-auto mt-5 grid max-w-sm grid-cols-3 gap-2">
          {round.tiles.map((color, index) => (
            <button
              key={`${level}-${index}`}
              className="aspect-square rounded-xl border border-black/5 transition hover:scale-[1.02]"
              onClick={() => selectTile(index)}
              style={{ backgroundColor: color }}
              aria-label={`Color tile ${index + 1}`}
              type="button"
            />
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p
            className={`text-sm font-medium ${
              result.startsWith("Correct") ? "text-emerald-700" : result ? "text-rose-700" : "text-stone-500"
            }`}
            role="status"
          >
            {result || "Choose the odd tile to advance."}
          </p>
          <Button onClick={restart} type="button" variant="outline">
            <RotateCcw /> Restart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
