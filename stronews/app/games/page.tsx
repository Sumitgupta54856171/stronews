import type { Metadata } from "next";
import GameShell from "@/components/games/game-shell";

export const metadata: Metadata = {
  title: "Games",
  description:
    "Play fourteen lightweight browser games across puzzle, sports, word, board, arcade, brain, racing, strategy, and multiplayer categories.",
  alternates: { canonical: "/games" },
};

export default function GamesPage() {
  return <GameShell />;
}
