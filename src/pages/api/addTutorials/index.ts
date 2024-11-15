import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/primsa";

interface YouTubeVideo {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    thumbnails: {
      default: {
        url: string;
      };
    };
  };
}

interface YouTubeAPIResponse {
  items: YouTubeVideo[];
}

const fetchVideos = async (query: string): Promise<YouTubeAPIResponse> => {
  const url = `https://www.googleapis.com/youtube/v3/search?regionCode=US&maxResults=50&key=${
    process.env.YOUTUBE_API_KEY
  }&type=video&part=snippet&q=${encodeURIComponent(query)}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch videos: ${response.statusText}`);
  }

  const data: YouTubeAPIResponse = await response.json();
  return data;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const videosData = await fetchVideos("chatgpt");
    const formattedResults = videosData.items.map((item) => ({
      title: item.snippet.title,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      icon: item.snippet.thumbnails.default.url,
    }));

    const prismaResult = await prisma.tutorial.createMany({
      data: formattedResults,
      skipDuplicates: true,
    });

    return res.status(200).json({
      success: true,
      message: "Videos fetched and stored successfully.",
      prismaResult,
    });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ success: false, message: error.message });
  }
};

export default handler;
