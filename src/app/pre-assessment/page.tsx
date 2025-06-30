"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MaxWidthWrapper from "../components/ui/MaxWidthWrapper";
import { Button } from "../components/ui/button";

type Question = {
  question: string;
  options: string[];
  answer: string;
  selected?: string;
};

export default function PreAssessmentPage() {
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard" | null>(null);
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [timer, setTimer] = useState<number>(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState<number>(0);
  const router = useRouter();

  const timeLimits = { easy: 120, medium: 180, hard: 300 };

  useEffect(() => {
    if (difficulty && timer > 0) {
      const countdown = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(countdown);
    }

    if (timer === 0 && questions && !showResult) {
      handleAutoSubmit();
    }
  }, [timer, difficulty, questions]);

  const loadQuestions = async (level: "easy" | "medium" | "hard") => {
    const res = await fetch(`/data/quizzes/${level}.json`);
    const data = await res.json();
    setQuestions(data);
    setTimer(timeLimits[level]);
  };

  const handleSelect = (level: "easy" | "medium" | "hard") => {
    setDifficulty(level);
    loadQuestions(level);
  };

  const handleAutoSubmit = () => {
    if (!questions) return;
    const calculatedScore = questions.reduce((acc, curr) => {
      return acc + (curr.selected === curr.answer ? 1 : 0);
    }, 0);
    setScore(calculatedScore);
    localStorage.setItem("pre_score", calculatedScore.toString());
    setShowResult(true);
  };

  const handleOptionSelect = (index: number, option: string) => {
    if (!questions) return;
    const updated = [...questions];
    updated[index].selected = option;
    setQuestions(updated);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const tryNextDifficulty = () => {
    if (difficulty === "easy") handleSelect("medium");
    else if (difficulty === "medium") handleSelect("hard");
    else router.push("/");
  };

  return (
    <div className="w-full bg-gray-100 min-h-screen py-16">
      <MaxWidthWrapper>
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl mx-auto">
          {!difficulty && (
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Cybersecurity Pre-Assessment</h1>
              <p className="text-gray-600 mb-8">
                Select a difficulty level to begin the quiz.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {["easy", "medium", "hard"].map((level) => (
                  <Button
                    key={level}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => handleSelect(level as any)}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {difficulty && !showResult && questions && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <Button variant="outline" onClick={() => { setDifficulty(null); setQuestions(null); }}>← Back</Button>
                <p className="font-semibold text-red-600">Time Left: {formatTime(timer)}</p>
              </div>
              <div className="space-y-8">
                {questions.map((q, index) => (
                  <div key={index}>
                    <p className="font-semibold text-gray-800">{index + 1}. {q.question}</p>
                    <div className="mt-2 space-y-2">
                      {q.options.map((opt, i) => (
                        <label key={i} className="block cursor-pointer">
                          <input
                            type="radio"
                            name={`question-${index}`}
                            value={opt}
                            checked={q.selected === opt}
                            className="mr-2"
                            onChange={() => handleOptionSelect(index, opt)}
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-10">
                <Button
                  onClick={handleAutoSubmit}
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                >
                  Submit Quiz
                </Button>
              </div>
            </div>
          )}

          {showResult && (
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Your Score: {score}/10</h2>
              {score >= 6 ? (
                <>
                  {difficulty !== "hard" ? (
                    <Button
                      onClick={tryNextDifficulty}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Try {difficulty === "easy" ? "Medium" : "Hard"} Quiz →
                    </Button>
                  ) : (
                    <Button
                      onClick={() => router.push("/")}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      🎉 You’re All Done! Go Home →
                    </Button>
                  )}
                </>
              ) : (
                <div className="flex flex-col gap-4 items-center">
                  <Button
                    onClick={() => router.push(`/articles/${difficulty}`)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white"
                  >
                    Read Article 📖
                  </Button>
                  <Button
                    onClick={() => router.push("/")}
                    variant="outline"
                    className="text-gray-700"
                  >
                    Go Back Home
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
