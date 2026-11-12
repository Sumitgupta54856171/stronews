"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const symbols = ["📰", "🔍", "📈", "🏏", "🎬", "🚀", "🧠", "🌍"];

type MemoryCard = {
  id: number;
  symbol: string;
  isMatched: boolean;
};

function createDeck(): MemoryCard[] {
  return [...symbols, ...symbols]
    .map((symbol, id) => ({ id, symbol, isMatched: false }))
    .sort(() => Math.random() - 0.5);
}

export default function MemoryMatchGame() {
  const [cards, setCards] = useState<MemoryCard[]>(createDeck);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const matchedPairs = cards.filter((card) => card.isMatched).length / 2;

  function flipCard(cardId: number) {
    if (flippedIds.length === 2 || flippedIds.includes(cardId)) return;
    const card = cards.find((item) => item.id === cardId);
    if (!card || card.isMatched) return;

    const nextFlipped = [...flippedIds, cardId];
    setFlippedIds(nextFlipped);

    if (nextFlipped.length === 2) {
      setMoves((currentMoves) => currentMoves + 1);
      const [firstId, secondId] = nextFlipped;
      const firstCard = cards.find((item) => item.id === firstId);
      const secondCard = cards.find((item) => item.id === secondId);

      window.setTimeout(() => {
        if (firstCard && secondCard && firstCard.symbol === secondCard.symbol) {
          setCards((currentCards) =>
            currentCards.map((item) =>
              item.id === firstId || item.id === secondId ? { ...item, isMatched: true } : item,
            ),
          );
        }
        setFlippedIds([]);
      }, 550);
    }
  }

  function restart() {
    setCards(createDeck());
    setFlippedIds([]);
    setMoves(0);
  }

  return (
    <Card className="rounded-xl border-[#e2dfd7] bg-white py-0">
      <CardContent className="p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-800">
              Brain Training
            </p>
            <h2 className="font-editorial mt-1 text-3xl">Memory Match</h2>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="h-6 rounded-full px-3 text-[11px] text-emerald-900">
              Moves: {moves}
            </Badge>
            <Badge variant="outline" className="h-6 rounded-full px-3 text-[11px] text-emerald-900">
              Pairs: {matchedPairs}/8
            </Badge>
          </div>
        </div>

        <div className="mx-auto mt-7 grid max-w-md grid-cols-4 gap-2">
          {cards.map((card) => {
            const isFlipped = card.isMatched || flippedIds.includes(card.id);
            return (
              <button
                key={card.id}
                onClick={() => flipCard(card.id)}
                className={`grid aspect-square place-items-center rounded-xl border text-2xl transition ${
                  isFlipped
                    ? card.isMatched
                      ? "border-emerald-600 bg-[#e6eee9]"
                      : "border-emerald-700 bg-white"
                    : "border-[#dedbd2] bg-[#171918] text-transparent hover:bg-[#242724]"
                }`}
                aria-label={isFlipped ? card.symbol : "Hidden card"}
                type="button"
              >
                {isFlipped ? card.symbol : "?"}
              </button>
            );
          })}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="text-sm text-stone-600" role="status">
            {matchedPairs === 8
              ? `Complete! You matched all pairs in ${moves} moves.`
              : "Find all matching pairs."}
          </p>
          <Button variant="outline" className="bg-white" onClick={restart} type="button">
            <RotateCcw /> Restart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
