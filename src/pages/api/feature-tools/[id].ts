import { del, put } from '@vercel/blob'
import { PrismaClient } from '@prisma/client'
import { IncomingForm } from 'formidable'
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import fs, { PathLike } from 'fs'

const prisma = new PrismaClient()

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
    const { title, description, url, icon } = fields
    const existingTool = await prisma.featureProject.findUnique({
      where: { id: Number(id) }
    })
    await del(existingTool?.icon as string)

    const updatedTool = await prisma.featureProject.update({
      where: { id: Number(id) },
      data: {
        icon: icon?.join('') ?? '',
        title: title?.join('') ?? '',
        description: description?.join('') ?? '',
        link: url?.join('') ?? ''
      }
    })
    return res.status(200).json(updatedTool)
  }

  if (req.method === 'DELETE') {
    const existingTool = await prisma.featureProject.findUnique({
      where: {
        id: Number(id)
      }
    })
    await del(existingTool?.icon as string)
    // Delete a tool
    await prisma.featureProject.delete({
      where: { id: Number(id) }
    })
    return res.status(204).json({ message: 'Tool deleted' })
  }

  if (req.method === 'GET') {
    const tool = await prisma.featureProject.findUnique({
      where: { id: Number(id) }
    })
    return res.status(200).json(tool)
  }
  return res.status(404).json({ message: 'Not Found' })
}
