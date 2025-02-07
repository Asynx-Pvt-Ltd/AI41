import Link from "next/link";
import {
  Briefcase,
  Filter,
  DollarSign,
  MessageCircle,
  User,
  Search,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import FAQ from "@/app/components/ui/FAQ";
import { CardContent, CardDesign } from "./ui/cardDesign";

export default function JobsContent() {
  const KeyBenefits = [
    {
      icon: <Briefcase className="text-blue-500" />,
      title: "Navigate To Your Job Section",
      description: (
        <>
          Begin by visiting our site's dedicated job section. Based on your
          specific role, you'll find a curated list of AI tools designed to meet
          your professional requirements. You will find a plethora of tools
          finely tuned to your needs.
        </>
      ),
    },
    {
      icon: <Filter className="text-orange-500" />,
      title: "Niche Down Your Search",
      description: (
        <>
          Once in your job section, utilize our advanced filters to narrow your
          search further. Filters like category, pricing, features, and more
          allow you to pinpoint the ideal AI tool for your tasks.
        </>
      ),
    },
    {
      icon: <DollarSign className="text-green-500" />,
      title: "Compare Pricing and ROI",
      description: (
        <>
          AI is no longer the monopoly of some tools. New tools are popping up
          day by day. So, compare{" "}
          <Link href={"/all-ai-tools"}>all AI tools</Link> side-by-side,
          considering the features. Budget is, of course, a concern. But never
          settle for the cheapest option. A slightly pricier tool may offer
          better ROI through advanced features that save time.
        </>
      ),
    },
    {
      icon: <MessageCircle className="text-orange-700" />,
      title: "Check Reviews",
      description: (
        <>
          User feedback is a goldmine of insights. You can go through certain
          community circle groups on Facebook or Skool. Search for your AI tool
          and check out the user response. Watch out specifically for the
          particular features that you want and the support that they offer.
        </>
      ),
    },
    {
      icon: <Search className="text-gray-500" />,
      title: "Further Analyze Specific Tools",
      description: (
        <>
          Once you find a potential tool, figure out what you expect exactly
          from it. Then, check whether the AI tool you choose can fulfill it.
          Luckily, our AI tool directory contains a well-descriptive page for
          each tool. You can check out the features and purposes of the tool
          before usage. That saves your time a lot.
        </>
      ),
    },
    {
      icon: <TrendingUp className="text-yellow-500" />,
      title: "Consider Scalability",
      description: (
        <>
          In case you are investing in a paid AI tool, always consider
          scalability. Remember, your job requirements change over time. A good
          tool can grow with you either through modular features or frequent
          updates with increasing data loads. Stay tuned to our{" "}
          <Link href={"/ai-news"}>AI news</Link> page to get to know the latest
          updates on your favorite AI tools.
        </>
      ),
    },
    {
      icon: <User className="text-purple-500" />,
      title: "Evaluate User-Friendly",
      description: (
        <>
          Even the most advanced AI tools are of no use if they are difficult to
          use. Be sure to opt for tools with a user-friendly interface and
          tutorials. Tools with the least learning curve enable you to focus on
          your job rather than wasting time trying to figure out how the tool
          works.Is it too difficult to use your current AI tool? Check out our{" "}
          <Link href={"/ai-tutorials"}>video tutorials</Link> on how to use the
          AI tools effectively.
        </>
      ),
    },
    {
      icon: <CheckCircle className="text-green-300" />,
      title: "Test Free Trials",
      description: (
        <>
          Nowadays, most tools let you access a free plan with limited credits.
          Use them wisely to check the efficiency and ease of use. Then,
          conclude whether it’s worth investing or not.
        </>
      ),
    },
  ];

  const faq = [
    {
      question:
        "What should I do if an AI tool doesn't integrate well with my current software?",
      answer: (
        <>
          First, go through the plugins that might work to solve some
          integration issues. If not, it’s better to consider an alternative AI
          that is known for working well within your stack.
        </>
      ),
    },
    {
      question: "How can I make sure that an AI tool is scalable?",
      answer: (
        <>
          Find out about the tool's history and updates. Companies like
          DataRobot or Google's AI tools have a track record of continuous
          improvement. As a general rule of thumb, you must always go for tools
          that are developed by established companies.
        </>
      ),
    },
    {
      question:
        "If I select an AI tool, how will I measure its impact on my job?",
      answer: (
        <>
          Set clear and measurable key performance indicators. Assume that you
          are using AI tools for customer service. Then, you can set metrics
          like response time, customer satisfaction, conversion rates, etc., as
          KPIs.
        </>
      ),
    },
    {
      question: "How frequently is this directory updated?",
      answer: (
        <>
          We regularly update our platform, so you'll always be able to access
          the freshest AI tools with reliable information. You can even{" "}
          <Link href={"/submit-ai"}>submit your AI</Link> tools to our
          directory.
        </>
      ),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-gray-50 dark:bg-gray-800 my-10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            How To Choose The Right AI Tool?
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-16 max-w-2xl mx-auto">
            As the number of AI tools increases, it becomes more challenging to
            find the right fit. Check out some tips on how to select AI tools
            for your purpose:
          </p>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {KeyBenefits.map((benefit, index) => (
                <div key={index} className="relative h-full">
                  <CardDesign className="relative bg-white dark:bg-gray-700 transition-all duration-300 hover:shadow-xl h-full">
                    {/* Step Number */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#222222] flex items-center justify-center text-white text-xl font-bold shadow-lg">
                      {index + 1}
                    </div>

                    <CardContent className="pt-8 pb-6 px-4">
                      <div className="flex flex-col items-center">
                        <div className="flex justify-center items-center w-full mb-3 gap-3">
                          {benefit.icon}
                          <h3 className="text-lg font-semibold text-left">
                            {benefit.title}
                          </h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm text-justify link_design">
                          {benefit.description}
                        </p>
                      </div>
                    </CardContent>
                  </CardDesign>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="bg-white dark:bg-gray-800 py-5">
        <FAQ faqs={faq} title="Frequently Asked Questions" />
      </section>
      <div className="flex flex-col items-center gap-4 bg-gray-50 dark:bg-gray-900 pt-10 pb-16">
        <h1 className="text-3xl text-center font-bold text-gray-800 dark:text-white">
          Match AI to Your Job
        </h1>
        <p className="text-md text-gray-600 dark:text-gray-300 text-center link_design">
          Never get left behind in the tech race. Use our page to find the
          perfect <Link href={"/all-ai-tools"}>AI tools</Link> that fit{" "}
          <Link href={"/job"}>your job</Link> like a glove. Stay ahead now!
        </p>
      </div>
    </div>
  );
}
