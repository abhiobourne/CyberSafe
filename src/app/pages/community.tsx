"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import QuizComponent from "../components/QuizComponent";

type Question = {
  question: string;
  options: string[];
  answer: string;
};

export default function PreAssessmentPage() {
  const router = useRouter();
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard" | null>(null);
  const [questions, setQuestions] = useState<Question[] | null>(null);

  const loadQuestions = async (level: "easy" | "medium" | "hard") => {
    const res = await fetch(`/data/quizzes/${level}.json`);
    const data = await res.json();
    setQuestions(data);
  };

  const handleSubmit = (score: number) => {
    localStorage.setItem("pre_score", score.toString());

    if (score < 6 && difficulty) {
      router.push(`/articles/${difficulty}`);
    } else {
      router.push("/post-assessment");
    }
  };

  const handleDifficultySelect = (level: "easy" | "medium" | "hard") => {
    setDifficulty(level);
    loadQuestions(level);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Pre-Assessment Quiz</h2>

      {!difficulty && (
        <div className="flex justify-center gap-4 flex-wrap">
          {["easy", "medium", "hard"].map((level) => (
            <button
              key={level}
              onClick={() => handleDifficultySelect(level as "easy" | "medium" | "hard")}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition"
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      )}

      {difficulty && questions && (
        <QuizComponent
          title={`Pre-Assessment (${difficulty})`}
          questions={questions}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
