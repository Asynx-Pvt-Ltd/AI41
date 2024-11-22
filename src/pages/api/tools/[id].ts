import { del } from "@vercel/blob";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "PUT") {
    try {
      const {
        name,
        description,
        shortDescription,
        url,
        pricing,
        categories,
        icon,
        thumbnail,
        tags,
      } = JSON.parse(req.body);

      const existingTool = await prisma.tool.findUnique({
        where: { id: Number(id) },
      });

      // Handle file deletions if new files are uploaded
      if (
        (icon !== "" || icon !== undefined || icon !== null) &&
        existingTool?.icon
      ) {
        await del(existingTool?.icon as string);
      }
      if (
        (thumbnail !== "" || thumbnail !== undefined || thumbnail !== null) &&
        existingTool?.thumbnail
      ) {
        await del(existingTool?.thumbnail as string);
      }

      // Delete existing category relationships
      await prisma.toolsOnCategories.deleteMany({
        where: {
          toolId: Number(id),
        },
      });

      // Update tool with new categories
      const updatedTool = await prisma.tool.update({
        where: { id: Number(id) },
        data: {
          icon:
            icon !== "" || icon !== null || icon !== undefined
              ? icon
              : existingTool?.icon,
          thumbnail:
            thumbnail !== "" || thumbnail !== null || thumbnail !== undefined
              ? thumbnail
              : existingTool?.thumbnail,
          name: name,
          slug: name.toLowerCase().split(" ").join("-"),
          shortDescription: shortDescription,
          description: description,
          url: url,
          pricing: pricing,
          tags: tags,
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
      return res.status(200).json(updatedTool);
    } catch (error) {
      console.error("Error updating tool:", error);
      return res.status(500).json({ error: "Failed to update tool" });
    }
  }

  if (req.method === "DELETE") {
    try {
      const existingTool = await prisma.tool.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (existingTool?.icon) {
        await del(existingTool.icon as string);
      }

      // Delete the tool (cascading delete will handle category relationships)
      await prisma.tool.delete({
        where: { id: Number(id) },
      });

      const tools = await prisma.tool.findMany({
        include: {
          categories: {
            include: {
              category: true,
            },
          },
        },
      });
      return res.status(200).json(tools);
    } catch (error) {
      console.error("Error deleting tool:", error);
      return res.status(500).json({ error: "Failed to delete tool" });
    }
  }

  if (req.method === "GET") {
    try {
      const tool = await prisma.tool.findUnique({
        where: { id: Number(id) },
        include: {
          categories: {
            include: {
              category: true,
            },
          },
        },
      });
      return res.status(200).json(tool);
    } catch (error) {
      console.error("Error fetching tool:", error);
      return res.status(500).json({ error: "Failed to fetch tool" });
    }
  }
  return res.status(404).json({ message: "Not Found" });
}
