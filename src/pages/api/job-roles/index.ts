import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { category } = req.query;

    if (category) {
      const categories = await prisma.JobRole.findUnique({
        where: {
          slug: typeof category === "object" ? category.join("") : category,
        },
        include: {
          tools: true,
        },
      });

      return res.status(200).json(categories);
    }
    const categories = await prisma.JobRole.findMany({
      include: {
        tools: true,
      },
    });
    return res.status(200).json(categories);
  }

  if (req.method === "POST") {
    const { name, slug } = JSON.parse(req.body);
    const newCategory = await prisma.JobRole.create({
      data: {
        name: name,
        slug: slug,
      },
    });
    return res.status(201).json(newCategory);
  }
}
