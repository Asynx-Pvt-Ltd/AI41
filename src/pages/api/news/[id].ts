import { del, put } from "@vercel/blob";
import { PrismaClient } from "@prisma/client";
import { IncomingForm } from "formidable";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "PUT") {
    // Update a tool

    const { title, icon, url } = JSON.parse(req.body);

    const existingNews = await prisma.news.findUnique({
      where: { id: Number(id) },
    });
    if (
      (icon !== "" || icon !== undefined || icon !== null) &&
      existingNews?.icon
    ) {
      try {
        await del(existingNews?.icon as string);
      } catch {}
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
    try {
      await del(existingNews?.icon as string);
    } catch {}
    // Delete a tool
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
