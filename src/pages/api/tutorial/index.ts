import prisma from '../../../lib/primsa'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { title, url, icon, tags } = JSON.parse(req.body)

    const newTutorial = await prisma.tutorial.create({
      data: {
        title: title,
        url: url,
        icon: icon,
        tags: tags
      }
    })
    return res.json(newTutorial)
  } else if (req.method === 'GET') {
    const tools = await prisma.tutorial.findMany()
    return res.json(tools)
  }
}
