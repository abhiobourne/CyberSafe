"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Question = {
  question: string;
  options: string[];
  answer: string;
};

type QuizProps = {
  questions: Question[];
  type: "pre" | "post";
  onSubmit?: (score: number) => void; // external handler
};

const QuizComponent = ({ questions = [], type, onSubmit }: QuizProps) => {
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (questions.length > 0 && userAnswers.length === 0) {
      setUserAnswers(Array(questions.length).fill(""));
    }
  }, [questions, userAnswers.length]);

  const handleSelect = (qIndex: number, option: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[qIndex] = option;
    setUserAnswers(newAnswers);
  };

  const calculateScore = () => {
    let correct = 0;
    userAnswers.forEach((ans, i) => {
      if (ans === questions[i].answer) correct++;
    });
    return Math.round((correct / questions.length) * 100);
  };

  const handleSubmit = () => {
    const result = calculateScore();
    setScore(result);
    setSubmitted(true);

    // 🔁 Trigger external handler if provided
    if (onSubmit) {
      onSubmit(result);
      return;
    }

    // 🧠 Default internal logic
    if (type === "pre") {
      localStorage.setItem("pre_score", result.toString());

      setTimeout(() => {
        if (result < 60) {
          router.push("/article");
        } else {
          router.push("/post-assessment");
        }
      }, 2500);
    }

    if (type === "post") {
      const pre = Number(localStorage.getItem("pre_score") || 0);
      const improvement = result - pre;
      alert(`You improved by ${improvement}%`);
    }
  };

  if (!questions || questions.length === 0) {
    return <p className="text-center mt-20 text-gray-700">Loading quiz...</p>;
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white text-gray-900 rounded-xl shadow-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {type === "pre" ? "Pre-Assessment Quiz" : "Post-Assessment Quiz"}
      </h1>

      {questions.map((q, i) => (
        <div key={i} className="mb-6">
          <h3 className="font-semibold">
            {i + 1}. {q.question}
          </h3>
          <div className="mt-2 space-y-2">
            {q.options.map((opt, j) => (
              <label key={j} className="block">
                <input
                  type="radio"
                  name={`q${i}`}
                  value={opt}
                  checked={userAnswers[i] === opt}
                  onChange={() => handleSelect(i, opt)}
                  disabled={submitted}
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
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg mt-4"
        >
          Submit
        </button>
      ) : (
        <p className="text-xl font-semibold text-center text-green-600 mt-6">
          Your Score: {score}%
        </p>
      )}
    </div>
  );
};

export default QuizComponent;
