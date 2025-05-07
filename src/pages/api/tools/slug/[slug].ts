import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { slug } = req.query;

	if (req.method === 'GET') {
		if (slug && typeof slug === 'string') {
			try {
				const tool = await prisma.tool.findFirst({
					where: { slug: slug },
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

				if (!tool) {
					return res.status(404).json({ message: 'Tool not found' });
				}

				// Transform the tool data to include category information
				const toolWithCategories = {
					...tool,
					categories: tool.categories.map((tc) => ({
						id: tc.category.id,
						name: tc.category.name,
					})),
				};

				// Find alternatives based on shared categories
				const categoryIds = tool.categories.map((tc) => tc.category.id);
				const alternatives = await prisma.tool.findMany({
					where: {
						categories: {
							some: {
								categoryId: {
									in: categoryIds,
								},
							},
						},
						NOT: {
							id: tool.id,
						},
					},
					include: {
						categories: {
							include: {
								category: true,
							},
						},
					},
				});

				return res.status(200).json({
					tool: toolWithCategories,
					alternatives: alternatives.map((alt) => ({
						...alt,
						categories: alt.categories.map((tc) => ({
							id: tc.category.id,
							name: tc.category.name,
						})),
					})),
				});
			} catch (error) {
				console.error('Error fetching tool by slug:', error);
				return res.status(500).json({ error: 'Failed to fetch tool' });
			}
		} else {
			return res.status(400).json({ message: 'Invalid Request' });
		}
	}
	return res.status(404).json({ message: 'Not Found' });
}
