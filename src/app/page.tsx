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
import FAQ from "@/app/components/ui/FAQ";
import {
  AIToolsSection,
  HowToUseSection,
  WhyUseSection,
  WhyChooseUsSection,
  MainFeatures,
} from "@/app/components/HomeContent";
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
  const faqs = [
    {
      question: "Why the name AI41?",
      answer: (
        <>
          AI41 stands for a simpler and more creative name. Numerologically, 41
          means 'AI'(A = the 4th letter of the alphabet, I = the 1st letter).
          Therefore, it's an intelligent and easily memorable symbol of
          artificial intelligence. It reflects our mission to simplify your
          experience with AI.
        </>
      ),
    },
    {
      question: "What is an AI tool directory?",
      answer: (
        <>
          An AI tool directory is a curated platform with a list of assorted
          tools empowered by Artificial Intelligence. You can use it to find the
          right tools for your needs.
        </>
      ),
    },
    {
      question: "Are the tools listed here free?",
      answer: (
        <>
          Our list includes some free and paid tools. You can go through the
          dedicated page of each tool to know the pricing details.
        </>
      ),
    },
    {
      question:
        "Do I need to sign up or create an account to access the directory?",
      answer: (
        <>
          No sign-up or account is required to check the tools. Even with a
          sign-up account, you may benefit from such features as adding tools to
          your favorite list.
        </>
      ),
    },
    {
      question: "Are the tools listed verified and reliable?",
      answer: (
        <>
          We're serious about reliability. Every tool in our directory is vetted
          through user feedback and performance checks. We even consider the
          credibility of the developers. That means you will see only trusted,
          high-quality tools for your purpose.
        </>
      ),
    },
    {
      question:
        "How do you verify the effectiveness of the AI tools listed here?",
      answer: (
        <>
          We run the tools through scenarios relevant to their intended use.
          Similarly, our team checks the case studies and user reviews.
          Sometimes, we even reach out to the companies directly for deeper
          insights. Thus, we ensure that all the tools listed on our platform
          are high-quality.
        </>
      ),
    },
    {
      question: "Are the tools added manually?",
      answer: (
        <>
          Yes, each tool was manually reviewed before including in our
          directory. We consider many factors like features, reputation of the
          developer, data security, ease-of-use, etc. Such a hands-on approach
          makes sure that only high-quality tools are listed.
        </>
      ),
    },
    {
      question: "Are the tools regularly updated?",
      answer: (
        <>
          Yes. We have a dedicated team to introduce new tools to the directory
          and check the updates of the existing tools to refine the description.
          We even remove tools that have become obsolete. Thus, you will always
          have access to the latest information.
        </>
      ),
    },
    {
      question:
        "How do you keep your directory up-to-date with the latest AI innovations?",
      answer: (
        <>
          Our tech team works like a radar that detects new AI updates
          instantly. Our team members actively engage with tech communities. We
          even go to industry events to stay ahead with the latest updates. When
          a new tool hits the market, we use it firsthand for evaluation. On top
          of that, we have a submission system through which the developer can
          introduce innovation directly to us. Our directory is, therefore, a
          living and constantly updated resource to find AI tools.
        </>
      ),
    },
    {
      question:
        "How do you deal with the AI tools becoming outdated by technological advancement?",
      answer: (
        <>
          Obsolescence in tech is almost a certainty. That’s why we are
          proactive. We follow tech trends and AI research reports. That makes
          it easy for us to spot the tools that are at risk. We will constantly
          monitor the tool’s reviews and engage with its user community. Tools
          that fail to stay updated will be eventually removed from our
          directory after a close evaluation by our team.
        </>
      ),
    },
    {
      question:
        "How do you balance promoting new AI tools while ensuring they're reliable?",
      answer: (
        <>
          It's a delicate balance. We expose new tools to you, but we first
          place reliability ahead of that exposure. Newly released tools get a
          'new release' tag, and we are monitoring the feedback coming from our
          users very closely. If a tool doesn't cut it or has significant
          issues, we may remove it from our directory.
        </>
      ),
    },
    {
      question: "Do you include pricing information for the tools listed?",
      answer: (
        <>
          We realize that pricing is part of a decision-making process. Every
          tool's page provides plain but updated pricing information. You can
          filter the tools through your budget requirements, also. We even give
          a link to the official website of the tool. You can directly contact
          the team for customized packages.
        </>
      ),
    },
    {
      question: "How does the directory help beginners new to AI tools?",
      answer: (
        <>
          We have opened an AI tutorial page for beginners who have zero
          knowledge of AI. You can view tutorial videos of many tools over
          there. It helps you to ease the learning curve and get used to the
          tool more easily.
        </>
      ),
    },
    {
      question: "What makes your directory different from others?",
      answer: (
        <>
          Unlike generic directories, we curate collections of competitive AI
          tools catering to a variety of needs. You can use advanced search and
          filtering systems to narrow down the tools of your industry. We even
          have a dedicated AI tutorials page to help you know how to use the
          tool. You can also regularly visit our AI news page to stay ahead with
          the latest updates.
        </>
      ),
    },
    {
      question: "How can I find free AI tools?",
      answer: (
        <>
          You can use our directory and apply the “free” filter. You can also
          use a directory dedicated exclusively to free tools like{" "}
          <strong>
            <Link
              href={"https://aiforeveryone.org/"}
              target="_blank"
              rel="noopener noreferrer"
            >
              AI for Everyone
            </Link>
          </strong>{" "}
          to find the best, free AI tools. Each listing also shows if a tool is
          completely free or has premium features, so you can pick the right
          option without wasting time.
        </>
      ),
    },
    {
      question: "How can I find tools specific to my skillset?",
      answer: (
        <>
          Selecting AI tools that match your skillset requires a bit of
          self-assessment. First of all, analyze your current abilities—are you
          a beginner or an expert? Most directories, including ours, offer
          specific settings to filter based on ease of use, skill levels, and so
          on. You can use them to find the right fit. Similarly, you can also
          keep an eye on our AI tutorials section to check whether the interface
          of the tool is simple enough. If you're still not sure, start with
          tools that offer free versions or trials.
        </>
      ),
    },
    {
      question: "Where to find the latest AI news?",
      answer: (
        <>
          Right here! We curate and hand-pick the latest AI news straight on our
          website. All of them are cross-verified by our expert teams.
        </>
      ),
    },
    {
      question: "How can I get my AI tool listed?",
      answer: (
        <>
          If you have developed an AI tool, we'd be glad to showcase it. Please
          visit our{" "}
          <strong>
            <Link href={"/submit-ai"} target="_blank" rel="noopener noreferrer">
              ‘Submit AI Tool’
            </Link>
          </strong>{" "}
          section of our page to list it. We will manually test your tool. If it
          passes the test, we will showcase it in our directory.
        </>
      ),
    },
    {
      question: "How can I report an error?",
      answer: (
        <>
          Caught something that doesn't seem right? You can reach out to us
          directly to report the issue. We always try to correct errors quickly
          so our directory remains accurate and useful.
        </>
      ),
    },
    {
      question: "How many AI tools are there?",
      answer: (
        <>
          Counting AI tools is like counting stars. New ones emerge all the
          time. Some fade into insignificance over time. We have listed
          thousands of tools here. More are being found and added daily. So, the
          figure is ever-changing.
        </>
      ),
    },
    {
      question: "What are the best free AI tools?",
      answer: (
        <>
          These are the best mainstream AI tools now:
          <br />
          <br />
          <span className="">
            <span>
              <strong>
                <Link
                  href={"https://chatgpt.com/"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <b>Chat GPT:</b>
                </Link>
              </strong>{" "}
              The pioneering AI chatbot that works well for many purposes, right
              from writing a poem to coding.
            </span>
            <br />
            <br />
            <span>
              <strong>
                <Link
                  href={"https://gemini.google.com/"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <b>Gemini:</b>
                </Link>
              </strong>{" "}
              An AI tool based on Google's vast database. You can use it to make
              data-driven decisions.
            </span>
            <br />
            <br />
            <span>
              <strong>
                <Link
                  href={"https://claude.ai/"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <b>Claude:</b>
                </Link>
              </strong>{" "}
              Another AI chatbot where you can feed your response style directly
              for more personalized responses.
            </span>
            <br />
            <br />
            <span>
              <strong>
                <Link
                  href={"https://x.com/i/grok"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <b>Grok:</b>
                </Link>
              </strong>{" "}
              A versatile AI tool on the X (formerly Twitter) platform that
              specializes in image generation.
            </span>
            <br />
            <br />
            <span>
              <strong>
                <Link
                  href={"https://www.perplexity.ai/"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <b>Perplexity AI:</b>
                </Link>
              </strong>{" "}
              An advanced search engine AI tool that uses real-time data, mainly
              for research purposes.
            </span>
          </span>
        </>
      ),
    },
    {
      question: "How do I find AI tools tailored to my industry?",
      answer: (
        <>
          It’s pretty easy. We have a dedicated AI Jobs page for that. Just type
          in your job or industry. Within seconds, we will show you the best AI
          tools for your purpose. You can even make use of the advanced search
          and categorization features to filter tools by industry.
        </>
      ),
    },
    {
      question: "How do I deal with data security when using AI tools?",
      answer: (
        <>
          You must always know how a specific AI tool manages the data before
          trying it. Only pick tools with robust privacy policies. For
          industries that handle sensitive information, always look for
          adherence to{" "}
          <strong>
            <Link
              href={"https://gdprinfo.eu/"}
              target="_blank"
              rel="noopener noreferrer"
            >
              GDPR
            </Link>
          </strong>{" "}
          or HIPAA regulations. We will instantly remove any AI tools that are
          spotted with data breaches.
        </>
      ),
    },
    {
      question: "Can I use AI for educational purposes?",
      answer: (
        <>
          Yes, of course. There are many AI tools that are made specifically for
          the education sector. For example,{" "}
          <strong>
            <Link
              href={"https://discover.carnegielearning.com/texas-mathia"}
              target="_blank"
              rel="noopener noreferrer"
            >
              Carnegie Learning's MATHia
            </Link>
          </strong>{" "}
          is a dedicated tool for personalized math education. Quizlet is
          another AI tool that you can use for exam preparation. The main
          highlight is that most of these AI tools can adapt to your learning
          style. They give real-time feedback. Above all, they make education
          more interactive and practical.
        </>
      ),
    },
    {
      question:
        "How do you address the integration problems that may arise from using several AI tools from your directory?",
      answer: (
        <>
          That is indeed a puzzle. Remember, we never guarantee the integration
          capabilities of the tools listed here. Yet, we try to help you in this
          regard. First of all, our team adds a detailed tech spec in each
          listing so you know what you are getting into. We also have a
          dedicated tutorial page that addresses the most common integration
          issues and how to solve them.
        </>
      ),
    },
    {
      question: "What is the future of AI tools?",
      answer: (
        <>
          The future of AI tools is both exciting and a little unpredictable.
          More personalized AI tools will come that adapt to user patterns.
          Integration with more daily technologies is also expected, like{" "}
          <strong>
            <Link
              href={
                "https://newo.ai/insights/the-evolution-of-smart-homes-integrating-ai-in-home-automation/"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              AI in home devices
            </Link>
          </strong>
          . You can stay tuned to our AI news page to get updated with the
          latest AI trends.
        </>
      ),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="bg-white dark:bg-gray-800 w-full h-auto pt-10 pl-6 pr-6 pb-6 text-center flex-grow">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 font-roboto">
            Discover The Best AI Tools Instantly!
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
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
        <section className="w-full flex md:flex-row flex-col justify-center items-center bg-gray-50">
          <div className="flex flex-1 md:flex-col flex-row justify-center items-center">
            <Image
              src="/ai-tools-directory.webp"
              alt="ai tools directory"
              width={800}
              height={800}
              className="w-auto h-auto"
            />
          </div>
          <div className="flex flex-1 md:flex-col flex-row justify-evenly px-8 py-6 mt-4">
            <div className="flex flex-col">
              <h2 className="text-3xl font-bold text-center mb-6">
                The World's Best AI Tools Directory
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-md">
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
        <section className=" bg-gray-50 dark:bg-gray-900 my-5 py-5">
          <FAQ faqs={faqs} title="Frequently Asked Questions" />
        </section>

        {/* Call to Action */}
        <section className="my-10 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Submit an AI Tool Today!
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Do you have a tool that you believe deserves attention? We are
              always on the lookout for new AI tools to add to our collection.
            </p>
            <strong>
              <Link href="/submit-ai">
                <button className="bg-[#222222] text-white font-bold py-3 px-8 rounded-lg">
                  Submit Your Tool
                </button>
              </Link>
            </strong>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
