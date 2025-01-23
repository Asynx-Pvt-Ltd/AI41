import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

const FAQTutorialsAccordion = () => {
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
          Our list includes some free and paid tools. You can go through the
          dedicated page of each tool to know the pricing details.
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
      question: "Are the tools listed verified and reliable?",
      answer:
        "We're serious about reliability. Every tool in our directory is vetted through user feedback and performance checks. We even consider the credibility of the developers. That means you will see only trusted, high-quality tools for your purpose.",
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

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4 mt-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        Frequently Asked Questions
      </h2>
      {faqs.map((faq, index) => (
        <div key={index} className="border rounded-lg overflow-hidden">
          <button
            className="w-full px-6 py-4 text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 flex justify-between items-center"
            onClick={() => toggleFAQ(index)}
          >
            <span className="font-medium text-gray-900 dark:text-white">
              {faq.question}
            </span>
            {openIndex === index ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>
          <div
            className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
              openIndex === index ? "max-h-96 py-4" : "max-h-0"
            }`}
          >
            <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQTutorialsAccordion;
