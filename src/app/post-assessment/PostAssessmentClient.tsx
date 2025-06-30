"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import QuizComponent from "../components/QuizComponent";

type Question = {
  question: string;
  options: string[];
  answer: string;
};

export default function PostAssessmentClient() {
  const searchParams = useSearchParams();
  const difficulty = searchParams.get("level") as "easy" | "medium" | "hard" | null;
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (difficulty) {
      fetch(`/data/quizzes/${difficulty}.json`)
        .then((res) => res.json())
        .then((data) => setQuestions(data));
    }
  }, [difficulty]);

  const handlePostQuizSubmit = (score: number) => {
    const nextLevel =
      difficulty === "easy" ? "medium" :
      difficulty === "medium" ? "hard" :
      null;

    if (score < 60 && difficulty) {
      router.push(`/articles/${difficulty}`);
    } else if (score >= 60 && nextLevel) {
      router.push(`/post-assessment?level=${nextLevel}`);
    } else {
      router.push("/"); // Final level passed
    }
  };

  if (!difficulty || !questions) return <p className="text-center mt-20">Loading...</p>;

  return (
    <QuizComponent
      type="post"
      questions={questions}
      onSubmit={handlePostQuizSubmit}
    />
  );
}
