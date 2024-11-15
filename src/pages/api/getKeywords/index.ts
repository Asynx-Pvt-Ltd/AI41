import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/primsa";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const keywordEntry = await prisma.tutorialKeyword.findFirst();
    return res.status(200).json(keywordEntry.keyword);
  }
};

export default handler;
