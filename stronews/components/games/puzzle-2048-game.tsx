"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Board = number[][];
type Direction = "left" | "right" | "up" | "down";

const boardSize = 4;

function createEmptyBoard(): Board {
  return Array.from({ length: boardSize }, () => Array<number>(boardSize).fill(0));
}

function cloneBoard(board: Board): Board {
  return board.map((row) => [...row]);
}

function addRandomTile(board: Board) {
  const emptyCells: Array<[number, number]> = [];
  board.forEach((row, rowIndex) => {
    row.forEach((value, columnIndex) => {
      if (value === 0) emptyCells.push([rowIndex, columnIndex]);
    });
  });

  if (emptyCells.length === 0) return board;
  const [rowIndex, columnIndex] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  board[rowIndex][columnIndex] = Math.random() < 0.9 ? 2 : 4;
  return board;
}

function createInitialBoard(): Board {
  return addRandomTile(addRandomTile(createEmptyBoard()));
}

function slideRowLeft(row: number[]) {
  const compacted = row.filter((value) => value !== 0);
  const nextRow: number[] = [];
  let score = 0;

  for (let index = 0; index < compacted.length; index += 1) {
    if (compacted[index] === compacted[index + 1]) {
      const mergedValue = compacted[index] * 2;
      nextRow.push(mergedValue);
      score += mergedValue;
      index += 1;
    } else {
      nextRow.push(compacted[index]);
    }
  }

  while (nextRow.length < boardSize) nextRow.push(0);
  return { nextRow, score };
}

function transpose(board: Board): Board {
  return board[0].map((_, columnIndex) => board.map((row) => row[columnIndex]));
}

function moveBoard(board: Board, direction: Direction) {
  let score = 0;
  let nextBoard: Board;

  if (direction === "left") {
    nextBoard = board.map((row) => {
      const result = slideRowLeft(row);
      score += result.score;
      return result.nextRow;
    });
  } else if (direction === "right") {
    nextBoard = board.map((row) => {
      const reversed = [...row].reverse();
      const result = slideRowLeft(reversed);
      score += result.score;
      return result.nextRow.reverse();
    });
  } else {
    const columns = transpose(board).map((column) => {
      const ordered = direction === "up" ? column : [...column].reverse();
      const result = slideRowLeft(ordered);
      score += result.score;
      return direction === "up" ? result.nextRow : result.nextRow.reverse();
    });
    nextBoard = transpose(columns);
  }

  const changed = JSON.stringify(board) !== JSON.stringify(nextBoard);
  return { nextBoard, score, changed };
}

function hasAvailableMove(board: Board) {
  return (
    board.some((row) => row.some((value) => value === 0)) ||
    board.some((row, rowIndex) =>
      row.some(
        (value, columnIndex) =>
          (columnIndex < boardSize - 1 && value === row[columnIndex + 1]) ||
          (rowIndex < boardSize - 1 && value === board[rowIndex + 1][columnIndex]),
      ),
    )
  );
}

function getHighestTile(board: Board) {
  return Math.max(...board.flat());
}

const tileClasses: Record<number, string> = {
  0: "bg-[#efece5] text-transparent",
  2: "bg-[#eee4da] text-[#776e65]",
  4: "bg-[#ede0c8] text-[#776e65]",
  8: "bg-[#f2b179] text-white",
  16: "bg-[#f59563] text-white",
  32: "bg-[#f67c5f] text-white",
  64: "bg-[#f65e3b] text-white",
  128: "bg-[#edcf72] text-white",
  256: "bg-[#edcc61] text-white",
  512: "bg-[#edc850] text-white",
  1024: "bg-[#edc53f] text-white",
  2048: "bg-[#edc22e] text-white",
};

export default function Puzzle2048Game() {
  const [board, setBoard] = useState<Board>(createInitialBoard);
  const [score, setScore] = useState(0);
  const gameOver = !hasAvailableMove(board);

  const move = useCallback(
    (direction: Direction) => {
      if (gameOver) return;
      const result = moveBoard(board, direction);
      if (!result.changed) return;
      setScore((currentScore) => currentScore + result.score);
      setBoard(addRandomTile(cloneBoard(result.nextBoard)));
    },
    [board, gameOver],
  );

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const directionByArrow: Record<string, Direction> = {
        ArrowLeft: "left",
        ArrowRight: "right",
        ArrowUp: "up",
        ArrowDown: "down",
      };
      const direction = directionByArrow[event.key];
      if (!direction) return;
      event.preventDefault();
      move(direction);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [move]);

  function restart() {
    setBoard(createInitialBoard());
    setScore(0);
  }

  return (
    <Card className="rounded-xl border-[#e2dfd7] bg-white py-0">
      <CardContent className="p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-800">
              Puzzle Games
            </p>
            <h2 className="font-editorial mt-1 text-3xl">2048 Puzzle</h2>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="h-6 rounded-full px-3 text-[11px] text-emerald-900">
              Score: {score}
            </Badge>
            <Badge variant="outline" className="h-6 rounded-full px-3 text-[11px] text-emerald-900">
              Best tile: {getHighestTile(board)}
            </Badge>
          </div>
        </div>

        <div className="mt-7 grid grid-cols-4 gap-2 rounded-xl bg-[#e4e0d7] p-2">
          {board.flat().map((value, index) => (
            <div
              key={index}
              className={`grid aspect-square place-items-center rounded-lg text-lg font-bold sm:text-xl ${
                tileClasses[value] ?? "bg-[#3c3a32] text-white"
              }`}
            >
              {value || ""}
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-stone-600" role="status">
            {gameOver
              ? "Game over! Restart to play again."
              : "Use arrow keys or the buttons to merge tiles."}
          </p>
          <div className="grid grid-cols-3 gap-1">
            <span />
            <Button disabled={gameOver} onClick={() => move("up")} size="icon-sm" type="button" variant="outline">
              <ArrowUp />
            </Button>
            <span />
            <Button disabled={gameOver} onClick={() => move("left")} size="icon-sm" type="button" variant="outline">
              <ArrowLeft />
            </Button>
            <Button disabled={gameOver} onClick={() => move("down")} size="icon-sm" type="button" variant="outline">
              <ArrowDown />
            </Button>
            <Button disabled={gameOver} onClick={() => move("right")} size="icon-sm" type="button" variant="outline">
              <ArrowRight />
            </Button>
          </div>
          <Button onClick={restart} type="button" variant="outline">
            <RotateCcw /> Restart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
