import prisma from '../../../lib/primsa'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { name, description, url, pricing, categoryId, category, icon } =
      JSON.parse(req.body)

    if (category?.join('')) {
      const categoryEx = await prisma.category.findUnique({
        where: { name: category.join('') }
      })
      const newTool = await prisma.tool.create({
        data: {
          icon: icon,
          name: name,
          description: description,
          url: url,
          pricing: pricing,
          categoryId: categoryEx?.id ?? -1
        }
      })
      return res.json(newTool)
    } else {
      const categoryEx = await prisma.category.create({
        data: { name: category?.join('') ?? '' }
      })
      const newTool = await prisma.tool.create({
        data: {
          icon: icon,
          name: name,
          description: description,
          url: url,
          pricing: pricing,
          categoryId: categoryEx?.id ?? -1
        }
      })
      return res.json(newTool)
    }
  } else if (req.method === 'GET') {
    const tools = await prisma.tool.findMany()
    return res.json(tools)
  }
}
