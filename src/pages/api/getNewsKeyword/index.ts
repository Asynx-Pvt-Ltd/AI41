import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/primsa";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { keyword, keywordUrl } = req.body;
    const prismaRes = await prisma.newsKeyword.create({
      data: {
        keyword,
        keywordUrl,
      },
    });

    return res.status(200).json(prismaRes);
  }

  if (req.method === "GET") {
    const prismaRes = await prisma.newsKeyword.findMany();
    return res.status(200).json(prismaRes);
  }
};

export default handler;
