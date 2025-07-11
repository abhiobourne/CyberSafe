"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import QuizComponent, { Question } from "../components/QuizComponent";

export default function PostAssessmentClient() {
  const params = useSearchParams();
  const difficulty = params.get("level") as "easy" | "medium" | "hard" | null;
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  const timeLimits = { easy: 120, medium: 180, hard: 300 };

  useEffect(() => {
    if (!difficulty) return;
    async function load() {
      setLoading(true);
      const res = await fetch(`/data/quizzes/${difficulty}.json`);
      const data: Question[] = await res.json();
      setQuestions(data.slice(0, 5));
      setLoading(false);
    }
    load();
  }, [difficulty]);

  if (loading || !difficulty) {
    return <p className="text-center mt-20">Loading quiz…</p>;
  }

  return (
    <QuizComponent
      type="post"
      difficulty={difficulty}
      questions={questions}
      timeLimit={timeLimits[difficulty]}
      onFinish={(score) => {
        const next =
          difficulty === "easy"
            ? "medium"
            : difficulty === "medium"
            ? "hard"
            : null;
        if (score < 6) {
          window.location.href = `/articles/${difficulty}`;
        } else if (next) {
          window.location.href = `/post-assessment?level=${next}`;
        } else {
          window.location.href = `/`;
        }
      }}
    />
  );
}
