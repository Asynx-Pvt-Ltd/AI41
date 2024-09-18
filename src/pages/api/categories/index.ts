import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const categories = await prisma.category.findMany({
      include: {
        tools: true
      }
    })
    return res.status(200).json(categories)
  }

  if (req.method === 'POST') {
    const { name } = JSON.parse(req.body)
    console.log('====================================')
    console.log('name --->', name)
    console.log('====================================')
    const newCategory = await prisma.category.create({
      data: {
        name: name
      }
    })
    return res.status(201).json(newCategory)
  }
}
