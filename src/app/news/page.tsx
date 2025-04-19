'use client';

import { useEffect, useState } from 'react';
import { Skeleton } from '@/app/components/ui/skeleton';
import MaxWidthWrapper from '@/app/components/ui/MaxWidthWrapper';
import Image from 'next/image';

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
    <section className="py-12 px-6">
      {/* Header Section */}
      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Stay Updated with the Latest <span className="text-blue-600">Cybersecurity News</span>.
          </h1>
        </div>
      </MaxWidthWrapper>

      {/* Content */}
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
              className={`bg-gray-800 rounded-lg p-4 hover:shadow-lg transition block ${
                article.url?.startsWith('http') ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
              }`}
            >
              <Image
                src={article.urlToImage || '/default-news.jpg'}
                alt={article.title}
                width={600}
                height={240}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold text-white">{article.title}</h3>
              <p className="text-gray-400 text-sm mt-2">{article.description}</p>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
