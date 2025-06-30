import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Article = {
  title: string;
  summary: string;
  source: string;
  url: string;
  image: string;
};

export default function ArticlePage({
  params,
}: {
  params: { level: string };
}) {
  const { level } = params;
  const [articles, setArticles] = useState<Article[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/data/articles/articles.json")
      .then((r) => r.json())
      .then(setArticles);
  }, []);

  const filtered = articles.filter((_, i) => i % 3 === 0); // example filter

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Recommended Reading</h1>
      <p className="mb-6">
        You scored below 6 on <strong>{level}</strong>. Read these articles, then
        take the quiz again:
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((a) => (
          <div key={a.url} className="border rounded-lg overflow-hidden">
            <img src={a.image} alt={a.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h2 className="font-semibold">{a.title}</h2>
              <p className="text-sm text-gray-600 mb-2">{a.source}</p>
              <p className="text-sm mb-4 line-clamp-3">{a.summary}</p>
              <button
                onClick={() => router.push(`/pre-assessment?level=${level}`)}
                className="text-blue-600 hover:underline"
              >
                Retry Quiz
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
