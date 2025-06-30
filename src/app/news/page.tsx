'use client';

import { useEffect, useState } from 'react';
import { Skeleton } from '@/app/components/ui/skeleton';
import MaxWidthWrapper from '@/app/components/ui/MaxWidthWrapper';

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
}

export default function NewsPage() {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch(`/api/news`);
        const data = await response.json();

        if (!data.articles || !Array.isArray(data.articles)) {
          throw new Error('Invalid data format');
        }

        setNews(data.articles);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen w-full">
      {/* Gradient Header */}
      <div className="bg-gradient-to-b from-teal-400 via-blue-600 to-indigo-800 py-20 text-center">
        <MaxWidthWrapper>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Stay Updated with the Latest <span className="text-yellow-300">Cybersecurity News</span>.
          </h1>
          <p className="mt-4 text-lg text-gray-200 max-w-xl mx-auto">
            Get the latest updates on cyber attacks, threats, policies, and security tips.
          </p>
        </MaxWidthWrapper>
      </div>

      {/* News Grid Section (Light Gray Background) */}
      <section className="bg-gray-100 py-16 px-6">
        <MaxWidthWrapper>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <Skeleton key={index} className="h-40 w-full" />
              ))}
            </div>
          ) : error ? (
            <p className="text-red-500 text-center">🚫 Failed to load news. Please try again later.</p>
          ) : news.length === 0 ? (
            <p className="text-yellow-500 text-center">⚠️ No news articles available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((article, index) => (
                <a
                  key={index}
                  href={article.url?.startsWith('http') ? article.url : '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition block ${
                    article.url?.startsWith('http') ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                  }`}
                >
                  <img
                    src={article.urlToImage || '/default-news.jpg'}
                    alt={article.title}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">{article.title}</h3>
                  <p className="text-gray-600 text-sm mt-2">{article.description}</p>
                </a>
              ))}
            </div>
          )}
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
