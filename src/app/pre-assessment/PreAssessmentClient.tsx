// app/pre-assessment/PreAssessmentClient.tsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import QuizComponent, { Question } from "../components/QuizComponent";

export default function PreAssessmentClient() {
  const params = useSearchParams();
  const levelParam = params.get("level") as "easy" | "medium" | "hard" | null;
  const difficulty = levelParam ?? "easy";

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const timeLimits = { easy: 120, medium: 180, hard: 300 };

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await fetch(`/data/quizzes/${difficulty}.json`);
      const data: Question[] = await res.json();
      setQuestions(data.slice(0, 5));
      setLoading(false);
    }
    load();
  }, [difficulty]);

  if (loading) {
    return <p className="text-center mt-20">Loading quiz…</p>;
  }

  return (
    <QuizComponent
      type="pre"
      difficulty={difficulty}
      questions={questions}
      timeLimit={timeLimits[difficulty]}
    />
  );
}
