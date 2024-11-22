import { PrismaClient } from "@prisma/client";
import { del } from "@vercel/blob";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "PUT") {
    // Update a tool
    const {
      name,
      description,
      shortDescription,
      url,
      categories,
      jobRoles,
      pricing,
      tags,
    } = JSON.parse(req.body);

    const updatedTool = await prisma.tool.update({
      where: { id: Number(id) },
      data: {
        name,
        description,
        shortDescription,
        url,
        pricing,
        tags,
        // Update categories
        categories: {
          deleteMany: {}, // First remove all existing relationships
          create: categories.map((cat: any) => ({
            category: {
              connect: { id: cat.id },
            },
          })),
        },
        // Update job roles
        jobRoles: {
          deleteMany: {}, // First remove all existing relationships
          create: jobRoles.map((role: any) => ({
            jobRole: {
              connect: { id: role.id },
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
        jobRoles: {
          include: {
            jobRole: true,
          },
        },
      },
    });
    return res.status(200).json(updatedTool);
  }

  if (req.method === "DELETE") {
    try {
      // Get the tool first to get image URLs
      const tool = await prisma.tool.findUnique({
        where: { id: Number(id) },
      });

      if (!tool) {
        return res.status(404).json({ error: "Tool not found" });
      }

      // Delete the tool (cascading delete will handle relationships)
      await prisma.tool.delete({
        where: { id: Number(id) },
      });

      // Delete images from blob storage if they exist
      if (tool.icon) {
        await del(tool.icon);
      }
      if (tool.thumbnail) {
        await del(tool.thumbnail);
      }

      // Return success
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error deleting tool:", error);
      return res.status(500).json({ error: "Error deleting tool" });
    }
  }

  if (req.method === "GET") {
    const tool = await prisma.tool.findUnique({
      where: { id: Number(id) },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        jobRoles: {
          include: {
            jobRole: true,
          },
        },
      },
    });
    return res.status(200).json(tool);
  }
}
