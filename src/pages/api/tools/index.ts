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
      categories,
      icon,
      thumbnail,
      tags,
      jobRoles,
    } = JSON.parse(req.body);

    try {
      const toolData: {
        icon: string;
        thumbnail: string;
        name: string;
        slug: string;
        description: string;
        shortDescription: string;
        url: string;
        pricing: string;
        tags: string[];
        categories: { create: any[] };
        jobRoles?: { create: any[] };
      } = {
        icon: icon ?? "",
        thumbnail: thumbnail ?? "",
        name,
        slug: name.toLowerCase().split(" ").join("-"),
        description,
        shortDescription,
        url,
        pricing,
        tags,
        categories: {
          create: categories.map((cat: { id: number; name: string }) => ({
            category: {
              connect: {
                id: cat.id,
              },
            },
          })),
        },
      };

      if (jobRoles && jobRoles.length > 0) {
        toolData.jobRoles = {
          create: jobRoles.map((role: { id: number; name: string }) => ({
            jobRole: {
              connect: {
                id: role.id,
              },
            },
          })),
        };
      }

      const newTool = await prisma.tool.create({
        data: toolData,
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
          jobRoles: {
            include: {
              jobRole: true,
            },
          },
        },
      });

      const transformedTools = tools.map((tool) => ({
        ...tool,
        categories: tool.categories.map((tc) => ({
          id: tc.category.id,
          name: tc.category.name,
        })),
        jobRoles: tool.jobRoles.map((jr) => ({
          id: jr.jobRole.id,
          name: jr.jobRole.name,
        })),
      }));

      return res.json(transformedTools);
    } catch (error) {
      console.error("Error fetching tools:", error);
      return res.status(500).json({ error: "Failed to fetch tools" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
