import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  if (req.method === "PUT") {
    try {
      const existingJobRole = await prisma.jobRole.findUnique({
        where: { id: Number(id) },
      });

      if (!existingJobRole) {
        return res.status(404).json({ error: "Job role not found" });
      }

      const { name, slug, fontIcon } = JSON.parse(req.body);

      if (!name || !slug) {
        return res.status(400).json({ error: "Name and slug are required" });
      }

      const updatedJobRole = await prisma.jobRole.update({
        where: { id: Number(id) },
        data: {
          name,
          slug,
          fontIcon,
        },
        include: {
          tools: {
            include: {
              tool: true,
            },
          },
        },
      });

      return res.status(200).json(updatedJobRole);
    } catch (error) {
      console.error("Error updating job role:", error);
      return res.status(500).json({ error: "Error updating job role" });
    }
  }

  if (req.method === "DELETE") {
    try {
      const jobRole = await prisma.jobRole.findUnique({
        where: { id: Number(id) },
      });

      if (!jobRole) {
        return res.status(404).json({ error: "Job role not found" });
      }

      await prisma.jobRole.delete({
        where: { id: Number(id) },
      });

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error deleting job role:", error);
      return res.status(500).json({ error: "Error deleting job role" });
    }
  }

  if (req.method === "GET") {
    try {
      const jobRole = await prisma.jobRole.findUnique({
        where: { id: Number(id) },
        include: {
          tools: {
            include: {
              tool: true,
            },
          },
        },
      });

      if (!jobRole) {
        return res.status(404).json({ error: "Job role not found" });
      }

      return res.status(200).json(jobRole);
    } catch (error) {
      console.error("Error fetching job role:", error);
      return res.status(500).json({ error: "Error fetching job role" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
