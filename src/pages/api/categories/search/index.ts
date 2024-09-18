import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query

  if (req.method === 'GET') {
    // Update a tool
    const { searchTerm = '', categoryId = '', pricing = '' } = req.query

    try {
      // Build the query object based on the provided search criteria
      const whereClause: any = {
        AND: [
          {
            name: {
              contains:
                typeof searchTerm === 'object'
                  ? searchTerm.join('')
                  : searchTerm
            }
          }
        ]
      }
      if (categoryId) {
        whereClause.AND.push({
          categoryId: {
            equals: Number(categoryId)
          }
        })
      }
      if (pricing) {
        whereClause.AND.push({
          pricing: {
            equals: pricing
          }
        })
      }
      console.log('====================================')
      console.log('where -->', whereClause)
      console.log('====================================')
      // Query the tools from the database
      // Query the tools from the database
      const filteredtools = await prisma.tool.findMany({
        where: whereClause,
        include: {
          category: true // Include related category information
        }
      })

      // Send the results back in the response
      return res.status(200).json(filteredtools)
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: 'Error fetching tools', error: error.message })
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' })
  }
}
