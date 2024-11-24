import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "PUT") {
    const { keyword, keywordUrl } = req.body;
    const updatedCategory = await prisma.newsKeyword.update({
      where: { id: Number(id) },
      data: {
        keyword,
        keywordUrl,
      },
    });
    return res.status(200).json(updatedCategory);
  }

  if (req.method === "DELETE") {
    const prismaRes = await prisma.newsKeyword.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json(prismaRes);
  }
}
