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
      categories, // Changed from categoryId/category to categories array
      icon,
      thumbnail,
      tags,
    } = JSON.parse(req.body);

    try {
      // Create the tool with multiple categories
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
          tags: tags,
          // Create relationships with all selected categories
          categories: {
            create: categories.map((cat: { id: number; name: string }) => ({
              category: {
                connect: {
                  id: cat.id,
                },
              },
            })),
          },
        },
        include: {
          categories: {
            include: {
              category: true,
            },
          },
        },
      });
      return res.json(newTool);
    } catch (error) {
      console.error("Error creating tool:", error);
      return res.status(500).json({ error: "Failed to create tool" });
    }
  } else if (req.method === "GET") {
    try {
      const tools = await prisma.tool.findMany({
        include: {
          categories: {
            include: {
              category: true,
            },
          },
        },
      });

      // Transform the response to match your existing format
      const transformedTools = tools.map((tool) => ({
        ...tool,
        categories: tool.categories.map((tc) => ({
          id: tc.category.id,
          name: tc.category.name,
        })),
      }));

      return res.json(transformedTools);
    } catch (error) {
      console.error("Error fetching tools:", error);
      return res.status(500).json({ error: "Failed to fetch tools" });
    }
  }
}
