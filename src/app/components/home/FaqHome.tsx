import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQAccordion = () => {
  const faqs = [
    {
      question: "Why the name AI41?",
      answer:
        "AI41 stands for a simpler and more creative name. Numerologically, 41 means 'AI'(A = the 4th letter of the alphabet, I = the 1st letter). Therefore, it's an intelligent and easily memorable symbol of artificial intelligence. It reflects our mission to simplify your experience with AI.",
    },
    {
      question: "What is an AI tool directory?",
      answer:
        "An AI tool directory is a curated platform with a list of assorted tools empowered by Artificial Intelligence. You can use it to find the right tools for your needs.",
    },
    {
      question: "Are the tools listed here free?",
      answer:
        "Our list includes some free and paid tools. You can go through the dedicated page of each tool to know the pricing details.",
    },
    {
      question:
        "Do I need to sign up or create an account to access the directory?",
      answer:
        "No sign-up or account is required to check the tools. Even with a sign-up account, you may benefit from such features as adding tools to your favorite list.",
    },
    {
      question: "Are the tools listed verified and reliable?",
      answer:
        "We're serious about reliability. Every tool in our directory is vetted through user feedback and performance checks. We even consider the credibility of the developers. That means you will see only trusted, high-quality tools for your purpose.",
    },
    {
      question:
        "How do you verify the effectiveness of the AI tools listed here?",
      answer:
        "We run the tools through scenarios relevant to their intended use. Similarly, our team checks the case studies and user reviews. Sometimes, we even reach out to the companies directly for deeper insights. Thus, we ensure that all the tools listed on our platform are high-quality.",
    },
    {
      question: "Are the tools added manually?",
      answer:
        "Yes, each tool was manually reviewed before including in our directory. We consider many factors like features, reputation of the developer, data security, ease-of-use, etc. Such a hands-on approach makes sure that only high-quality tools are listed.",
    },
    {
      question: "Are the tools regularly updated?",
      answer:
        "Yes. We have a dedicated team to introduce new tools to the directory and check the updates of the existing tools to refine the description. We even remove tools that have become obsolete. Thus, you will always have access to the latest information.",
    },
    {
      question:
        "How do you keep your directory up-to-date with the latest AI innovations?",
      answer:
        "Our tech team works like a radar that detects new AI updates instantly. Our team members actively engage with tech communities. We even go to industry events to stay ahead with the latest updates. When a new tool hits the market, we use it firsthand for evaluation. On top of that, we have a submission system through which the developer can introduce innovation directly to us. Our directory is, therefore, a living and constantly updated resource to find AI tools. ",
    },
    {
      question:
        "How do you deal with the AI tools becoming outdated by technological advancement?",
      answer:
        "Obsolescence in tech is almost a certainty. That’s why we are proactive. We follow tech trends and AI research reports. That makes it easy for us to spot the tools that are at risk. We will constantly monitor the tool’s reviews and engage with its user community. Tools that fail to stay updated will be eventually removed from our directory after a close evaluation by our team.",
    },
    {
      question:
        "How do you balance promoting new AI tools while ensuring they're reliable?",
      answer:
        "It's a delicate balance. We expose new tools to you, but we first place reliability ahead of that exposure. Newly released tools get a 'new release' tag, and we are monitoring the feedback coming from our users very closely. If a tool doesn't cut it or has significant issues, we may remove it from our directory.",
    },
    {
      question: "Do you include pricing information for the tools listed?",
      answer:
        "We realize that pricing is part of a decision-making process. Every tool's page provides plain but updated pricing information. You can filter the tools through your budget requirements, also. We even give a link to the official website of the tool. You can directly contact the team for customized packages.",
    },
    {
      question: " How does the directory help beginners new to AI tools?",
      answer:
        "We have opened an AI tutorial page for beginners who have zero knowledge of AI. You can view tutorial videos of many tools over there. It helps you to ease the learning curve and get used to the tool more easily.",
    },
    {
      question: "What makes your directory different from others?",
      answer:
        "Unlike generic directories, we curate collections of competitive AI tools catering to a variety of needs. You can use advanced search and filtering systems to narrow down the tools of your industry. We even have a dedicated AI tutorials page to help you know how to use the tool. You can also regularly visit our AI news page to stay ahead with the latest updates. ",
    },
    {
      question: "How can I find free AI tools?",
      answer:
        "You can use our directory and apply the “free” filter. You can also use a directory dedicated exclusively to free tools like <a herf='https://aiforeveryone.org/'> AI for Everyone </a>to find the best, free AI tools. Each listing also shows if a tool is completely free or has premium features, so you can pick the right option without wasting time. ",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
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

export default FAQAccordion;
