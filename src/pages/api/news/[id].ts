import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();
const uploadDir = process.env.IMAGE_UPLOAD_DIR as string;

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
    const { title, icon, url } = JSON.parse(req.body);

    const existingNews = await prisma.news.findUnique({
      where: { id: Number(id) },
    });

    if (
      icon !== "" &&
      icon !== undefined &&
      icon !== null &&
      existingNews?.icon
    ) {
      safeDeleteFile(
        path.join(uploadDir, path.basename(existingNews.icon as string))
      );
    }

    const updatedTool = await prisma.news.update({
      where: { id: Number(id) },
      data: {
        icon: icon ?? existingNews?.icon,
        title: title,
        url: url,
      },
    });
    return res.status(200).json(updatedTool);
  }

  if (req.method === "DELETE") {
    const existingNews = await prisma.news.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (existingNews?.icon) {
      safeDeleteFile(
        path.join(uploadDir, path.basename(existingNews.icon as string))
      );
    }

    await prisma.news.delete({
      where: { id: Number(id) },
    });

    const news = await prisma.news.findMany();
    return res.status(200).json(news);
  }

  if (req.method === "GET") {
    const news = await prisma.news.findUnique({
      where: { id: Number(id) },
    });
    return res.status(200).json(news);
  }
  return res.status(404).json({ message: "Not Found" });
}
