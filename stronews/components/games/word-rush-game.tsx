"use client";

import { useMemo, useState, type FormEvent } from "react";
import { RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const words = [
  { answer: "headline", hint: "The main title of a story" },
  { answer: "breaking", hint: "Happening right now" },
  { answer: "editorial", hint: "Opinion-driven newsroom section" },
  { answer: "trending", hint: "Popular at this moment" },
  { answer: "sources", hint: "People or documents behind facts" },
  { answer: "briefing", hint: "A short update or summary" },
];

function scrambleWord(word: string) {
  const letters = word.split("");
  for (let index = letters.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [letters[index], letters[swapIndex]] = [letters[swapIndex], letters[index]];
  }
  return letters.join("").toUpperCase();
}

export default function WordRushGame() {
  const [wordIndex, setWordIndex] = useState(0);
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);
  const scrambled = useMemo(() => scrambleWord(words[wordIndex].answer), [wordIndex]);

  function submitGuess(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const isCorrect = guess.trim().toLowerCase() === words[wordIndex].answer;
    if (isCorrect) {
      setScore((currentScore) => currentScore + 10);
      setResult("Correct!");
    } else {
      setResult("Not quite. Try again.");
    }
  }

  function nextWord() {
    setWordIndex((currentIndex) => (currentIndex + 1) % words.length);
    setGuess("");
    setResult("");
  }

  function restart() {
    setWordIndex(0);
    setGuess("");
    setResult("");
    setScore(0);
  }

  return (
    <Card className="rounded-xl border-[#e2dfd7] bg-white py-0">
      <CardContent className="p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-800">
              Word Games
            </p>
            <h2 className="font-editorial mt-1 text-3xl">Word Rush</h2>
          </div>
          <Badge variant="outline" className="h-6 rounded-full px-3 text-[11px] text-emerald-900">
            Score: {score}
          </Badge>
        </div>

        <p className="mt-6 text-center text-4xl font-bold tracking-[0.18em] text-[#171918]">
          {scrambled}
        </p>
        <p className="mt-2 text-center text-xs text-stone-500">Hint: {words[wordIndex].hint}</p>

        <form className="mt-5 flex gap-2" onSubmit={submitGuess}>
          <Input
            className="h-10 bg-white"
            onChange={(event) => setGuess(event.target.value)}
            placeholder="Type your answer"
            value={guess}
            aria-label="Your answer"
          />
          <Button className="h-10 bg-[#176f58]" type="submit">
            Check
          </Button>
        </form>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p
            className={`text-sm font-medium ${
              result === "Correct!"
                ? "text-emerald-700"
                : result
                  ? "text-rose-700"
                  : "text-stone-500"
            }`}
            role="status"
          >
            {result || "Unscramble the word and press Check."}
          </p>
          <div className="flex gap-2">
            <Button variant="outline" className="bg-white" onClick={nextWord} type="button">
              Next word
            </Button>
            <Button variant="outline" className="bg-white" onClick={restart} type="button">
              <RotateCcw /> Restart
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
