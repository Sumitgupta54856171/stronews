"use client";

import { useState } from "react";
import { BookOpen, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const words = [
  { answer: "FACT", clue: "A thing that can be checked" },
  { answer: "MEDIA", clue: "Channels that carry news" },
  { answer: "DESK", clue: "Where editors work" },
  { answer: "SCOOP", clue: "An exclusive story" },
  { answer: "TRUTH", clue: "The opposite of misinformation" },
];
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const maxAttempts = 6;

export default function WordDetectiveGame() {
  const [wordIndex, setWordIndex] = useState(0);
  const [usedLetters, setUsedLetters] = useState<string[]>([]);
  const [wrongCount, setWrongCount] = useState(0);
  const word = words[wordIndex];
  const correctLetters = usedLetters.filter((letter) => word.answer.includes(letter));
  const isWon = word.answer.split("").every((letter) => usedLetters.includes(letter));
  const isLost = wrongCount >= maxAttempts;

  function chooseLetter(letter: string) {
    if (usedLetters.includes(letter) || isWon || isLost) return;
    setUsedLetters((currentLetters) => [...currentLetters, letter]);
    if (!word.answer.includes(letter)) setWrongCount((currentCount) => currentCount + 1);
  }

  function nextWord() {
    setWordIndex((currentIndex) => (currentIndex + 1) % words.length);
    setUsedLetters([]);
    setWrongCount(0);
  }

  return (
    <Card className="rounded-xl border-[#e2dfd7] bg-white py-0">
      <CardContent className="p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-800">
              Word Games
            </p>
            <h2 className="font-editorial mt-1 text-3xl">Word Detective</h2>
          </div>
          <Badge variant="outline" className="h-6 rounded-full px-3 text-[11px] text-emerald-900">
            <BookOpen /> Clues: {correctLetters.length}/{word.answer.length}
          </Badge>
        </div>

        <p className="mt-7 text-center text-sm text-stone-600">Clue: {word.clue}</p>
        <p className="mt-3 text-center text-3xl font-bold tracking-[0.25em] text-[#171918]">
          {word.answer
            .split("")
            .map((letter) => (usedLetters.includes(letter) ? letter : "_"))
            .join(" ")}
        </p>
        <p className="mt-3 text-center text-xs font-medium text-stone-500">
          Wrong guesses: {wrongCount}/{maxAttempts}
        </p>

        <div className="mx-auto mt-5 grid max-w-lg grid-cols-7 gap-1">
          {alphabet.map((letter) => (
            <Button
              key={letter}
              className="h-8 bg-white px-0 text-xs"
              disabled={usedLetters.includes(letter) || isWon || isLost}
              onClick={() => chooseLetter(letter)}
              type="button"
              variant="outline"
            >
              {letter}
            </Button>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-medium text-stone-600" role="status">
            {isWon ? "Case solved!" : isLost ? `The word was ${word.answer}.` : "Choose a letter."}
          </p>
          <Button onClick={nextWord} type="button" variant="outline">
            <RotateCcw /> Next word
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
