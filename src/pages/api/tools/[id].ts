import { del, put } from '@vercel/blob'
import { PrismaClient } from '@prisma/client'
import { IncomingForm } from 'formidable'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query

  if (req.method === 'PUT') {
    console.log('====================================')
    console.log('JSON.parse(req.body) ---->', JSON.parse(req.body))
    console.log('====================================')
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
      tags
    } = JSON.parse(req.body)

    const categoryEx = await prisma.category.findUnique({
      where: { id: Number(categoryId) }
    })
    const existingTool = await prisma.tool.findUnique({
      where: { id: Number(id) }
    })
    if (
      (icon !== '' || icon !== undefined || icon !== null) &&
      existingTool?.icon
    ) {
      await del(existingTool?.icon as string)
    }
    if (
      (thumbnail !== '' || thumbnail !== undefined || thumbnail !== null) &&
      existingTool?.thumbnail
    ) {
      await del(existingTool?.thumbnail as string)
    }
    const updatedTool = await prisma.tool.update({
      where: { id: Number(id) },
      data: {
        icon: icon ?? existingTool?.icon,
        thumbnail: thumbnail ?? existingTool?.thumbnail,
        name: name,
        slug: name.toLowerCase().split(' ').join('-'),
        description: description,
        url: url,
        pricing: pricing,
        categoryId: categoryEx?.id ?? -1,
        tags: tags
      }
    })
    return res.status(200).json(updatedTool)
  }

  if (req.method === 'DELETE') {
    const existingTool = await prisma.tool.findUnique({
      where: {
        id: Number(id)
      }
    })
    await del(existingTool?.icon as string)
    // Delete a tool
    await prisma.tool.delete({
      where: { id: Number(id) }
    })
    const tools = await prisma.tool.findMany()
    return res.status(200).json(tools)
  }

  if (req.method === 'GET') {
    const tool = await prisma.tool.findUnique({
      where: { id: Number(id) }
    })
    return res.status(200).json(tool)
  }
  return res.status(404).json({ message: 'Not Found' })
}
