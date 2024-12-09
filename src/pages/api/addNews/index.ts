import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/primsa";

// Define the structure of the news item and stories
type Story = {
  title: string;
  link: string;
  thumbnail: string;
  date: string;
  slugUrl: string;
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
  const newsResults = data.news_results;
  return newsResults as NewsItem[];
};

const rephraseTitle = async (title: string): Promise<string> => {
  const messagecontent = [
    {
      role: "system",
      content:
        "You are a headline writer. Rephrase titles to be engaging while maintaining accuracy. Output only the clean title text without quotes, citations, or special characters.",
    },
    {
      role: "user",
      content: `Rephrase this headline to be more engaging while keeping its core meaning: ${title}`,
    },
  ];

  const response = await fetch(`https://api.perplexity.ai/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-sonar-small-128k-online",
      messages: messagecontent,
    }),
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error(`Failed to generate description: ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
};

const generateDescription = async (
  title: string,
  url: string
): Promise<string> => {
  const messagecontent = [
    {
      role: "system",
      content:
        "You are an AI news summarizer. Generate structured article summaries with clear key takeaways and paragraphs. Never include citations, quotes, or special characters. Use simple grammar and clear language.",
    },
    {
      role: "user",
      content: `Analyze and summarize this AI news article:
  
  Title: ${title}
  URL: ${url}
  
  Format your response exactly like this:
  <div classname="news-para">
  <div class="keytakeaways">
  <h2>Key Takeaways</h2>
  <ul>
  <li>[First key takeaway]</li>
  <li>[Second key takeaway]</li>
  <li>[Third key takeaway]</li>
  </ul>
  </div>

  <div class="news-summary">
  <h2>Summary:</h2>
  
  <p>[First paragraph focusing on main points]</p>
  
  <p>[Second paragraph covering additional details]</p>
  
  <p>[Final paragraph with implications or conclusions]</p>
  </div>
  </div>
  Keep total length under 200 words. Use simple language and short sentences.`,
    },
  ];

  const response = await fetch(`https://api.perplexity.ai/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-sonar-small-128k-online",
      messages: messagecontent,
    }),
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error(`Failed to generate description: ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
};

const formatTitle = (title: string): string => {
  // Remove both single and double quotes
  return title.replace(/['"]+/g, "").trim();
};

async function generateAIImagePrompt(newsTitle: string): Promise<string> {
  const aiPrompts = [
    `Futuristic digital visualization of Artificial Intelligence, representing: ${newsTitle}`,
    `High-tech neural network illustration capturing the essence of: ${newsTitle}`,
    `Cybernetic concept art depicting advanced AI technology: ${newsTitle}`,
    `Stunning abstract representation of artificial intelligence and machine learning: ${newsTitle}`,
    `Cutting-edge AI visualization with interconnected digital neural pathways: ${newsTitle}`,
  ];

  return aiPrompts[Math.floor(Math.random() * aiPrompts.length)];
}

const generateImage = async (prompt: string) => {
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "dall-e-2",
      prompt,
      n: 1,
      size: "256x256",
    }),
  });

  const image = await res.json();

  const fetchImage = await fetch(image.data[0].url);
  const arrayBuffer = await fetchImage.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return buffer;
};

const uploadImage = async (image: Buffer, cleanTitle: string) => {
  const sanitizedFilename =
    cleanTitle.replace(/[^a-z0-9]/gi, "_").toLowerCase() + ".png";

  const encodedFilename = encodeURIComponent(sanitizedFilename);

  const fullUploadUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/image/upload?filename=${encodedFilename}`;

  const imageUploadResponse = await fetch(fullUploadUrl, {
    method: "POST",
    body: image,
  });

  if (!imageUploadResponse.ok) {
    const errorText = await imageUploadResponse.text();
    console.error("Upload error:", errorText);
    throw new Error(`Image upload failed: ${errorText}`);
  }

  const uploadedImageData = await imageUploadResponse.json();
  return uploadedImageData.url;
};
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const results = await newsEndpoint();
      const formattedResults = [];
      let newsCount = 0;
      const maxNews = 8;

      for (const item of results) {
        if (item.stories) {
          for (const story of item.stories) {
            if (newsCount >= maxNews) break;

            const title = await rephraseTitle(story.title);
            const cleanTitle = formatTitle(title);
            const description = await generateDescription(
              story.title,
              story.link
            );
            const prompt = await generateAIImagePrompt(cleanTitle);
            const image = await generateImage(prompt);

            const imageUrl = await uploadImage(image, cleanTitle);

            formattedResults.push({
              title: cleanTitle,
              url: story.link,
              slugUrl: encodeURIComponent(`${cleanTitle.replaceAll(" ", "-")}`),
              icon: imageUrl, // Use generated image URL
              date: story.date,
              description,
            });

            newsCount++;
          }
          if (newsCount >= maxNews) break;
        }
      }

      const prismaRes = await prisma.news.createMany({
        data: formattedResults,
        skipDuplicates: true,
      });

      return res.status(200).json({ formattedResults, prismaRes });
    } catch (error: any) {
      return res
        .status(500)
        .json({ error: error.message || "Internal Server Error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
};

export default handler;
