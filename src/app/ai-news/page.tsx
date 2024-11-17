"use client";

import Image from "next/image";
import Footer from "../components/Footer";
import { Header } from "../components/Header";
import { useState, useEffect, Key } from "react";
import Link from "next/link";

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
      <main className="flex-grow bg-white dark:bg-gray-800 w-full pt-10 pb-6 text-center">
        <div className="container py-8">
          <h1 className="text-3xl font-bold text-center mb-8">
            Latest AI News & Trends
          </h1>
          {loading === false ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center ">
              {news.map((n: any, index: number) => (
                <Link
                  href={n.slugUrl}
                  target="_blank"
                  key={index}
                  className="bg-white shadow-lg rounded-lg overflow-hidden w-[400px] h-fit flex flex-col justify-around gap-2"
                >
                  <Image
                    src={n.icon}
                    alt={n.title}
                    width={100}
                    height={192}
                    className="w-[400px] h-[180px] object-cover"
                  />

                  <h2 className="text-lg font-semibold p-2">{n.title}</h2>
                  <div className="px-4 mb-4">
                    <p className="text-gray-600 text-[14px] text-left line-clamp-3 ">
                      {n.description}
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
