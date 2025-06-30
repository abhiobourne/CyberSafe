"use client";

import MaxWidthWrapper from "../components/ui/MaxWidthWrapper";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

type Article = {
  id: string;
  title: string;
  description: string;
  url: string;
  publishedAt?: string;
};

export default function UpdatesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const res = await fetch("/data/articles/articles.json");
      const data = await res.json();
      setArticles(data);
      setLoading(false);
    };
    fetchArticles();
  }, []);

  return (
    <div className="bg-white min-h-screen py-16">
      <MaxWidthWrapper>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Cybersecurity Updates & Insights</h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Stay informed with the latest trends, tips, and real-world incidents in cybersecurity.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center mt-10">
            <Loader2 className="animate-spin h-6 w-6 text-teal-600" />
          </div>
        ) : (
          <div className="space-y-8">
            {articles.map((article) => (
              <div key={article.id} className="space-y-1">
                <Link href={article.url} target="_blank" className="text-blue-800 text-xl hover:underline font-medium">
                  {article.title}
                </Link>
                <p className="text-green-700 text-sm">{article.url}</p>
                <p className="text-gray-700 text-sm max-w-3xl">{article.description}</p>
              </div>
            ))}
          </div>
        )}
      </MaxWidthWrapper>
    </div>
  );
}
