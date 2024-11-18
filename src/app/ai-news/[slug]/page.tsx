"use client";
import { NextPage } from "next";
import { Header } from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { useState, useEffect } from "react";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";
interface NewsItem {
  id: number;
  icon: string;
  title: string;
  url: string;
  date: string;
  slugUrl: string;
  description: string;
}

interface Props {
  params: {
    slug: string;
  };
}

const Page: NextPage<Props> = ({ params }) => {
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSingleNews = async () => {
      try {
        const response = await fetch("/api/fetchSingleNews", {
          method: "POST",
          body: JSON.stringify({
            slug: decodeURIComponent(params.slug),
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch news item");
        }

        const data = await response.json();
        setNewsItem(data);
        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        setLoading(false);
      }
    };

    fetchSingleNews();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  if (!newsItem) {
    return null;
  }

  const formattedDate = format(
    new Date(newsItem.date),
    "MMMM d, yyyy 'at' h:mm a"
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-10 max-w-4xl">
        <article className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <div className="relative h-[400px] w-full">
            <Image
              src={newsItem.icon}
              alt={newsItem.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="p-6 md:p-10">
            <header className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {newsItem.title}
              </h1>

              <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
                <span className="text-sm">{formattedDate}</span>
                <Link
                  href={newsItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Original Source
                </Link>
              </div>
            </header>

            <div className="prose dark:prose-invert prose-lg max-w-none text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
              {newsItem.description}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default Page;
