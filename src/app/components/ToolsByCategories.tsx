"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import URL from "../../../public/url.png";
import Link from "next/link";

interface Tool {
  id: number;
  icon: string;
  name: string;
  slug: string;
  description: string;
  url: string;
  categories: { id: number; name: string }[];
}

interface Category {
  id: number;
  name: string;
  slug: string;
  fontIcon: string;
  tools: { toolId: number; categoryId: number }[];
}

function ToolsByCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/categories").then((res) => res.json()),
      fetch("/api/tools").then((res) => res.json()),
    ])
      .then(([categoriesData, toolsData]) => {
        setCategories(categoriesData);
        setTools(toolsData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch data:", err);
        setLoading(false);
      });
  }, []);

  const getToolsForCategory = (categoryId: number) => {
    return tools.filter((tool) =>
      tool.categories.some((cat) => cat.id === categoryId)
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black dark:border-white"></div>
      </div>
    );
  }

  return (
    <section className="container mx-auto">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-3 lg:grid-cols-4 py-10">
          {categories.slice(0, 8).map((category) => {
            const categoryTools = getToolsForCategory(category.id);
            return categoryTools.length > 0 ? (
              <div
                key={category.id}
                className="bg-white dark:bg-gray-800 dark:border dark:border-slate-500 rounded-lg shadow-lg p-4"
              >
                <h2 className="dark:text-white text-xl font-bold mb-4">
                  <i className={category.fontIcon}></i> {category.name}
                </h2>
                <hr className="my-6 mx-6 border-t-4 border-gray-500 dark:border-white" />
                <div className="max-h-52 overflow-y-auto pr-2">
                  <ul className="list-none pl-5">
                    {categoryTools.map((tool, idx) => (
                      <li
                        key={tool.id}
                        className="flex flex-row justify-between items-center mb-2"
                      >
                        <div className="flex flex-1 flex-row items-center">
                          <span className="mr-2 text-gray-600">{idx + 1}.</span>
                          <Link
                            href={`/tool/${tool.slug}`}
                            className="text-black dark:text-white hover:underline"
                          >
                            {tool.name}
                          </Link>
                        </div>
                        <a
                          href={tool.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2"
                        >
                          <Image
                            src={URL}
                            alt="External Link"
                            width={24}
                            height={24}
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null;
          })}
        </div>
      </div>
    </section>
  );
}

export default ToolsByCategories;
