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
          <Link
            href={"/all-ai-tools"}
            className="underline text-bold text-black"
          >
            all AI tools
          </Link>{" "}
          side-by-side, considering the features. Budget is, of course, a
          concern. But never settle for the cheapest option. A slightly pricier
          tool may offer better ROI through advanced features that save time.
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
          tool can grow with you—either through modular features or frequent
          updates with increasing data loads. Stay tuned to our AI news page to
          get to know the latest updates on your favorite AI tools.
        </>
      ),
    },
    {
      icon: <User className="text-purple-500" />,
      title: "Evaluate Use-Friendliness",
      description: (
        <>
          Even the most advanced AI tools are of no use if they are difficult to
          use. Be sure to opt for tools with a user-friendly interface and
          tutorials. Tools with the least learning curve enable you to focus on
          your job rather than wasting time trying to figure out how the tool
          works.
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
          <Link href={"/submit-ai"} className="underline text-bold text-black">
            submit your AI
          </Link>{" "}
          tools to our directory.
        </>
      ),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
            How To Choose The Right AI Tool?
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            As the number of AI tools increases, it becomes more challenging to
            find the right fit. Check out some tips on how to select AI tools
            for your purpose:
          </p>
        </section>

        {/* Key Benefits Grid */}
        <section className="grid md:grid-cols-4 gap-6 mb-12">
          {KeyBenefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-all"
            >
              <div className="flex items-center justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-semibold text-center mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-justify text-sm">
                {benefit.description}
              </p>
            </div>
          ))}
        </section>
      </main>
      {/* FAQ Section */}
      <section className="bg-white dark:bg-gray-800">
        <FAQ faqs={faq} title="Frequently Asked Questions" />
      </section>
      <div className="flex flex-col items-center gap-4 bg-gray-50 dark:bg-gray-900 py-12">
        <h1 className="text-3xl text-center font-bold text-gray-800 dark:text-white">
          Match AI to Your Job
        </h1>
        <p className="text-md text-gray-600 dark:text-gray-300 text-center">
          Never get left behind in the tech race. Use our page to find the
          perfect AI tools that fit your job like a glove. Stay ahead now!
        </p>
      </div>
    </div>
  );
}
