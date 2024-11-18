"use client";

import Image from "next/image";
import Footer from "../components/Footer";
import { Header } from "../components/Header";
import { useState, useEffect } from "react";
import Link from "next/link";

const getTimeAgo = (dateString: string) => {
  // Parse the date string in format "MM/DD/YYYY, HH:mm AM/PM, +0000 UTC"
  const date = new Date(dateString);
  const now = new Date();

  const diffInMilliseconds = now.getTime() - date.getTime();
  const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);

  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
  } else if (diffInDays < 7) {
    return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;
  } else if (diffInWeeks < 4) {
    return `${diffInWeeks} ${diffInWeeks === 1 ? "week" : "weeks"} ago`;
  } else {
    return `${diffInMonths} ${diffInMonths === 1 ? "month" : "months"} ago`;
  }
};

export default function Page() {
  const [news, setNews] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/news")
      .then((res) => res.json())
      .then((d) => {
        setLoading(false);
        setNews(d);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-white dark:bg-gray-800 w-full pt-5 pb-6 text-center">
        <div className="container py-8">
          <h1 className="text-3xl font-bold text-center mb-8">
            Latest AI News & Trends
          </h1>
          {loading === false ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-5">
              {news.map((n: any, index: number) => (
                <Link
                  href={"/ai-news/" + encodeURIComponent(n.slugUrl)}
                  target="_blank"
                  key={index}
                  className="bg-white shadow-lg rounded-lg overflow-hidden w-[320px] h-[380px] flex flex-col justify-around gap-1"
                >
                  <Image
                    src={n.icon || "/ai-tools-directory.webp"}
                    alt={n.title}
                    width={100}
                    height={192}
                    className="w-[400px] h-[180px] object-cover rounded-[inherit]"
                  />

                  <h2 className="text-lg font-semibold p-2 line-clamp-2">
                    {n.title}
                  </h2>
                  <div className="px-4 mb-4">
                    <p className="text-gray-600 text-[13px] text-justify line-clamp-3 leading-tight text-balance">
                      {n.description}
                    </p>
                  </div>
                  <div className="px-4 pb-4">
                    <p className="text-left text-xs text-gray-500 font-semibold">
                      {getTimeAgo(n.date)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-row justify-center items-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black dark:border-white"></div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
