"use client";

import { useState } from "react";
import { RotateCcw, Swords } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Mark = "X" | "O" | null;

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function getWinner(board: Mark[]): Mark {
  for (const [first, second, third] of winningLines) {
    if (board[first] && board[first] === board[second] && board[first] === board[third]) {
      return board[first];
    }
  }
  return null;
}

function getAvailableMoves(board: Mark[]) {
  return board.map((mark, index) => (mark ? -1 : index)).filter((index) => index >= 0);
}

function getComputerMove(board: Mark[]) {
  const available = getAvailableMoves(board);
  const findWinningMove = (player: Exclude<Mark, null>) => {
    for (const move of available) {
      const nextBoard = [...board];
      nextBoard[move] = player;
      if (getWinner(nextBoard) === player) return move;
    }
    return null;
  };

  return (
    findWinningMove("O") ??
    findWinningMove("X") ??
    (available.includes(4) ? 4 : available[Math.floor(Math.random() * available.length)])
  );
}

export default function TicTacToeGame() {
  const [board, setBoard] = useState<Mark[]>(Array<Mark>(9).fill(null));
  const [status, setStatus] = useState("Your turn. Place an X to begin.");
  const winner = getWinner(board);
  const isDraw = !winner && getAvailableMoves(board).length === 0;

  function placeMark(index: number) {
    if (winner || board[index]) return;

    const playerBoard = [...board];
    playerBoard[index] = "X";
    const playerWinner = getWinner(playerBoard);
    if (playerWinner) {
      setBoard(playerBoard);
      setStatus("You win! Well played.");
      return;
    }

    const availableAfterPlayer = getAvailableMoves(playerBoard);
    if (availableAfterPlayer.length === 0) {
      setBoard(playerBoard);
      setStatus("It's a draw.");
      return;
    }

    const computerIndex = getComputerMove(playerBoard);
    const finalBoard = [...playerBoard];
    finalBoard[computerIndex] = "O";
    setBoard(finalBoard);

    const computerWinner = getWinner(finalBoard);
    if (computerWinner) setStatus("Computer wins. Try again!");
    else if (getAvailableMoves(finalBoard).length === 0) setStatus("It's a draw.");
    else setStatus("Your turn again.");
  }

  function restart() {
    setBoard(Array<Mark>(9).fill(null));
    setStatus("Your turn. Place an X to begin.");
  }

  return (
    <Card className="rounded-xl border-[#e2dfd7] bg-white py-0">
      <CardContent className="p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-800">
              Strategy Games
            </p>
            <h2 className="font-editorial mt-1 text-3xl">Tic Tac Toe</h2>
          </div>
          <Badge variant="outline" className="h-6 rounded-full px-3 text-[11px] text-emerald-900">
            <Swords /> You vs computer
          </Badge>
        </div>

        <div className="mx-auto mt-7 grid max-w-xs grid-cols-3 gap-2">
          {board.map((mark, index) => (
            <button
              key={index}
              className={`grid aspect-square place-items-center rounded-xl border text-3xl font-bold transition ${
                mark
                  ? "border-emerald-700 bg-[#e6eee9] text-emerald-900"
                  : "border-[#dedbd2] bg-[#f7f6f2] hover:border-emerald-600 hover:bg-white"
              }`}
              onClick={() => placeMark(index)}
              type="button"
              aria-label={`Row ${Math.floor(index / 3) + 1}, column ${(index % 3) + 1}`}
            >
              {mark}
            </button>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="text-sm font-medium text-stone-600" role="status">
            {winner === "X" ? "You win! Well played." : winner === "O" ? "Computer wins. Try again!" : isDraw ? "It's a draw." : status}
          </p>
          <Button onClick={restart} type="button" variant="outline">
            <RotateCcw /> Restart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
