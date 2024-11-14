import type { NextApiRequest, NextApiResponse } from "next";

const newsEndpoint = async () => {
  const response = await fetch(
    "https://" +
      process.env.SERP_API_ENDPOINT +
      "?engine=google_news" +
      "&no_cache=true" +
      `&topic_token=${process.env.SERP_API_TOPIC_TOKEN}` +
      `&api_key=${process.env.SERP_API_KEY}`,
    { cache: "force-cache" }
  );
  const data = await response.json();
  return data.news_results;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Check for authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  // Verify the token
  if (token !== process.env.AUTHORIZATION_TOKEN) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    const results = await newsEndpoint();
    return res.json(results);
  }

  return res.status(405).json({ error: "Method not allowed" });
};

export default handler;
