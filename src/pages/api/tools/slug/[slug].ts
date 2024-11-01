import { del, put } from '@vercel/blob'
import { PrismaClient } from '@prisma/client'
import { IncomingForm } from 'formidable'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query

  if (req.method === 'GET') {
    if (slug && typeof slug === 'string') {
      const tool = await prisma.tool.findFirst({
        where: { slug: slug }
      })
      const category = await prisma.category.findUnique({
        where: { id: tool?.categoryId }
      })
      var toolWithCategory = { ...tool, category: category?.name }
      const alternatives = await prisma.tool.findMany({
        where: { categoryId: tool?.categoryId, NOT: { id: tool?.id } }
      })
      return res
        .status(200)
        .json({ tool: toolWithCategory, alternatives: alternatives })
    } else {
      return res.status(400).json({ message: 'Invalid Request' })
    }
  }
  return res.status(404).json({ message: 'Not Found' })
}
