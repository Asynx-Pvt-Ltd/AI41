import { PrismaClient } from '@prisma/client'
import formidable, { IncomingForm } from 'formidable'
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import fs, { PathLike } from 'fs'

const prisma = new PrismaClient()
export const config = {
  api: {
    bodyParser: false
  }
}

const uploadDir = path.join(process.cwd(), 'public/uploads') // Directory to store uploaded files

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
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
      uploadDir,
      keepExtensions: true
    })

    const [fields, files] = await form.parse(req)
    // Access form fields and the uploaded file
    const { title, description, url } = fields
    const file = files.icon ? (files.icon[0] as formidable.File) : null

    var fileURL = ''
    if (file && file.originalFilename) {
      const existingTool = await prisma.featureProject.findUnique({
        where: {
          id: Number(id)
        }
      })
      const filePath = path.join(
        process.cwd(),
        'public',
        existingTool?.icon ?? ''
      )
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
      const newFilePath = path.join(
        uploadDir,
        file.originalFilename || file.newFilename
      )
      fs.renameSync(file.filepath, newFilePath)
      fileURL = `/uploads/${path.basename(newFilePath)}`
    }

    const updatedTool = await prisma.featureProject.update({
      where: { id: Number(id) },
      data: {
        icon: fileURL,
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
    const filePath = path.join(
      process.cwd(),
      'public',
      existingTool?.icon ?? ''
    )
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
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
