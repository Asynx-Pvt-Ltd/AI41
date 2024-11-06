"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/app/components/Card";
import { Header } from "@/app/components/Header";
import SeeMoreButton from "@/app/components/SeeMoreButton";
import "./styles/style.css";

import AIPlatformsCarousel from "@/app/components/AIPlatforms";
import Footer from "@/app/components/Footer";
import ToolsByCategories from "@/app/components/ToolsByCategories";

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryId, setCategoryId] = useState(-1);
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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) {
          console.log("====================================");
          console.log("Failed to fetch categories");
          console.log("====================================");
          return;
        }
        const data = await response.json();
        setCategories(data);
      } catch (error: any) {
        console.log("====================================");
        console.log("error.message --->", error.message);
        console.log("====================================");
      }
    };

    fetchCategories();
  }, []);

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      // Handle the Enter key press
      console.log("Enter key pressed");
      // You can trigger your search logic here
      findTools();
    }
  };
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="bg-white dark:bg-gray-800 w-full h-auto pt-10 pl-6 pr-6 pb-6 text-center flex-grow">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 font-roboto">
          AI Tools Directory
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Access the largest list of top-quality AI tools available on the web ★
        </p>
        <div className="flex flex-col items-center justify-center space-y-4">
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
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 w-full md:w-2/3 lg:w-1/2">
            {/* Category Filter */}
            <select
              value={categoryId}
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
        <ToolsByCategories />
        <hr className="my-7 mx-9 border-t-4 border-gray-500 dark:border-white" />
        <Card />
        <section className="container p-4 mt-4">
          <SeeMoreButton />
        </section>
        <section className="container p-4 my-11">
          <h1 className="text-2xl font-bold mb-6">Popular AI Platforms</h1>
          <AIPlatformsCarousel />
        </section>
        <section className="w-full flex md:flex-row flex-col justify-center items-center mt-11 mb-10">
          <div className="flex flex-1 md:flex-col flex-row justify-center items-center">
            <Image
              src={"/ai-tools-directory.webp"}
              alt={"ai tools directory"}
              width={800}
              height={800}
              className="w-auto h-auto"
            />
          </div>
          <div className="flex flex-1 md:flex-col flex-row justify-evenly px-2">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-center">
                The World&apos;s Best AI Tools Directory
              </h1>
              <p className="text-left mt-6">
                Aixploria is an online platform focused on artificial
                intelligence, offering a comprehensive directory of the best AI
                tools available. Our website organizes listings into categories,
                making it easy to find AI tools that match your needs. In fact,
                you&apos;ll find one of the most extensive collections of
                AI-powered websites here, updated daily to ensure you never miss
                the latest developments—so be sure to bookmark the page.
                <br />
                <br />
                Recently, we&apos;ve started publishing articles that explain
                how different AI tools work. If you come across an AI tool that
                isn&apos;t listed, you can now submit it to be added to the
                directory or even ranked among the top 10. Essentially,
                Aixploria serves as both a directory and a search engine
                dedicated to AI, featuring a simple, clean interface that allows
                you to easily search for tools using keywords, just like you
                would with a traditional search engine.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
