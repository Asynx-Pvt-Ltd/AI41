"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import URL from "../../../public/url.png";
import { Header } from "../components/Header";
import Footer from "../components/Footer";
import { Card } from "../components/Card";
import { useRouter } from "next/navigation";
import ToolsByCategories from "../components/ToolsByCategories";

import AllAITools from "@/app/components/AllAITools";
import Link from "next/link";
export default function FullList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryId, setCategoryId] = useState(-1);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<any>([]);
  const [price, setPrice] = useState("");
  const router = useRouter();

  const handleSearch = (e: { target: { value: string } }) => {
    setSearchTerm(e.target.value);
  };
  const handleCategoryChange = (e: { target: { value: string } }) => {
    setCategoryId(parseInt(e.target.value));
  };

  const handlePriceChange = (e: { target: { value: string } }) => {
    setPrice(e.target.value);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) {
          return;
        }
        const data = await response.json();
        setCategories(data);
      } catch (error: any) {}
    };

    fetchCategories();
  }, []);

  const findTools = () => {
    if (searchTerm.trim() || categoryId || price) {
      router.push(
        `/search?s=${encodeURIComponent(
          searchTerm
        )}&category=${encodeURIComponent(
          categoryId
        )}&pricing=${encodeURIComponent(price)}`
      );
    }
  };

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      // Handle the Enter key press
      console.log("Enter key pressed");
      // You can trigger your search logic here
      findTools();
    }
  };

  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow bg-white dark:bg-gray-800 w-full pt-10 pl-6 pr-6 pb-6 text-center mt-5">
          <div className="flex flex-col items-center justify-center space-y-4">
            {/* Search Element */}
            <div className="relative w-full md:w-2/3 lg:w-1/2">
              <input
                type="text"
                placeholder="Search for tools..."
                value={searchTerm}
                onChange={handleSearch}
                onKeyDown={handleKeyDown}
                className="w-full px-4 py-2 border rounded-md text-gray-700 dark:text-gray-300 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10" // Add padding to the right for the icon
              />
              <div
                onClick={() => findTools()}
                className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
              >
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-4.35-4.35m1.65-6.15a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
                  ></path>
                </svg>
              </div>
            </div>
            {/* Filter Options */}
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 w-full md:w-2/3 lg:w-1/2">
              {/* Category Filter */}
              <select
                value={category}
                onChange={handleCategoryChange}
                className="px-4 py-2 border rounded-md text-gray-700 dark:text-gray-300 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/2"
              >
                <option value="">Select Category</option>
                {categories.map((category: { id: number; name: string }) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              {/* Price Filter */}
              <select
                value={price}
                onChange={handlePriceChange}
                className="px-4 py-2 border rounded-md text-gray-700 dark:text-gray-300 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/2"
              >
                <option value="">Select Price</option>
                <option value="free">Free</option>
                <option value="freemium">Freemium</option>
                <option value="paid">Paid</option>
              </select>
            </div>
          </div>

          {/* Card 1 */}

          <h1 className="text-2xl font-semibold text-center pt-[6vh] my-3">
            AI Categories
          </h1>
          <ToolsByCategories />

          <hr className="my-6 mx-9 border-t-4 border-gray-500 dark:border-white" />
          <Card />
          <hr className="my-6 mx-9 border-t-4 border-gray-500 dark:border-white" />
          <section className="w-5/6 flex bg-slate-300 rounded-lg py-8 px-3 md:flex-row flex-col justify-center mx-auto my-9">
            <div className="flex flex-1 flex-col justify-center items-center">
              <Image
                src={"/ai tools.webp"}
                width={200}
                height={200}
                alt={"AI Tools"}
              />
            </div>
            <div className="flex flex-1 md:flex-col flex-row justify-evenly">
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold">
                  What is an AI Tool Directory?
                </h1>
                <p className="text-justify mt-4 pr-4 link_design">
                  An <Link href={"/"}>AI Tool directory</Link> is a curated
                  collection of important AI tools in a wide range of
                  industries. It’s just like a library. But here, instead of
                  books, you will get a list of all AI tools for your purpose—
                  be it writing, designing, coding, or education. You can even
                  have a glance at the description, including the features,
                  pricing, usage, etc., to make the decision-making process much
                  easier.
                </p>
              </div>
            </div>
          </section>
          <section className="w-5/6 flex bg-slate-300 rounded-lg py-8 px-3 md:flex-row flex-col-reverse justify-center mx-auto my-2">
            <div className="flex flex-1 flex-col justify-evenly">
              <h1 className="text-2xl font-bold">
                Where To Find A List With All AI Tools?
              </h1>
              <p className="text-justify mt-2 pl-4 link_design">
                Luckily, our AI tool directory has a curated list of all{" "}
                <Link href={"/all-ai-tools"}>AI tools</Link>. You can use our
                advanced filtering system to find the tools that match your
                purpose. We even provide a dedicated page for each tool with all
                details. So the decision-making process will be much easier.
              </p>
            </div>
            <div className="flex flex-1 flex-col justify-center items-center">
              <Image
                src={"/vote-favorite-ai-tools.webp"}
                width={200}
                height={200}
                alt={""}
              />
            </div>
          </section>
        </main>
      </div>
      <div>
        <AllAITools />
      </div>
      <Footer />
    </div>
  );
}
