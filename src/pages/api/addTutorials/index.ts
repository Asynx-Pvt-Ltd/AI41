import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/primsa";

interface YouTubeVideo {
  id: {
    videoId: string;
  };
  snippet: {
    tags: string[];
    title: string;
    thumbnails: {
      default: {
        url: string;
      };
      medium: {
        url: string;
      };
    };
  };
}

interface YouTubeAPIResponse {
  items: YouTubeVideo[];
}

interface VideoStatistics {
  viewCount: string;
  likeCount: string;
  snippet: {
    tags: string[];
  };
}

interface FormattedVideo {
  title: string;
  url: string;
  icon: string;
  videoId: string;
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

const fetchStatistics = async (
  data: FormattedVideo[]
): Promise<{
  items: {
    snippet: any;
    statistics: VideoStatistics;
  }[];
}> => {
  const videoIds = data.map((video) => video.videoId);
  const formattedVIdeoIds = videoIds.join(",");
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${formattedVIdeoIds}&key=${process.env.YOUTUBE_API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch statistics: ${response.statusText}`);
  }

  const resData = await response.json();
  return resData;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // return await prisma.tutorial.deleteMany({});
  if (req.method === "GET") {
    try {
      const keywordEntry = await prisma.tutorialKeyword.findFirst();
      if (!keywordEntry || !keywordEntry.keyword)
        return res.status(400).json({
          success: false,
          message: "No keyword found in the database.",
        });

      const videosData = await fetchVideos(keywordEntry.keyword);
      const formattedResults = videosData.items.map((item) => ({
        title: item.snippet.title,
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        icon: item.snippet.thumbnails.medium.url,
        videoId: item.id.videoId,
      }));

      const statistics = await fetchStatistics(formattedResults);
      const formattedStatistics = statistics.items.map((item) => ({
        viewCount: item.statistics.viewCount,
        likeCount: item.statistics.likeCount,
        tags: item.snippet.tags,
      }));

      const mergedResults = formattedResults.map((result, index) => ({
        ...result,
        ...formattedStatistics[index],
      }));
      const prismaResult = await prisma.tutorial.createMany({
        data: mergedResults,
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
  }

  if (req.method === "POST") {
    const { keyword } = req.body as { keyword: string };

    await prisma.tutorialKeyword.deleteMany({});
    const prismaRes = await prisma.tutorialKeyword.create({
      data: {
        keyword: keyword.replaceAll(",", " "),
      },
    });
    return res.status(200).json(prismaRes);
  }
};

export default handler;
