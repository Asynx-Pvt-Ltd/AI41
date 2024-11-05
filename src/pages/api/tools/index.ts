import prisma from "../../../lib/primsa";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      name,
      description,
      shortDescription,
      url,
      pricing,
      categoryId,
      category,
      icon,
      thumbnail,
      tags,
    } = JSON.parse(req.body);

    if (categoryId) {
      const categoryEx = await prisma.category.findUnique({
        where: { id: categoryId },
      });
      const newTool = await prisma.tool.create({
        data: {
          icon: icon ?? "",
          thumbnail: thumbnail ?? "",
          name: name,
          slug: name.toLowerCase().split(" ").join("-"),
          description: description,
          shortDescription: shortDescription,
          url: url,
          pricing: pricing,
          categoryId: categoryEx?.id ?? -1,
          tags: tags,
        },
      });
      return res.json(newTool);
    } else {
      const categoryEx = await prisma.category.create({
        data: {
          name: category,
          slug: category
            .split(" ")
            .map((s: string) => s.toLowerCase())
            .join("-"),
        },
      });
      const newTool = await prisma.tool.create({
        data: {
          icon: icon,
          thumbnail: thumbnail ?? "",
          name: name,
          slug: name.toLowerCase().split(" ").join("-"),
          description: description,
          shortDescription: shortDescription,
          url: url,
          pricing: pricing,
          categoryId: categoryEx?.id ?? -1,
          tags: tags,
        },
      });
      return res.json(newTool);
    }
  } else if (req.method === "GET") {
    const tools = await prisma.tool.findMany();
    return res.json(tools);
  }
}
