"use client";

import { useState } from "react";
import { Grid, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const initialPuzzle = [
  [1, 0, 3, 0],
  [0, 4, 0, 2],
  [2, 0, 4, 0],
  [0, 1, 0, 3],
];
type Board = number[][];

function isBoardValid(board: Board) {
  for (let index = 0; index < 4; index += 1) {
    const row = board[index].filter(Boolean);
    const column = [0, 1, 2, 3].map((rowIndex) => board[rowIndex][index]).filter(Boolean);
    if (new Set(row).size !== row.length || new Set(column).size !== column.length) return false;
  }

  for (let row = 0; row < 4; row += 2) {
    for (let column = 0; column < 4; column += 2) {
      const box = [
        board[row][column],
        board[row][column + 1],
        board[row + 1][column],
        board[row + 1][column + 1],
      ].filter(Boolean);
      if (new Set(box).size !== box.length) return false;
    }
  }
  return true;
}

function isBoardComplete(board: Board) {
  return board.every((row) => row.every((value) => value !== 0));
}

export default function MiniSudokuGame() {
  const [board, setBoard] = useState<Board>(() => initialPuzzle.map((row) => [...row]));
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>([0, 1]);
  const [message, setMessage] = useState("Fill every square using numbers 1 to 4.");
  const isPuzzleCell = (row: number, column: number) => initialPuzzle[row][column] !== 0;

  function chooseNumber(value: number) {
    if (!selectedCell) return;
    const [row, column] = selectedCell;
    if (isPuzzleCell(row, column)) return;
    const nextBoard = board.map((currentRow) => [...currentRow]);
    nextBoard[row][column] = value;
    setBoard(nextBoard);

    if (isBoardComplete(nextBoard) && isBoardValid(nextBoard)) {
      setMessage("Solved! Excellent work.");
    } else if (!isBoardValid(nextBoard)) {
      setMessage("There is a duplicate in a row, column, or box.");
    } else {
      setMessage("Looks valid so far. Keep going.");
    }
  }

  function restart() {
    setBoard(initialPuzzle.map((row) => [...row]));
    setSelectedCell([0, 1]);
    setMessage("Fill every square using numbers 1 to 4.");
  }

  return (
    <Card className="rounded-xl border-[#e2dfd7] bg-white py-0">
      <CardContent className="p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-800">
              Logic Puzzles
            </p>
            <h2 className="font-editorial mt-1 text-3xl">Mini Sudoku</h2>
          </div>
          <Badge variant="outline" className="h-6 rounded-full px-3 text-[11px] text-emerald-900">
            <Grid /> 4×4
          </Badge>
        </div>

        <div className="mx-auto mt-7 grid max-w-xs grid-cols-2 gap-2">
          {[0, 1].map((boxRow) => (
            <div key={boxRow} className="contents">
              {[0, 1].map((boxColumn) => (
                <div key={boxColumn} className="grid grid-cols-2 gap-px bg-[#a8b5ac] p-px">
                  {[0, 1].map((cellRow) =>
                    [0, 1].map((cellColumn) => {
                      const row = boxRow * 2 + cellRow;
                      const column = boxColumn * 2 + cellColumn;
                      const value = board[row][column];
                      const isSelected = selectedCell?.[0] === row && selectedCell?.[1] === column;
                      return (
                        <button
                          key={`${row}-${column}`}
                          className={`grid aspect-square place-items-center text-xl font-bold transition ${
                            isPuzzleCell(row, column)
                              ? "bg-[#e6eee9] text-stone-700"
                              : isSelected
                                ? "bg-emerald-200 text-emerald-900"
                                : "bg-white text-emerald-900 hover:bg-emerald-50"
                          }`}
                          onClick={() => setSelectedCell([row, column])}
                          type="button"
                          aria-label={`Row ${row + 1}, column ${column + 1}`}
                        >
                          {value || ""}
                        </button>
                      );
                    }),
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-medium text-stone-600" role="status">
            {message}
          </p>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((value) => (
              <Button
                key={value}
                className="h-9 w-9 px-0"
                onClick={() => chooseNumber(value)}
                type="button"
                variant="outline"
              >
                {value}
              </Button>
            ))}
            <Button onClick={restart} type="button" variant="outline">
              <RotateCcw /> Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
