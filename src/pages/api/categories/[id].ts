import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query

  if (req.method === 'PUT') {
    // Update a tool
    const { name } = JSON.parse(req.body)
    const updatedCategory = await prisma.category.update({
      where: { id: Number(id) },
      data: {
        name
      }
    })
    return res.status(200).json(updatedCategory)
  }

  if (req.method === 'DELETE') {
    // Delete a tool
    await prisma.category.delete({
      where: { id: Number(id) }
    })
    return res.status(204).json({ message: 'Category deleted' })
  }

  if (req.method === 'GET') {
    const category = await prisma.category.findUnique({
      where: { id: Number(id) }
    })
    return res.status(200).json(category)
  }
}
