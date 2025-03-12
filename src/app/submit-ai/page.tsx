"use client";
import Image from "next/image";
import Footer from "../components/Footer";
import { Header } from "../components/Header";

export default function SubmitAI() {
  const subscriptionPlans = [
    {
      name: "Fast Listing",
      price: "$79",
      priceInfo: "one time fee",
      features: ["Published within 3 days", "With extra features"],
      includes: [
        "Listed on the New AI Tools page",
        "30 days in « AIxploria Selection » on Homepage",
        "Description of up to 165 characters",
        "An extra link to your product page",
        "Indexed on Google",
      ],
      icon: "/fast-listing-icon.png",
      url: "",
    },
    {
      name: "Verified Listing ",
      price: "$79",
      priceInfo: "one time fee",
      features: ["Published within 3 days", "With extra features"],
      includes: [
        "Listed on the New AI Tools page",
        "30 days in « AIxploria Selection » on Homepage",
        "Description of up to 165 characters",
        "An extra link to your product page",
        "Indexed on Google",
      ],
      icon: "/verifiedai-icon.webp",
      url: "",
    },
    {
      name: "Featured Listing ",
      price: "$79",
      priceInfo: "one time fee",
      features: ["Published within 3 days", "With extra features"],
      includes: [
        "Listed on the New AI Tools page",
        "30 days in « AIxploria Selection » on Homepage",
        "Description of up to 165 characters",
        "An extra link to your product page",
        "Indexed on Google",
      ],
      icon: "/verifiedai-icon-or.webp",
      url: "/",
    },
  ];

  const faqs = [
    {
      question: "Why do you charge a verification fee?",
      answer:
        "We charge a verification fee to maintain the quality and reliability of the tools listed. It also allows us to sort through the many submissions we receive every day. This fee helps us conduct thorough reviews and support impartial assessments.",
    },
    {
      question: "Are all websites accepted?",
      answer: (
        <>
          <p>
            We are happy to accept most tools, as long as they comply with our
            standards. Before submitting, check if your tool is already listed.
            All tools are manually reviewed. Approval is not guaranteed; we are
            looking for quality AI tools and novel use cases.
          </p>
          <p>
            Do not submit affiliate links or shortened URLs as they will not be
            approved. Poorly designed websites, duplicate tools, adult content,
            custom GPTs, and spammy sites will be rejected. If your tool or
            website is not related to artificial intelligence, we won&apos;t be
            able to accept it.
          </p>
        </>
      ),
    },
    {
      question: "Is NSFW content allowed?",
      answer: "No, NSFW content is strictly prohibited on our site.",
    },
    {
      question: "What are featured listings? How do I feature my tool?",
      answer:
        "Featured ads are paid promotions that appear at the top of our site (or sometimes at the bottom). We limit the display of advertising banners for a period of two days per company. This preserves the clarity of the interface and gives other tools a chance to be featured. These slots are often sold in advance.",
    },
    {
      question: "How long will my tool be on AIxploria?",
      answer:
        "Once your submission has been accepted, your tool will be present on the site forever. Except if it has been modified and no longer meets our criteria or no longer exists, in which case your tool will still be present on AIxploria, but placed in a special category called RIP.",
    },
    {
      question: "What is your refund policy?",
      answer:
        "We offer a full refund if your AI tool is not accepted by our editorial team. Once a tool is accepted and published, refunds are not available.",
    },
    {
      question: "I have a large budget. What options do I have?",
      answer:
        "For larger budgets and custom solutions, please contact our sales team. We can provide tailored options to meet your specific needs.",
    },
    {
      question: "Do you offer free listings?",
      answer:
        "Yes, we do offer free listings. Please complete the application form. Reviews may take up to 30 days. Accepted listings have limited features and do not include support or edits.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-white dark:bg-gray-800 w-full pt-10 pl-6 pr-6 pb-6 text-center">
        <div className="container mx-auto px-4 py-8">
          <h1 className="border-image text-3xl font-bold text-center mb-8">
            Targeting Thousands of AI Users
          </h1>
        </div>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-8">
            Our Subscription Plans
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 mx-6">
            {subscriptionPlans.map((plan, index) => (
              <div
                key={index}
                className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 mb-5"
              >
                <div className="p-4">
                  <div className="flex flex-row justify-center">
                    <h2 className="flex flex-col text-2xl font-bold mr-2">
                      {plan.name}
                    </h2>
                    <Image
                      src={plan.icon}
                      alt={plan.name}
                      width={28}
                      height={28}
                      className="flex flex-col"
                    />
                  </div>
                  <p className="text-xl font-semibold mt-2">
                    {plan.price}{" "}
                    <span className="text-sm">({plan.priceInfo})</span>
                  </p>
                </div>
                <div className="p-4 bg-gray-50">
                  <h3 className="text-lg font-semibold mb-2">Features</h3>
                  <ul className="mb-4">
                    {plan.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="text-gray-600 text-left text-sm mb-1"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <h3 className="text-lg text-left font-semibold mb-2">
                    Includes
                  </h3>
                  <ul>
                    {plan.includes.map((include, idx) => (
                      <li
                        key={idx}
                        className="text-gray-600 text-left text-sm mb-1"
                      >
                        {include}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 text-center">
                  <span className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg inline-block">
                    Submit your tool
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-8">
            Disclosure Terms
          </h1>
          <span className="text-center mx-24">
            All submitted tools undergo a thorough editorial review. We reserve
            the right to decline or remove any tool from the site if it is found
            to be inappropriate or not suitable for our audience at any time.
            Please be aware that NSFW tools are not accepted.
          </span>
        </div>
        <div className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            Frequently Asked Questions (FAQ)
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <h3 className="text-xl text-left font-semibold mb-2">
                  {faq.question}
                </h3>
                <div className="text-gray-600 text-left">{faq.answer}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
