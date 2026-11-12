"use client";

import { useState } from "react";
import {
  Car,
  Dices,
  BookOpen,
  Brain,
  Gamepad2,
  Grid,
  Letters,
  Move,
  Palette,
  Sparkles,
  Swords,
  Trophy,
  Users,
  Worm,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import ColorMatchGame from "@/components/games/color-match-game";
import BoardDiceGame from "@/components/games/board-dice-game";
import CricketRunGame from "@/components/games/cricket-run-game";
import LaneRacerGame from "@/components/games/lane-racer-game";
import MiniSudokuGame from "@/components/games/mini-sudoku-game";
import ReactionDuelGame from "@/components/games/reaction-duel-game";
import Puzzle2048Game from "@/components/games/puzzle-2048-game";
import SlidingPuzzleGame from "@/components/games/sliding-puzzle-game";
import SnakeGame from "@/components/games/snake-game";
import TicTacToeGame from "@/components/games/tic-tac-toe-game";
import WordDetectiveGame from "@/components/games/word-detective-game";
import MemoryMatchGame from "@/components/games/memory-match-game";
import ReactionTapGame from "@/components/games/reaction-tap-game";
import WordRushGame from "@/components/games/word-rush-game";

const games = [
  {
    id: "word-rush",
    title: "Word Rush",
    category: "Word Games",
    icon: Letters,
    description: "Unscramble newsroom words and build a streak.",
  },
  {
    id: "puzzle-2048",
    title: "2048 Puzzle",
    category: "Puzzle Games",
    icon: Sparkles,
    description: "Merge matching numbers and reach the highest tile.",
  },
  {
    id: "memory-match",
    title: "Memory Match",
    category: "Brain Training",
    icon: Brain,
    description: "Find matching pairs in as few moves as possible.",
  },
  {
    id: "reaction-tap",
    title: "Reaction Tap",
    category: "Arcade Games",
    icon: Zap,
    description: "Tap when the signal turns green and test your reflexes.",
  },
  {
    id: "color-match",
    title: "Color Match",
    category: "Creativity",
    icon: Palette,
    description: "Spot the tile with the slightly different shade.",
  },
  {
    id: "tic-tac-toe",
    title: "Tic Tac Toe",
    category: "Strategy Games",
    icon: Swords,
    description: "Beat the computer in a classic three-in-a-row match.",
  },
  {
    id: "sliding-puzzle",
    title: "Sliding Puzzle",
    category: "Puzzle Games",
    icon: Move,
    description: "Arrange the tiles from 1 to 15.",
  },
  {
    id: "snake",
    title: "Snake",
    category: "Arcade Games",
    icon: Worm,
    description: "Eat, grow, and avoid hitting yourself.",
  },
  {
    id: "word-detective",
    title: "Word Detective",
    category: "Word Games",
    icon: BookOpen,
    description: "Use clues and letter choices to solve the word.",
  },
  {
    id: "mini-sudoku",
    title: "Mini Sudoku",
    category: "Logic Puzzles",
    icon: Grid,
    description: "Complete a compact 4×4 logic grid.",
  },
  {
    id: "cricket-run",
    title: "Cricket Run",
    category: "Cricket & Sports Games",
    icon: Trophy,
    description: "Time your shot and score runs across 10 balls.",
  },
  {
    id: "dice-ladder",
    title: "Dice Ladder",
    category: "Board Games",
    icon: Dices,
    description: "Roll dice, climb ladders, and avoid snakes.",
  },
  {
    id: "lane-racer",
    title: "Lane Racer",
    category: "Racing Games",
    icon: Car,
    description: "Change lanes quickly and dodge every obstacle.",
  },
  {
    id: "reaction-duel",
    title: "Reaction Duel",
    category: "Multiplayer Games",
    icon: Users,
    description: "Two players compete with A and L keys.",
  },
] as const;

type GameId = (typeof games)[number]["id"];

export default function GameShell() {
  const [activeGame, setActiveGame] = useState<GameId>("word-rush");

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-7 sm:py-11">
      <header className="max-w-3xl border-b border-[#dedbd2] pb-8">
        <Badge className="rounded-sm bg-[#176f58] px-2 text-[10px] uppercase tracking-wide text-white hover:bg-[#176f58]">
          <Gamepad2 /> Play now
        </Badge>
        <h1 className="font-editorial mt-3 text-4xl leading-[1.08] sm:text-5xl">
          Stronews Games
        </h1>
        <p className="mt-4 text-base leading-7 text-stone-600">
          Fourteen quick browser games for breaks between stories. No installation, no real-money play,
          and no prizes—just lightweight entertainment.
        </p>
      </header>

      <section className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5" aria-label="Available games">
        {games.map(({ id, title, category, icon: Icon, description }) => (
          <button
            key={id}
            onClick={() => setActiveGame(id)}
            className={`rounded-xl border p-4 text-left transition ${
              activeGame === id
                ? "border-emerald-700 bg-white shadow-sm"
                : "border-[#e2dfd7] bg-white/70 hover:border-emerald-600/60 hover:bg-white"
            }`}
            aria-pressed={activeGame === id}
            type="button"
          >
            <span className="grid size-9 place-items-center rounded-full bg-[#e6eee9] text-emerald-800">
              <Icon className="size-4" />
            </span>
            <span className="mt-4 block text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-800">
              {category}
            </span>
            <span className="mt-1 block text-sm font-semibold text-[#202320]">{title}</span>
            <span className="mt-1 block text-xs leading-5 text-stone-600">{description}</span>
          </button>
        ))}
      </section>

      <section className="mt-8" aria-live="polite">
        {activeGame === "word-rush" && <WordRushGame />}
        {activeGame === "puzzle-2048" && <Puzzle2048Game />}
        {activeGame === "memory-match" && <MemoryMatchGame />}
        {activeGame === "reaction-tap" && <ReactionTapGame />}
        {activeGame === "color-match" && <ColorMatchGame />}
        {activeGame === "tic-tac-toe" && <TicTacToeGame />}
        {activeGame === "sliding-puzzle" && <SlidingPuzzleGame />}
        {activeGame === "snake" && <SnakeGame />}
        {activeGame === "word-detective" && <WordDetectiveGame />}
        {activeGame === "mini-sudoku" && <MiniSudokuGame />}
        {activeGame === "cricket-run" && <CricketRunGame />}
        {activeGame === "dice-ladder" && <BoardDiceGame />}
        {activeGame === "lane-racer" && <LaneRacerGame />}
        {activeGame === "reaction-duel" && <ReactionDuelGame />}
      </section>

    </main>
  );
}
