"use client";

import { useState } from "react";
import { Move, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const size = 4;
type Tile = number | null;
type Board = Tile[];

function createSolvedBoard(): Board {
  return [...Array.from({ length: size * size - 1 }, (_, index) => index + 1), null];
}

function getBlankIndex(board: Board) {
  return board.findIndex((tile) => tile === null);
}

function getAdjacentIndexes(index: number) {
  const row = Math.floor(index / size);
  const column = index % size;
  const adjacent: number[] = [];
  if (row > 0) adjacent.push(index - size);
  if (row < size - 1) adjacent.push(index + size);
  if (column > 0) adjacent.push(index - 1);
  if (column < size - 1) adjacent.push(index + 1);
  return adjacent;
}

function shuffleBoard(): Board {
  const board = createSolvedBoard();
  for (let move = 0; move < 250; move += 1) {
    const adjacent = getAdjacentIndexes(getBlankIndex(board));
    const swapIndex = adjacent[Math.floor(Math.random() * adjacent.length)];
    const blankIndex = getBlankIndex(board);
    [board[blankIndex], board[swapIndex]] = [board[swapIndex], board[blankIndex]];
  }
  return board;
}

export default function SlidingPuzzleGame() {
  const [board, setBoard] = useState<Board>(shuffleBoard);
  const [moves, setMoves] = useState(0);
  const solved = board.every((tile, index) =>
    index === board.length - 1 ? tile === null : tile === index + 1,
  );

  function moveTile(index: number) {
    if (solved || !getAdjacentIndexes(getBlankIndex(board)).includes(index)) return;
    const blankIndex = getBlankIndex(board);
    const nextBoard = [...board];
    [nextBoard[blankIndex], nextBoard[index]] = [nextBoard[index], nextBoard[blankIndex]];
    setBoard(nextBoard);
    setMoves((currentMoves) => currentMoves + 1);
  }

  function restart() {
    setBoard(shuffleBoard());
    setMoves(0);
  }

  return (
    <Card className="rounded-xl border-[#e2dfd7] bg-white py-0">
      <CardContent className="p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-800">
              Puzzle Games
            </p>
            <h2 className="font-editorial mt-1 text-3xl">Sliding Puzzle</h2>
          </div>
          <Badge variant="outline" className="h-6 rounded-full px-3 text-[11px] text-emerald-900">
            <Move /> Moves: {moves}
          </Badge>
        </div>

        <div className="mx-auto mt-7 grid max-w-sm grid-cols-4 gap-2 rounded-xl bg-[#e4e0d7] p-2">
          {board.map((tile, index) => (
            <button
              key={index}
              className={`grid aspect-square place-items-center rounded-lg text-lg font-bold transition ${
                tile === null
                  ? "bg-transparent"
                  : "bg-white text-emerald-900 hover:bg-[#e6eee9]"
              }`}
              onClick={() => moveTile(index)}
              type="button"
              aria-label={tile === null ? "Empty space" : `Tile ${tile}`}
            >
              {tile}
            </button>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="text-sm font-medium text-stone-600" role="status">
            {solved ? `Solved in ${moves} moves!` : "Slide the tiles into order from 1 to 15."}
          </p>
          <Button onClick={restart} type="button" variant="outline">
            <RotateCcw /> Shuffle
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
