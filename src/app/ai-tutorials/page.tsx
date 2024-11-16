"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import Footer from "../components/Footer";

interface Tutorial {
  id: number;
  icon: string;
  title: string;
  description: string;
  url: string;
  tags: string[];
  videoId: string;
  viewCount: bigint;
  likeCount: bigint;
}

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [filtered, setFiltered] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: { target: { value: string } }) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    setLoading(true);
    fetch("/api/tutorial")
      .then((res) => res.json())
      .then((d) => {
        setLoading(false);
        setTutorials(d);
        setFiltered(d);
      })
      .catch((err) => {
        console.log("====================================");
        console.log("err --->", err);
        console.log("====================================");
      });
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const find = tutorials.filter((v: { title: string }) =>
        v.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFiltered(find);
    } else {
      setFiltered(tutorials);
    }
  }, [searchTerm]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-white dark:bg-gray-800 w-full pt-10 pl-6 pr-6 pb-6 text-center">
        {loading === false ? (
          <>
            <div className="flex flex-col items-center justify-center space-y-4">
              {/* Search Element */}
              <input
                type="text"
                placeholder="Search for tutorials..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full md:w-2/3 lg:w-1/2 px-4 py-2 border rounded-md text-gray-700 dark:text-gray-300 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filtered.map(
                  (
                    video: {
                      id: number;
                      icon: string;
                      title: string;
                      description: string;
                      url: string;
                      tags: any[];
                    },
                    index: number
                  ) => (
                    <div
                      key={index}
                      className="bg-white shadow-lg rounded-lg overflow-hidden"
                    >
                      <a href={video.url} target="_blank" className="block">
                        <div className="relative">
                          <Image
                            src={video.icon}
                            alt={video.title}
                            width={"100"}
                            height={"100"}
                            className="w-full h-auto object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-semibold">
                              {video.title}
                            </h3>
                          </div>
                          <p className="text-sm text-gray-500">
                            {video.tags.map((tag: string, i: number) => (
                              <span key={i} className="mr-2">
                                #{tag}
                              </span>
                            ))}
                          </p>
                        </div>
                      </a>
                    </div>
                  )
                )}
              </div>
            </div>{" "}
          </>
        ) : (
          <div className="flex flex-row justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black dark:border-white"></div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
