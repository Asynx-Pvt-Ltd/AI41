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
import FAQAccordion from "./components/home/FaqHome";
import {
  AIToolsSection,
  HowToUseSection,
  WhyUseSection,
  WhyChooseUsSection,
  MainFeatures,
} from "@/app/components/home/HowToUse";
import Link from "next/link";
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
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4 font-roboto">
            Discover The Best AI Tools Instantly!
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Have a look at our curated list of AI tools to simplify your tasks.
            Easily compare and select the best AI tools for your needs.
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
        </section>
        {/*=============== HERO END=============================*/}
        <div>
          <h1 className="text-2xl pt-[6vh] font-semibold">AI Categories</h1>
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

        {/* About Section */}
        <section className="w-full flex md:flex-row flex-col justify-center items-center mt-1 mb-1 bg-gray-50">
          <div className="flex flex-1 md:flex-col flex-row justify-center items-center">
            <Image
              src="/ai-tools-directory.webp"
              alt="ai tools directory"
              width={800}
              height={800}
              className="w-auto h-auto"
            />
          </div>
          <div className="flex flex-1 md:flex-col flex-row justify-evenly px-8">
            <div className="flex flex-col">
              <h2 className="text-3xl font-bold text-center mb-6">
                The World's Best AI Tools Directory
              </h2>
              <p className="text-justify text-gray-600 dark:text-gray-300">
                We started an AI tool directory with a simple realization: the
                AI industry is growing tremendously. With many tools popping up
                day by day, finding the right fit for your needs can be as
                tricky as searching for a needle in a haystack. That's why we
                created this directory to make it easier for you to find what
                you're looking for. Our mission is to bring clarity to the chaos
                by curating the best tools in one place. We handpicked each tool
                and updated the listing regularly to help you stay ahead. Let’s
                make the most out of AI!
              </p>
            </div>
          </div>
        </section>

        {/* Main Features Section */}
        <MainFeatures />
        {/* =================================Main Features Section End===================================== */}

        {/* How to Use Section */}
        <main className="bg-white dark:bg-gray-800 w-full h-auto flex-grow">
          <AIToolsSection />
          <HowToUseSection />
          <WhyUseSection />
          <WhyChooseUsSection />
        </main>
        {/* FAQ Section */}
        <section className="py-12 bg-gray-50 dark:bg-gray-900">
          <FAQAccordion />
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Submit an AI Tool Today!
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Do you have a tool that you believe deserves attention? We are
              always on the lookout for new AI tools to add to our collection.
            </p>
            <Link href="/submit-tool">
              <button className="bg-[#222222] text-white font-bold py-3 px-8 rounded-lg">
                Submit Your Tool
              </button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
