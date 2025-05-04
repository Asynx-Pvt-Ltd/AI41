import prisma from '../../../lib/primsa';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === 'GET') {
		try {
			const freeTools = await prisma.tool.findMany({
				where: {
					hasFreePrice: true,
				},
				include: {
					categories: {
						include: {
							category: true,
						},
					},
					jobRoles: {
						include: {
							jobRole: true,
						},
					},
				},
			});

			// Transform the tools data to include category and job role information
			const transformedTools = freeTools.map((tool) => ({
				...tool,
				categories: tool.categories.map((tc) => ({
					id: tc.category.id,
					name: tc.category.name,
				})),
				jobRoles: tool.jobRoles.map((jr) => ({
					jobRole: {
						id: jr.jobRole.id,
						name: jr.jobRole.name,
						slug: jr.jobRole.name.toLowerCase().split(' ').join('-'),
					},
				})),
			}));

			return res.status(200).json({ tools: transformedTools });
		} catch (error) {
			console.error('Error fetching free tools:', error);
			return res.status(500).json({ error: 'Failed to fetch free tools' });
		}
	}

	return res.status(405).json({ error: 'Method not allowed' });
}
