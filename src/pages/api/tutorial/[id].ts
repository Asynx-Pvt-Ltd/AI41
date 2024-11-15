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

    const { title, icon, url, tags } = JSON.parse(req.body);

    const existingTutorial = await prisma.tutorial.findUnique({
      where: { id: Number(id) },
    });
    if (
      (icon !== "" || icon !== undefined || icon !== null) &&
      existingTutorial?.icon
    ) {
      await del(existingTutorial?.icon as string);
    }
    const updatedTool = await prisma.tutorial.update({
      where: { id: Number(id) },
      data: {
        icon: icon ?? existingTutorial?.icon,
        title: title,
        url: url,
        tags: tags,
      },
    });
    return res.status(200).json(updatedTool);
  }

  if (req.method === "DELETE") {
    const existingTool = await prisma.tutorial.findUnique({
      where: {
        id: Number(id),
      },
    });
    try {
      await del(existingTool?.icon as string);
    } catch {}
    // Delete a tool
    await prisma.tutorial.delete({
      where: { id: Number(id) },
    });
    const tutorials = await prisma.tutorial.findMany();
    return res.status(200).json(tutorials);
  }

  if (req.method === "GET") {
    const tool = await prisma.tutorial.findUnique({
      where: { id: Number(id) },
    });
    return res.status(200).json(tool);
  }
  return res.status(404).json({ message: "Not Found" });
}
