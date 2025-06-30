"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

export type Question = {
  question: string;
  options: string[];
  answer: string;
};

 interface QuizProps {
   type: "pre" | "post";
   difficulty: "easy" | "medium" | "hard";
   questions: Question[];
   timeLimit: number;             // in seconds
  onFinish?: (score: number) => void; // optionally handle finish externally
 }


export default function QuizComponent({
  type,
  difficulty,
  questions,
  timeLimit,
}: QuizProps) {
  const router = useRouter();

  // state
  const [answers, setAnswers] = useState<string[]>([]);
  const [timer, setTimer] = useState(timeLimit);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // reset helper
  const resetQuiz = useCallback(() => {
    setAnswers(Array(questions.length).fill(""));
    setTimer(timeLimit);
    setSubmitted(false);
    setScore(0);
  }, [questions.length, timeLimit]);
  useEffect(() => {
    resetQuiz();
    const id = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(id);
          submitQuiz();
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [questions, timeLimit, resetQuiz]);

  // answer selection
  const selectAnswer = (idx: number, opt: string) => {
    setAnswers((a) => {
      const c = [...a];
      c[idx] = opt;
      return c;
    });
  };

  // scoring
  const calculateScore = () =>
    questions.reduce((acc, q, i) => acc + (answers[i] === q.answer ? 1 : 0), 0);

  // on submit
  const submitQuiz = () => {
    if (submitted) return;
    const result = calculateScore();
    setScore(result);
    setSubmitted(true);
  };

  // advance helper
  const handleAdvance = () => {
    if (difficulty === "easy") router.push("/pre-assessment?level=medium");
    else if (difficulty === "medium") router.push("/pre-assessment?level=hard");
    else router.push("/");
  };

  return (
    <div className="bg-white text-black max-w-2xl mx-auto p-6 rounded-lg shadow mt-10">
      <h1 className="text-2xl font-bold mb-2 text-center">
        {type === "pre" ? "Pre‑Assessment" : "Post‑Assessment"} Quiz —{" "}
        {difficulty[0].toUpperCase() + difficulty.slice(1)}
      </h1>
      <p className="text-right text-red-600 mb-4">Time left: {timer}s</p>
      
      {questions.map((q, i) => (
        <div key={i} className="mb-6">
          <h2 className="font-semibold mb-2">
            {i + 1}. {q.question}
          </h2>
          <div className="space-y-2">
            {q.options.map((opt) => (
              <label key={opt} className="block">
                <input
                  type="radio"
                  name={`q${i}`}
                  value={opt}
                  disabled={submitted}
                  checked={answers[i] === opt}
                  onChange={() => selectAnswer(i, opt)}
                  className="mr-2"
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      ))}

      {!submitted ? (
        <button
          onClick={submitQuiz}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Submit
        </button>
      ) : (
        <div className="text-center">
          <p className="text-xl font-semibold text-green-600">
            {score >= 3
              ? `🎉 Congrats! You scored ${score} / ${questions.length}`
              : `You scored ${score} / ${questions.length}. Try again!`}
          </p>

          <div className="flex justify-center gap-4 mt-4">
            {score >= 3 ? (
              <>
                <button
                  onClick={handleAdvance}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                >
                  {difficulty !== "hard"
                    ? `Go to ${difficulty === "easy" ? "Medium" : "Hard"}`
                    : "Home"}
                </button>
                <button
                  onClick={() => router.push("/")}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                >
                  Home
                </button>
              </>
            ) : (
              <button
                onClick={resetQuiz}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
              >
                Retake Quiz
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
