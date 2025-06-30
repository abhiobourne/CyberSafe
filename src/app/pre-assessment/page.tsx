"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { questions as allQuestions } from "@/lib/questions";

type Question = {
  question: string;
  options: string[];
  answer: string;
  difficulty: "easy" | "medium" | "hard";
  selected?: string;
};

export default function PreAssessmentPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [timer, setTimer] = useState(60);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const router = useRouter();

  const handleSelect = (level: "easy" | "medium" | "hard") => {
    const selectedQuestions = (allQuestions as Question[])
  .filter((q) => q.difficulty === level)
  .sort(() => 0.5 - Math.random())
  .slice(0, 5);


    setQuestions(selectedQuestions);
    setDifficulty(level);
    setTimer(60);
    setCurrent(0);
    setShowResult(false);
  };

  const handleAnswer = (selected: string) => {
    setQuestions((prev) => {
      const updated = [...prev];
      updated[current].selected = selected;
      return updated;
    });
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      handleAutoSubmit();
    }
  };

  const handleAutoSubmit = useCallback(() => {
    if (!questions) return;
    const calculatedScore = questions.reduce((acc, curr) => {
      return acc + (curr.selected === curr.answer ? 1 : 0);
    }, 0);
    setScore(calculatedScore);
    localStorage.setItem("pre_score", calculatedScore.toString());
    setShowResult(true);
  }, [questions]);

  useEffect(() => {
    if (difficulty && timer > 0) {
      const countdown = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(countdown);
    }

    if (timer === 0 && questions && !showResult) {
      handleAutoSubmit();
    }
  }, [timer, difficulty, questions, showResult, handleAutoSubmit]);

  return (
    <div className="min-h-screen py-20 px-6 bg-gray-100 text-center">
      {!difficulty ? (
        <>
          <h1 className="text-3xl font-bold mb-6">Start Pre-Assessment</h1>
          <p className="text-gray-600 mb-4">Choose a difficulty level to begin:</p>
          <div className="flex justify-center gap-6">
            {["easy", "medium", "hard"].map((level) => (
              <button
                key={level}
                onClick={() => handleSelect(level as "easy" | "medium" | "hard")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg"
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </>
      ) : !showResult ? (
        <div className="max-w-2xl mx-auto">
          <div className="text-right text-gray-600 font-medium mb-4">
            Time Left: {timer}s
          </div>
          <h2 className="text-xl font-semibold mb-4">
            {questions[current].question}
          </h2>
          <div className="grid gap-4">
            {questions[current].options.map((opt: string, i: number) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt)}
                className="bg-white hover:bg-gray-100 border border-gray-300 px-4 py-2 rounded-md"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Assessment Complete!</h2>
          <p className="text-gray-700 mb-6">Your Score: {score} / {questions.length}</p>
          <button
            onClick={() => router.push("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md"
          >
            Go to Home
          </button>
        </div>
      )}
    </div>
  );
}
