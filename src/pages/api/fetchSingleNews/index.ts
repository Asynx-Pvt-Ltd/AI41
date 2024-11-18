import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { slug } = req.body;
    const newsArticle = await prisma.news.findUnique({
      where: { slugUrl: slug.toString() },
    });
    if (!newsArticle) return res.status(404);
    return res.status(200).json(newsArticle);
  }
};

export default handler;
