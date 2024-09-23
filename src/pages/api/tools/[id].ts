import { del, put } from '@vercel/blob'
import { PrismaClient } from '@prisma/client'
import { IncomingForm } from 'formidable'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()
export const config = {
  api: {
    bodyParser: false
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query

  if (req.method === 'PUT') {
    // Update a tool
    const form = new IncomingForm({
      multiples: false,

      keepExtensions: true
    })

    const [fields, files] = await form.parse(req)
    // Access form fields and the uploaded file
    console.log('====================================')
    console.log('files --->', files)
    console.log('====================================')
    const { name, description, url, pricing, categoryId, category, icon } =
      fields

    const categoryEx = await prisma.category.findUnique({
      where: { name: category?.join('') }
    })
    const existingTool = await prisma.tool.findUnique({
      where: { id: Number(id) }
    })
    await del(existingTool?.icon as string)
    const updatedTool = await prisma.tool.update({
      where: { id: Number(id) },
      data: {
        icon: icon?.join('') ?? '',
        name: name?.join('') ?? '',
        description: description?.join('') ?? '',
        url: url?.join('') ?? '',
        pricing: pricing?.join('') ?? '',
        categoryId: categoryEx?.id ?? -1
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
    return res.status(204).json({ message: 'Tool deleted' })
  }

  if (req.method === 'GET') {
    const tool = await prisma.tool.findUnique({
      where: { id: Number(id) }
    })
    return res.status(200).json(tool)
  }
  return res.status(404).json({ message: 'Not Found' })
}
