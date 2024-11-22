import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "PUT") {
    // Update a tool
    const { name, fontIcon, slug } = JSON.parse(req.body);
    const updatedCategory = await prisma.category.update({
      where: { id: Number(id) },
      data: {
        name,
        fontIcon,
        slug,
      },
    });
    return res.status(200).json(updatedCategory);
  }

  if (req.method === "DELETE") {
    await prisma.ToolsOnCategories.deleteMany({
      where: { categoryId: Number(id) },
    });

    // Delete a tool
    await prisma.category.delete({
      where: { id: Number(id) },
    });
    const categories = await prisma.category.findMany();
    return res.status(200).json(categories);
  }

  if (req.method === "GET") {
    const category = await prisma.category.findUnique({
      where: { id: Number(id) },
    });
    return res.status(200).json(category);
  }
}
