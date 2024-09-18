import prisma from '../../../lib/primsa'
import type { NextApiRequest, NextApiResponse } from 'next'
import formidable, { IncomingForm } from 'formidable'
import fs from 'fs'
import path from 'path'

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
  if (req.method === 'POST') {
    const form = new IncomingForm({
      multiples: false,
      uploadDir,
      keepExtensions: true
    })

    const [fields, files] = await form.parse(req)
    // Access form fields and the uploaded file
    console.log('====================================')
    console.log('files --->', files)
    console.log('====================================')
    const { title, description, url } = fields
    const file = files.icon ? (files.icon[0] as formidable.File) : null
    var fileURL = ''
    if (file && file.originalFilename) {
      const newFilePath = path.join(
        uploadDir,
        file.originalFilename || file.newFilename
      )
      fs.renameSync(file.filepath, newFilePath)
      fileURL = `/uploads/${path.basename(newFilePath)}`
    }

    const newTool = await prisma.featureProject.create({
      data: {
        icon: fileURL,
        title: title?.join('') ?? '',
        description: description?.join('') ?? '',
        link: url?.join('') ?? ''
      }
    })
    return res.json(newTool)
  } else if (req.method === 'GET') {
    const tools = await prisma.featureProject.findMany()
    return res.json(tools)
  }
}
