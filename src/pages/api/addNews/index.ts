import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/primsa";

// Define the structure of the news item and stories
type Story = {
  title: string;
  link: string;
  thumbnail: string;
  date: string;
};

type NewsItem = {
  title: string;
  url: string;
  icon: string;
  stories?: Story[];
};

const newsEndpoint = async (): Promise<NewsItem[]> => {
  const response = await fetch(
    `https://${process.env.SERP_API_ENDPOINT}?engine=google_news&topic_token=${process.env.SERP_API_TOPIC_TOKEN}&api_key=${process.env.SERP_API_KEY}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch news: ${response.statusText}`);
  }

  const data = await response.json();
  return data.news_results as NewsItem[];
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const results = await newsEndpoint();

      const formattedResults = results.flatMap(
        (item) =>
          item.stories?.map((story) => ({
            title: story.title,
            url: story.link,
            icon: story.thumbnail || "",
            date: story.date,
          })) || []
      );

      const prismaRes = await prisma.news.createMany({
        data: formattedResults,
        skipDuplicates: true,
      });
      return res.status(200).json(prismaRes);
    } catch (error: any) {
      return res
        .status(500)
        .json({ error: error.message || "Internal Server Error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
};

export default handler;
