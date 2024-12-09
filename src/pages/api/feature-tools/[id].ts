import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();
const uploadDir = process.env.IMAGE_UPLOAD_DIR as string;

// Helper function to safely delete a file
const safeDeleteFile = (filePath: string) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error(`Failed to delete file ${filePath}:`, error);
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "PUT") {
    const { title, description, url, icon } = JSON.parse(req.body);
    const existingTool = await prisma.featureProject.findUnique({
      where: { id: Number(id) },
    });

    // Delete old icon if new icon is provided
    if (
      icon !== "" &&
      icon !== undefined &&
      icon !== null &&
      existingTool?.icon
    ) {
      safeDeleteFile(
        path.join(uploadDir, path.basename(existingTool.icon as string))
      );
    }

    const updatedTool = await prisma.featureProject.update({
      where: { id: Number(id) },
      data: {
        icon: icon ?? existingTool?.icon,
        title: title,
        description: description,
        link: url,
      },
    });
    return res.status(200).json(updatedTool);
  }

  if (req.method === "DELETE") {
    const existingTool = await prisma.featureProject.findUnique({
      where: {
        id: Number(id),
      },
    });

    // Delete associated icon file
    if (existingTool?.icon) {
      safeDeleteFile(
        path.join(uploadDir, path.basename(existingTool.icon as string))
      );
    }

    // Delete tool from database
    await prisma.featureProject.delete({
      where: { id: Number(id) },
    });

    const featureProjects = await prisma.featureProject.findMany();
    return res.status(200).json(featureProjects);
  }

  if (req.method === "GET") {
    const tool = await prisma.featureProject.findUnique({
      where: { id: Number(id) },
    });
    return res.status(200).json(tool);
  }
  return res.status(404).json({ message: "Not Found" });
}
