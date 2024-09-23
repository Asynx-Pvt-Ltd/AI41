import prisma from '../../../lib/primsa'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { title, description, icon, url } = JSON.parse(req.body)

    const newTool = await prisma.featureProject.create({
      data: {
        icon: icon,
        title: title,
        description: description,
        link: url
      }
    })
    return res.json(newTool)
  } else if (req.method === 'GET') {
    try {
      const tools = await prisma.featureProject.findMany()
      return res.json(tools)
    } catch (err) {
      return res.json({ error: `Failed because of ${err}` })
    }
  }
}
