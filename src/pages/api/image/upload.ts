import { put } from '@vercel/blob'
import { NextApiRequest, NextApiResponse } from 'next'

// The next lines are required for Pages API Routes only
export const config = {
  api: {
    bodyParser: false
  }
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const blob = await put(req.query.filename as string, req, {
      access: 'public'
    })

    return res.status(200).json(blob)
  } else {
    return res.json({ message: 'Method Not Allowed' })
  }
}
