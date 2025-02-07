import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { TrendingUp, Layers, Brain, Shield, Wrench } from "lucide-react";
import { CardContent, CardDesign } from "@/app/components/ui/cardDesign";
import FAQ from "@/app/components/ui/FAQ";

// Types
interface NewsItem {
  title: string;
  description: string;
  icon?: string;
  slugUrl: string;
  date: string;
}

const AINewsPage: React.FC = () => {
  const KeyFeatures = [
    {
      icon: <TrendingUp className="w-8 h-8 mb-4 text-orange-500" />,
      title: "Spot Trends Ahead",
      description: (
        <>
          Keeping track of AI news lets you have a glimpse into the future.
          Adapting to these trends ahead of time can give you an edge in the
          competition. Take the case of Amazon itself. They were one of the
          first companies to use an advanced AI-driven recommendation engine
          that can suggest products to users based on their interests. And guess
          what? This initiative improved the user experience and maintained its
          dominance in the e-commerce space.
        </>
      ),
    },
    {
      icon: <Wrench className="w-6 h-6 mb-4 text-red-500" />,
      title: "Learn New Tools and Apps",
      description: (
        <>
          News about AI usually introduces you to new tools to{" "}
          <Link href={"/job"} className="underline text-bold text-black">
            simplify your job
          </Link>{" "}
          tasks. You might find Otter.ai for transcription, DeepBrain for making
          digital avatars, and other tools that could be revolutionaries in your
          workflow. You will be able to improve productivity like never before.
        </>
      ),
    },
    {
      icon: <Layers className="w-6 h-6 mb-4 text-green-500" />,
      title: "Skill Building",
      description: (
        <>
          AI news isn't about tools alone. It’s also about learning. New
          methodologies with{" "}
          <Link
            href={"/ai-tutorials"}
            className="underline text-bold text-black"
          >
            tutorials
          </Link>{" "}
          can change the way how you work. So, staying updated means constantly
          learning and getting better at your skills.
        </>
      ),
    },
    {
      icon: <Brain className="w-6 h-6 mb-4 text-purple-500" />,
      title: "Make Smarter Decisions",
      description: (
        <>
          AI is changing the nature of decision-making by providing predictive
          insights and data-driven recommendations. Keeping abreast of this
          enables you to use the right tools for analyzing trends while making
          decisions for your business. This way, you can lower the risk to a
          great extent.
        </>
      ),
    },
    {
      icon: <Shield className="w-6 h-6 mb-4 text-blue-500" />,
      title: "Be Prepared",
      description: (
        <>
          AI is not in a vacuum. Innovations in the AI industry are changing the
          schematics of all sectors. For instance, advancements in AI technology
          have led companies like Tesla to introduce autonomous driving
          technology. Following Tesla's lead, companies such as Ford, GM, and
          Waymo have geared up their self-driving feature development efforts.
          Staying ahead of AI news lets you know what is coming up so that you
          can be prepared for it.
        </>
      ),
    },
  ];

  const faq = [
    {
      question: "What’s the best way to stay ahead of AI trends?",
      answer: (
        <>
          Subscribe to the newsletters of AI-related news platforms. You can
          also regularly check out our news section to get reliable updates.
        </>
      ),
    },
    {
      question: "How often does an AI tool roll out its update?",
      answer: (
        <>
          Well, that depends on the developer. Reputed developers tend to update
          often to fix the bugs and add more features to win more users.
        </>
      ),
    },
    {
      question:
        "What's the best way to filter through AI news to find what's relevant to me?",
      answer: (
        <>
          You can begin by pinning down subjects of interest. Then, join some
          community groups relevant to those subjects to stay updated with the
          latest news.
        </>
      ),
    },
    {
      question: "How frequently do I need to check AI updates?",
      answer: (
        <>
          AI is obviously a fast-moving field. But you need not be burdened with
          daily updates unless you are deeply involved. You can check the latest
          updates once or twice a week.
        </>
      ),
    },
  ];

  return (
    <main>
      {/* <section className="bg-gray-50 dark:bg-gray-900 py-10">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            5 Reasons Why You Must Stay Ahead With the Latest AI News
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
            The AI industry is moving fast. If you're not keeping up, you're
            falling behind. Have a look at why staying updated is no longer
            optional but a necessity:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {KeyFeatures.map((features, index) => (
              <CardDesign
                key={index}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="mt-5">
                  <div className="flex items-center ">
                    {features.icon}
                    <h3 className="text-lg font-semibold mb-3 ml-4">
                      {features.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-justify text-sm">
                    {features.description}
                  </p>
                </CardContent>
              </CardDesign>
            ))}
          </div>
        </div>
      </section> */}

      <section className="bg-gray-50 dark:bg-gray-900 my-10">
        <div className="max-w-7xl mx-auto py-8">
          <h2 className="text-3xl font-bold text-center mb-6">
            5 Reasons Why You Must Stay Ahead With the Latest AI News
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
            The AI industry is moving fast. If you're not keeping up, you're
            falling behind. Have a look at why staying updated is no longer
            optional but a necessity:
          </p>

          <div className="relative">
            {/* Connecting Line */}
            {/* <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-[#222222] -translate-y-1/2" /> */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
              {KeyFeatures.map((features, index) => (
                <div key={index} className="relative h-full">
                  <CardDesign className="relative bg-white dark:bg-gray-700 transition-all duration-300 hover:shadow-xl h-full">
                    {/* Step Number */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#222222] flex items-center justify-center text-white text-xl font-bold shadow-lg">
                      {index + 1}
                    </div>

                    <CardContent className="p-6 mt-8">
                      <div className="flex items-center">
                        <span className="mr-4">{features.icon}</span>
                        <h3 className="text-xl font-semibold mb-4">
                          {features.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm text-justify">
                        {features.description}
                      </p>
                    </CardContent>
                  </CardDesign>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="bg-white dark:bg-gray-800">
        <FAQ faqs={faq} title="Frequently Asked Questions" />
      </div>
      <div className="bg-gray-50 dark:bg-gray-900 mt-5 pt-5 pb-16">
        <h2 className="text-3xl font-bold text-center py-4">
          Get AI Updates Instantly!
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 text-md">
          Keep in touch with our{" "}
          <Link href={"/ai-news"} className="underline text-bold text-black">
            news page
          </Link>{" "}
          to get to know{" "}
          <Link
            href={"/all-ai-tools"}
            className="underline text-bold text-black"
          >
            all AI tool
          </Link>{" "}
          updates before your competitors. Stay ahead of the competition!
        </p>
      </div>
    </main>
  );
};

export default AINewsPage;
