import {
  UserSearch,
  Cpu,
  TestTube,
  Star,
  CircleDollarSign,
  RefreshCw,
  CheckCircle,
  MessageCircle,
  LinkIcon,
  Globe,
  Copy,
  Palette,
  Briefcase,
  RotateCcw,
  Scroll,
  Gavel,
  Smile,
} from "lucide-react";
import Link from "next/link";
import { CardDesign, CardContent } from "@/app/components/ui/cardDesign";
import Image from "next/image";
import FAQTutorialsAccordion from "@/app/components/ui/FAQ";

export default function AllAITools() {
  {
    /*==================How To Find The Perfect AI Tool?===========*/
  }
  const selectionSteps = [
    {
      icon: <UserSearch className="w-6 h-6 mb-2 text-purple-500" />,
      title: "Define Your Goals",
      description: (
        <>
          First of all, you need to have a crystal clear idea of what you are
          trying to solve. Is it content creation? Or, perhaps, you want to
          improve the data analysis. List out all tasks that you wish to
          automate using AI. That makes it easier to narrow down your choice.
        </>
      ),
    },
    {
      icon: <Cpu className="w-6 h-6 mb-2 text-amber-800" />,
      title: "Prepare An Initial List Using AI41",
      description: (
        <>
          Start researching with an AI tool directory like ours. You can have a
          look at our AI jobs section. You just need to type in your job
          position. We will display you all AI tools related to that. Use our
          advanced filtering options to find 10-15 important AI tools that match
          your needs. Go through the dedicated page of each tool to check their
          reviews. Make sure that you add only tools with a minimum standard so
          that you don’t end up wasting time later on.
        </>
      ),
    },
    {
      icon: <Star className="w-6 h-6 mb-2 text-yellow-500" />,
      title: "Evaluate Technical Specifications",
      description: (
        <>
          Now, get a little more technical. You must ensure that the tool
          contains all features to meet your needs. You can check it out on the
          product page in our tool directory. Otherwise, refer to the official
          website itself.
        </>
      ),
    },
    {
      icon: <TestTube className="w-6 h-6 mb-2 text-blue-500" />,
      title: "Trial and Test",
      description: (
        <>
          Luckily, the most important AI tools offer a free version with limited
          credits. Utilize them wisely to feel the tool’s ability to fulfil your
          job needs. Try to keep a record as to how much the tool actually helps
          you save time or improve your work quality. You must analyze their
          user interface and the accuracy of the responses. Want to solve the
          technical issues on your own? Check out our{" "}
          <Link
            href={"/ai-tutorials"}
            className="underline text-bold text-black"
          >
            tutorials section
          </Link>
          .
        </>
      ),
    },
    {
      icon: <CircleDollarSign className="w-6 h-6 mb-2 text-green-500" />,
      title: "Check Reviews and Pricing",
      description: (
        <>
          Never rely on the marketing hype. Check out what users are saying
          through unbiased platforms like G2, IsItLegit or Trustpilot.
          Sometimes, someone in your network has already done the legwork. So,
          ask the experts in your network circle, too. You can also go through
          the case studies to get a more clear picture.
        </>
      ),
    },
  ];
  {
    /*==================MAIN FEATURES===========*/
  }
  const MainFeatures = [
    {
      icon: <RefreshCw className="text-blue-500" />,
      title: "Daily Updates",
      description: (
        <>
          The AI industry is changing day by day. That’s why we update our
          website every day. So, you will get the updated list of all AI tools
          as they hit the market. You can even find the latest AI news here.
        </>
      ),
    },
    {
      icon: <CheckCircle className="text-green-500" />,
      title: "Manually Curated",
      description: (
        <>
          Unlike automated directories, we add and verify each tool manually.
          Our team of experts takes time to test these tools to check whether
          they are effective enough. Because we care about quality over
          quantity.
        </>
      ),
    },
    {
      icon: <MessageCircle className="text-[#FF9800]" />,
      title: "Real Reviews",
      description: (
        <>
          Genuine feedback makes decision-making much easier. So, we're
          collecting real, unfiltered user reviews from people just like you.
          That saves you valuable time in finding the right solution.
        </>
      ),
    },
    {
      icon: <LinkIcon className="text-red-500" />,
      title: "Discover Related Tools",
      description: (
        <>
          Never stop at one tool. Check out our ‘Related Tools’ section to find
          complementary AI tools that work together to optimise your workflow.
          You can even compare them side-by-side to choose the right one.
        </>
      ),
    },
    {
      icon: <Globe className="text-[#607D8B]" />,
      title: "All-In-One Destination",
      description: (
        <>
          We have everything you need to know about all AI Tools - beginners and
          advanced professionals alike. Stay up-to-date with our latest{" "}
          <Link href={"/ai-news"} className="underline text-bold text-black">
            AI news
          </Link>
          . Learn how to use all important AI tools with our step-by-step{" "}
          <Link
            href={"/ai-tutorials"}
            className="underline text-bold text-black"
          >
            tutorials
          </Link>{" "}
          Use our AI Jobs features to find all AI tools list that match your
          purpose.
        </>
      ),
    },
  ];

  {
    /*==================FREE VS PAID TABLE==================*/
  }
  const comparisonData = [
    {
      category: "Support",
      free: "Limited availability, slow response times",
      paid: "Preferential support via live chat, prompt issue resolution",
    },
    {
      category: "Features",
      free: "Basic features only, advanced features locked",
      paid: "Full access to comprehensive feature set",
    },
    {
      category: "Updates",
      free: "Infrequent, potentially outdated",
      paid: "Regular updates with latest industry innovations",
    },
    {
      category: "Scalability",
      free: "Limited handling of complex tasks",
      paid: "Highly scalable, easy plan upgrades",
    },
    {
      category: "Target Audience",
      free: "Budget-constrained users",
      paid: "Businesses with automation budgets",
    },
  ];

  {
    /*==================AI Tools Facts and Curiosities===========*/
  }
  const KeyFacts = [
    {
      icon: <Copy className="text-[#FF6B6B]" />,
      title: "Plagiarism Concerns",
      description: (
        <>
          AI tools often generate content that risks copyright infringement. The
          New York Times has sued OpenAI and Microsoft for mimicking their
          content, challenging the notion of AI-generated uniqueness.
        </>
      ),
    },
    {
      icon: <Palette className="text-[#FFA500]" />,
      title: "AI Creativity",
      description: (
        <>
          Beyond mere replication, AI shows significant growth in creative
          sectors. The Writers Guild of America (WGA) went on strike in 2023 to
          address the technology's impact on creative industries.
        </>
      ),
    },
    {
      icon: <Briefcase className="text-[#00C49A]" />,
      title: "Employment Dynamics",
      description: (
        <>
          Contrary to job-loss fears, the AI industry is generating numerous
          jobs. Millions of employees work on data labeling and response
          correction, making AI a potential top-employing industry.
        </>
      ),
    },
    {
      icon: <RotateCcw className="text-[#FFB703]" />,
      title: "Catastrophic Forgetting",
      description: (
        <>
          AI tools struggle with 'catastrophic forgetting' - rapidly losing
          previous learning when acquiring new information. Developers
          continuously work to overcome this significant technological
          challenge.
        </>
      ),
    },
    {
      icon: <Scroll className="text-[#8ECAE6]" />,
      title: "Archaeological Innovations",
      description: (
        <>
          AI is revolutionizing historical research. For instance, it helped
          interpret the Herculaneum papyri by analyzing scroll patterns,
          enabling archaeologists to unroll ancient documents without damage.
        </>
      ),
    },
    {
      icon: <Gavel className="text-[#6A4C93]" />,
      title: "Judicial Applications",
      description: (
        <>
          AI is making inroads into the judicial system. Tools like COMPAS
          assess criminal recidivism risk, potentially influencing sentencing
          and bail decisions.
        </>
      ),
    },
    {
      icon: <Smile className="text-[#FFC857]" />,
      title: "Emotional Intelligence",
      description: (
        <>
          Even in early stages, AI can recognize emotions through voice tones
          and facial expressions. Researchers are exploring AI's potential to
          learn empathy by observing human interactions.
        </>
      ),
    },
  ];

  {
    /*==================FAQ===========*/
  }
  const faq = [
    {
      question: "Can AI tools work offline?",
      answer: (
        <>
          Some important AI tools can work offline. But that depends on the type
          of tool. AI tools that require real-time data processing may need to
          stay connected with cloud servers. Yet, even some of them offer
          offline versions with pre-trained models. However, the responses may
          not be as efficient as cloud-based versions.
        </>
      ),
    },
    {
      question: "Are free AI tools as reliable as paid ones?",
      answer: (
        <>
          Free AI tools can be really helpful in getting started with simple
          tasks. But the catch over here is that most of them will have fewer
          features. Support also may not be available. So, if you are working on
          critical projects, it is better to go for a paid tool.
        </>
      ),
    },
    {
      question: "How do AI tools ensure data security?",
      answer: (
        <>
          Certain important AI tools have advanced encryption and server-side
          security to follow the data safety rules.
        </>
      ),
    },
    {
      question: "What should I do if an AI tool is no longer supported?",
      answer: (
        <>
          If a tool you're relying on is obsolete, you must consider transition
          plans. First, look for all AI tools with better features. Export your
          data and configurations wherever possible. And if possible, always
          pick tools from reputed developers who can keep the tool updated.
        </>
      ),
    },
    {
      question: "Can AI help me in decision-making?",
      answer: (
        <>
          Yes. AI can analyze trend patterns to help you make better decisions.
          Investing or analytics AI tools are such examples. They integrate
          market trends or consumer data to provide data-driven recommendations.
          Or you can simply chat with an AI and ask advice about pretty much
          anything!
        </>
      ),
    },
  ];

  {
    /*===================================RETURN======================================
    =====================================RETURN======================================
    =====================================RETURN======================================
    =====================================RETURN======================================*/
  }

  return (
    <div>
      {/*==================How To Find The Perfect AI Tool?===========*/}

      <section className=" bg-gray-50 dark:bg-gray-900 min-h-full py-5">
        <div className="max-w-7xl mx-auto mb-5">
          <h2 className="text-3xl font-bold mb-8 text-center">
            How To Find The Perfect AI Tool?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectionSteps.map((steps, index) => (
              <CardDesign
                key={index}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-6 mt-5">
                  <div className="flex items-center mb-3 mt-5">
                    {steps.icon}
                    <h3 className="text-lg font-semibold mb-3 ml-4">
                      {steps.title}
                    </h3>
                  </div>
                  <p className="text-sm text-justify text-gray-600 dark:text-gray-300">
                    {steps.description}
                  </p>
                </CardContent>
              </CardDesign>
            ))}
          </div>
        </div>
      </section>

      {/*==================MAIN FEATURES===========*/}

      <section className="bg-white dark:bg-gray-800 py-5">
        <div className="max-w-7xl mx-auto mb-5">
          <h2 className="text-3xl font-bold mb-8 text-center">Main Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MainFeatures.map((feature, index) => (
              <CardDesign
                key={index}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-6 text-center mt-5">
                  <div className="flex justify-center mb-3">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-justify text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </CardContent>
              </CardDesign>
            ))}
          </div>
        </div>
      </section>

      {/*==================FREE VS PAID TABLE==================*/}

      <div className="container mx-auto px-4 py-4 ">
        <h2 className="text-3xl font-bold text-center mb-8">
          Free vs Paid AI Tools: What's Right for You?
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-white dark:bg-gray-800 shadow-md rounded-lg">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Comparison Factor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Free Tools
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Paid Tools
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((item, index) => (
                <tr key={index} className="border-b dark:border-gray-700">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                    {item.free}
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                    {item.paid}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="my-6 text-justify text-gray-600 dark:text-gray-300 mb-10">
          <p>
            So, in a nutshell, priced tools are better for a normal individual
            or company. You will get regular updates and contact the support
            team if you have any issues. But before buying, just check out the
            developer's refund policy to ensure your safety. Yet, if you are
            just getting started with a zero budget, don’t hesitate to go for
            free tools.
          </p>
        </div>
      </div>

      {/*=============How Many AI Tools Really Exist?================*/}

      <section className="w-5/6 flex bg-slate-300 rounded-lg py-8 px-3 md:flex-row flex-col-reverse justify-center mx-auto mt-2 mb-8">
        <div className="flex flex-1 flex-col justify-evenly">
          <h1 className="text-2xl font-bold text-center">
            How Many AI Tools Really Exist?
          </h1>
          <p className="text-justify mt-2 pl-4">
            According to our estimations and research,{" "}
            <strong>there are over 5,000 generative AI tools.</strong> The
            number of all AI tools is growing daily, so pinning down an exact
            number is difficult. Yet, it is pretty clear that the AI industry is
            expanding. You can expect more advanced AI tools in the future. Out
            of these thousands, we have carefully curated some of the most
            important AI tools for various purposes. All of them are manually
            tested to verify the quality.
          </p>
        </div>
        <div className="flex flex-1 flex-col justify-center items-center">
          <Image
            src={"/ai-rank-tools.webp"}
            width={200}
            height={200}
            alt={""}
          />
        </div>
      </section>

      {/*=============AI Tools Stats================*/}

      <section className="w-5/6 flex bg-slate-300 rounded-lg py-8 px-3 md:flex-row flex-col-reverse justify-center mx-auto mt-2 mb-8">
        <div className="flex flex-1 flex-col justify-evenly">
          <h1 className="text-2xl font-bold text-center mb-1">
            AI Tools Stats
          </h1>
          <p className="text-justify my-3 pl-6">
            Check out some of the{" "}
            <Link
              href={"https://socialmarketing90.com/ai-statistics-usage-trends/"}
              className="underline text-bold text-black"
              target="_blank"
              rel="noopener"
            >
              coolest AI stats in 2025:
            </Link>
          </p>
          <ul className="flex flex-col gap-3 list-disc text-justify pl-[5vw] max-w-5xl">
            <li>
              Generative AI is the most popular AI technology. Approximately 51%
              of companies use these important AI tools for various purposes
              like content creation, automation, customer support, etc.
            </li>
            <li>
              By the end of 2030, the{" "}
              <Link
                href={
                  "https://www.statista.com/forecasts/1449844/ai-tool-users-worldwide"
                }
                className="underline text-bold text-black"
                target="_blank"
                rel="noopener"
              >
                number of AI users
              </Link>{" "}
              is expected to reach an all-time high 729.11 million.
            </li>
            <li>
              The{" "}
              <Link
                href={
                  "https://finbold.com/ai-sector-to-become-a-trillion-dollar-market-in-the-next-5-years/"
                }
                className="underline text-bold text-black"
                target="_blank"
                rel="noopener"
              >
                market share of AI
              </Link>{" "}
              is expected to rise to $1.87 trillion by 2030.
            </li>
            <li>
              68% of people are more willing to use AI if it helps their
              day-to-day living tasks.
            </li>
            <li>
              AI is expected to{" "}
              <Link
                href={
                  "https://www.weforum.org/press/2020/10/recession-and-automation-changes-our-future-of-work-but-there-are-jobs-coming-report-says-52c5162fce/"
                }
                className="underline text-bold text-black"
                target="_blank"
                rel="noopener"
              >
                replace 85 million jobs
              </Link>{" "}
              by the end of this year.
            </li>
            <li>
              As per a{" "}
              <Link
                href={
                  "https://www.forbes.com/advisor/business/artificial-intelligence-consumer-sentiment/"
                }
                className="underline text-bold text-black"
                target="_blank"
                rel="noopener"
              >
                survey
              </Link>
              , 54% of respondents believe that important AI tools can improve
              long-form content like website content.
            </li>
          </ul>
        </div>
      </section>

      {/*==================AI Tools Facts and Curiosities===========*/}

      <section className="bg-gray-50 dark:bg-gray-800 py-5">
        <div className="max-w-7xl mx-auto mb-5">
          <h2 className="text-3xl font-bold mb-8 text-center">
            AI Tools Facts and Curiosities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {KeyFacts.map((facts, index) => (
              <CardDesign
                key={index}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-6 text-center mt-5">
                  <div className="flex justify-center mb-3">{facts.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{facts.title}</h3>
                  <p className="text-sm text-justify text-gray-600 dark:text-gray-300">
                    {facts.description}
                  </p>
                </CardContent>
              </CardDesign>
            ))}
          </div>
        </div>
      </section>

      {/*========================FAQ=========================*/}
      <div>
        <FAQTutorialsAccordion faqs={faq} title="Frequently Asked Questions" />
      </div>
      <div className="flex flex-col items-center gap-4 bg-gray-50 dark:bg-gray-900 py-12 px-16">
        <h1 className="text-3xl text-center font-bold text-gray-800 dark:text-white">
          Find The Best AI Tools With Our List!
        </h1>
        <p className="text-md text-gray-600 dark:text-gray-300 text-justify">
          Still doubtful of where to start? Well, our AI directory paves the
          starting line with a curated list of the top-performing tools in
          various industries. Go through our dedicated product pages to see all{" "}
          <Link
            href={"/all-ai-list"}
            className="underline text-bold text-black"
          >
            AI tools
          </Link>{" "}
          that work for your{" "}
          <Link href={"/jobs"} className="underline text-bold text-black">
            job purpose
          </Link>
          . Get started now!
        </p>
      </div>
    </div>
  );
}
