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
  viewCount: string;
  likeCount: string;
}

const formatCount = (count: string): string => {
  const num = parseInt(count);
  if (isNaN(num)) return "0";

  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + "B";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};

const decodeHtmlEntities = (text: string): string => {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = text;
  return textArea.value;
};

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [filtered, setFiltered] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("none");

  const handleSearch = (e: { target: { value: string } }) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e: { target: { value: string } }) => {
    setSortBy(e.target.value);
    let sortedTutorials = [...filtered];

    switch (e.target.value) {
      case "viewsAsc":
        sortedTutorials.sort(
          (a, b) => parseInt(a.viewCount) - parseInt(b.viewCount)
        );
        break;
      case "viewsDesc":
        sortedTutorials.sort(
          (a, b) => parseInt(b.viewCount) - parseInt(a.viewCount)
        );
        break;
      case "likesAsc":
        sortedTutorials.sort(
          (a, b) => parseInt(a.likeCount) - parseInt(b.likeCount)
        );
        break;
      case "likesDesc":
        sortedTutorials.sort(
          (a, b) => parseInt(b.likeCount) - parseInt(a.likeCount)
        );
        break;
      default:
        // Reset to original order
        sortedTutorials = tutorials.filter((v) =>
          v.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    setFiltered(sortedTutorials);
  };

  useEffect(() => {
    setLoading(true);
    fetch("/api/tutorial")
      .then((res) => res.json())
      .then((d) => {
        // Decode HTML entities in titles when setting the initial data
        const decodedData = d.map((item: Tutorial) => ({
          ...item,
          title: decodeHtmlEntities(item.title),
        }));
        setLoading(false);
        setTutorials(decodedData);
        setFiltered(decodedData);
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
    // Re-apply current sorting after search
    if (sortBy !== "none") {
      handleSort({ target: { value: sortBy } });
    }
  }, [searchTerm]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-white dark:bg-gray-800 w-full pt-10 pl-6 pr-6 pb-6 text-center">
        {loading === false ? (
          <>
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="flex w-full md:w-2/3 lg:w-1/2 gap-4">
                <input
                  type="text"
                  placeholder="Search for tutorials..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="flex-1 px-4 py-2 border rounded-md text-gray-700 dark:text-gray-300 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  onChange={handleSort}
                  value={sortBy}
                  className="px-4 py-2 border rounded-md text-gray-700 dark:text-gray-300 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="none">Sort by...</option>
                  <option value="viewsDesc">Most Views</option>
                  <option value="viewsAsc">Least Views</option>
                  <option value="likesDesc">Most Likes</option>
                  <option value="likesAsc">Least Likes</option>
                </select>
              </div>
            </div>
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filtered.map((video, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-lg rounded-lg overflow-hidden hover:bg-[#222222] hover:text-white"
                  >
                    <a
                      href={video.url}
                      target="_blank"
                      className="flex flex-col justify-between h-full"
                    >
                      <div className="relative">
                        <Image
                          src={
                            video.icon
                              ? video.icon
                              : "https://via.placeholder.com/150"
                          }
                          alt={video.title}
                          width={400}
                          height={100}
                          className="w-full h-[180px] object-cover"
                        />
                      </div>

                      <h3 className="text-lg font-semibold p-4">
                        {video.title}
                      </h3>

                      <div className="flex justify-between items-center text-sm text-gray-500 mb-2 p-4">
                        <span>👁️ {formatCount(video.viewCount)}</span>
                        <span>👍 {formatCount(video.likeCount)}</span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {video.tags.map((tag: string, i: number) => (
                          <span key={i} className="mr-2">
                            #{tag}
                          </span>
                        ))}
                      </p>
                    </a>
                  </div>
                ))}
              </div>
            </div>
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
