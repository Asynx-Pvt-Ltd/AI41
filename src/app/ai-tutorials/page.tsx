"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import VideoModal from "../components/VideoModal";

import FAQ from "@/app/components/ui/FAQ";
import TipsToUse from "@/app/components/TutorialsContent";

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

interface Category {
  name: string;
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

interface TutorialCardProps {
  video: Tutorial;
  onVideoClick: (video: Tutorial, e: React.MouseEvent) => void;
}

const TutorialCard: React.FC<TutorialCardProps> = ({ video, onVideoClick }) => {
  const [showAllTags, setShowAllTags] = useState(false);

  const displayedTags = showAllTags ? video.tags : video.tags.slice(0, 2);

  const remainingTagsCount = video.tags.length - 2;

  const handleTagsToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowAllTags(!showAllTags);
  };

  return (
    <div
      className="bg-white dark:bg-gray-700 shadow-lg rounded-lg overflow-hidden hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
      onClick={(e) => onVideoClick(video, e)}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="relative">
          <Image
            src={video.icon || "https://via.placeholder.com/150"}
            alt={video.title}
            width={400}
            height={100}
            className="w-full h-[180px] object-cover"
          />
        </div>

        <h3 className="text-lg font-semibold p-4 text-gray-800 dark:text-white">
          {video.title}
        </h3>

        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-2 p-4">
          <span>👁️ {formatCount(video.viewCount)}</span>
          <span>👍 {formatCount(video.likeCount)}</span>
        </div>

        {/* <div className="px-4 pb-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 flex flex-wrap gap-1">
            {displayedTags.map((tag, i) => (
              <span
                key={i}
                className="bg-blue-500 text-white px-2 py-1 rounded-lg text-xs text-pretty"
              >
                #{tag}
              </span>
            ))}
            {!showAllTags && remainingTagsCount > 0 && (
              <button
                onClick={handleTagsToggle}
                className="text-blue-500 hover:text-blue-600 font-medium focus:outline-none"
              >
                +{remainingTagsCount} more
              </button>
            )}
            {showAllTags && (
              <button
                onClick={handleTagsToggle}
                className="text-blue-500 hover:text-blue-600 font-medium focus:outline-none"
              >
                Show less
              </button>
            )}
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [filtered, setFiltered] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("none");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState<string[]>(["all"]);
  const [activeCategories, setActiveCategories] = useState<string[]>(["all"]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Tutorial | null>(null);

  const handleSearch = (e: { target: { value: string } }) => {
    setSearchTerm(e.target.value);
  };

  const handleVideoClick = (video: Tutorial, e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedVideo(video);
    setIsModalOpen(true);
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
        applyFilters(tutorials, searchTerm, selectedCategory);
        return;
    }
    setFiltered(sortedTutorials);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    applyFilters(tutorials, searchTerm, category);
  };

  const updateActiveCategories = (
    tutorials: Tutorial[],
    categories: string[]
  ) => {
    const activeCats = new Set<string>(["all"]);

    tutorials.forEach((tutorial) => {
      categories.forEach((category) => {
        if (category !== "all") {
          const categoryLower = category.toLowerCase();
          const titleMatch = tutorial.title
            .toLowerCase()
            .includes(categoryLower);
          const tagsMatch = tutorial.tags.some((tag) =>
            tag.toLowerCase().includes(categoryLower)
          );

          if (titleMatch || tagsMatch) {
            activeCats.add(category);
          }
        }
      });
    });

    setActiveCategories(Array.from(activeCats));
  };

  const applyFilters = (
    tutorials: Tutorial[],
    search: string,
    category: string
  ) => {
    let filteredResults = [...tutorials];

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filteredResults = filteredResults.filter(
        (tutorial) =>
          tutorial.title.toLowerCase().includes(searchLower) ||
          tutorial.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }

    // Apply category filter
    if (category !== "all") {
      const categoryLower = category.toLowerCase();
      filteredResults = filteredResults.filter(
        (tutorial) =>
          tutorial.title.toLowerCase().includes(categoryLower) ||
          tutorial.tags.some((tag) => tag.toLowerCase().includes(categoryLower))
      );
    }

    // Apply current sort
    if (sortBy !== "none") {
      handleSort({ target: { value: sortBy } });
      return;
    }

    setFiltered(filteredResults);
  };

  // Fetch categories and tutorials
  useEffect(() => {
    setLoading(true);

    // Fetch categories
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data: Category[]) => {
        const categoryNames = data.map((category) => category.name);
        setCategories(["all", ...categoryNames]);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });

    // Fetch tutorials
    fetch("/api/tutorial")
      .then((res) => res.json())
      .then((d) => {
        const decodedData = d.map((item: Tutorial) => ({
          ...item,
          title: decodeHtmlEntities(item.title),
        }));
        setTutorials(decodedData);
        setFiltered(decodedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tutorials:", error);
        setLoading(false);
      });
  }, []);

  // Update active categories whenever tutorials or categories change
  useEffect(() => {
    updateActiveCategories(tutorials, categories);
  }, [tutorials, categories]);

  useEffect(() => {
    applyFilters(tutorials, searchTerm, selectedCategory);
  }, [searchTerm, selectedCategory]);

  const faqs = [
    {
      question: "How do I make AI Writing Tools sound more like me?",
      answer: (
        <>
          You need to feed your style to the tool. So, begin with samples of
          your writing. The more they know your voice, the better they mimic it.
          Similarly, you can include specific instructions in your prompt, like
          “write in a humorous, sarcastic tone.”
        </>
      ),
    },
    {
      question: "Can AI replace human efforts completely?",
      answer: (
        <>
          Not quite. AI tools are mainly used to automate repetitive tasks.
          Still, there’s no replacement for humans' decision-making ability and
          creativity.
        </>
      ),
    },
    {
      question: "Can I train AI tools with my own data?",
      answer: (
        <>
          Yes. Many AI tools allow you to train their algorithms with your data.
          You can use this feature to personalize the response.
        </>
      ),
    },
    {
      question: "How do I apply AI tools for creative work?",
      answer: (
        <>
          AI tools are really helpful in brainstorming ideas from scratch and
          can even help you craft the content. You can use them along with your
          imagination to achieve better results.
        </>
      ),
    },
    {
      question: "How do I apply AI tools for creative work?",
      answer: (
        <>
          AI tools are really helpful in brainstorming ideas from scratch and
          can even help you craft the content. You can use them along with your
          imagination to achieve better results.
        </>
      ),
    },
    {
      question: "Can I list a tool in your directory?",
      answer: (
        <>
          Of course. You can{" "}
          <Link href={"/submit-ai"} className="underline text-bold text-black">
            submit your AI
          </Link>{" "}
          tool to our directory. Just contact us to know more!
        </>
      ),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-white dark:bg-gray-800 w-full pt-10 pl-6 pr-6 pb-6 text-center">
        {loading === false ? (
          <>
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className=" text-black w-full p-4">
                <div className=" text-center">
                  <h1 className="text-3xl font-bold mb-5">
                    Master AI Tools with Expert Tutorials
                  </h1>
                  <p className="text-md mb-2">
                    Learn to harness the power of AI tools effectively with our
                    curated video tutorials and guides.
                  </p>
                </div>
              </div>

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

              <div className="flex flex-wrap justify-center gap-2 w-full md:w-2/3 lg:w-1/2 mt-4">
                {activeCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                      selectedCategory === category
                        ? "bg-[#222222] text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="container mx-auto px-4 py-2 mt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filtered.map((video, index) => (
                  <TutorialCard
                    key={index}
                    video={video}
                    onVideoClick={handleVideoClick}
                  />
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

      {/* Support */}
      <div>
        <TipsToUse />
      </div>

      {/*FAQ Tutorials */}
      <div className="pb-14 mt-3">
        <FAQ faqs={faqs} title="Frequently Asked Questions" />
      </div>
      <Footer />
      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoId={selectedVideo?.videoId || ""}
        title={selectedVideo?.title || ""}
      />
    </div>
  );
}
