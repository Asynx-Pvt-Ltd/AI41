import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

interface FAQ {
  question: string;
  answer: React.ReactNode;
}

interface FAQTutorialsAccordionProps {
  faqs?: FAQ[];
  title?: string;
}

const FAQTutorialsAccordion: React.FC<FAQTutorialsAccordionProps> = ({
  faqs = [],
  title = "Frequently Asked Questions",
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4 pb-8">
      <h2 className="text-3xl font-bold text-center p-5">{title}</h2>
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
            <p className="text-gray-600 dark:text-gray-300 text-justify">
              {faq.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQTutorialsAccordion;
