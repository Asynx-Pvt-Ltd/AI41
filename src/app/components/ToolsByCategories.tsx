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
}

interface ToolsByCategory {
  name: string;
  tools: Tool[];
  fontIcon: string;
}

function ToolsByCategories() {
  const [tools, setTools] = useState<ToolsByCategory[] | null>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((t) => {
        setLoading(false);
        setTools(t);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    if (tools?.length) {
      tools.map((t, i) => {});
    }
  }, [tools]);
  return (
    <section className="container mx-auto">
      <>
        {loading === false ? (
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-3 lg:grid-cols-4 py-10">
              {tools &&
                tools.length > 0 &&
                tools?.map((category: ToolsByCategory, index: number) =>
                  category.tools.length > 0 ? (
                    <div
                      key={index}
                      className="bg-white dark:bg-gray-800 dark:border dark:border-slate-500 rounded-lg shadow-lg p-4"
                    >
                      <h2 className="dark:text-white text-xl font-bold mb-4">
                        <i className={category.fontIcon}></i> {category.name}
                      </h2>
                      <hr className="my-6 mx-6 border-t-4 border-gray-500 dark:border-white" />
                      <div className="max-h-40 overflow-y-auto">
                        <ul className="list-none pl-5">
                          {category?.tools?.map((tool, idx) => (
                            <li
                              key={idx}
                              className="flex flex-row justify-between"
                            >
                              <div className="flex flex-1 flex-row justify-start">
                                <span className="dark:text-white">
                                  {idx + 1}
                                </span>
                                <span className="ml-2">
                                  <Link
                                    href={`/tool/${tool.slug}`}
                                    target="_self"
                                    className="flex flex-1 text-black dark:text-white hover:underline"
                                  >
                                    {tool.name}
                                  </Link>
                                </span>
                              </div>
                              <div className="flex flex-row justify-end">
                                <a
                                  href={tool.url}
                                  target="_blank"
                                  className="text-blue-500 hover:underline"
                                >
                                  <Image
                                    src={URL}
                                    alt="url"
                                    width={24}
                                    height={24}
                                  />
                                </a>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : null
                )}
            </div>
          </div>
        ) : (
          <div className="flex flex-row justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black dark:border-white"></div>
          </div>
        )}
      </>
    </section>
  );
}

export default ToolsByCategories;

export async function getServerSideProps() {
  const categories = await prisma.category.findMany({
    include: {
      tools: true, // Include all the tools under each category
    },
  });

  // Map the data to the desired format
  const formattedData = categories.map(
    (category: { name: any; tools: any[] }) => ({
      category: category.name,
      tools: category.tools.map((tool) => ({
        name: tool.name,
        icon: tool.icon,
        description: tool.description,
        url: tool.url,
      })),
    })
  );

  return {
    props: {
      toolsByCategories: formattedData, // Pass the formatted data to the page component
    },
  };
}
