import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { m } from 'framer-motion';

const prisma = new PrismaClient();
const uploadDir = process.env.IMAGE_UPLOAD_DIR as string;

// Helper function to safely delete a file
const safeDeleteFile = (filePath: string) => {
	try {
		if (fs.existsSync(filePath)) {
			fs.unlinkSync(filePath);
		}
	} catch (error) {
		console.error(`Failed to delete file ${filePath}:`, error);
	}
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { id } = req.query;
	if (req.method === 'PUT') {
		try {
			const {
				name,
				description,
				shortDescription,
				pros,
				cons,
				faqs,
				url,
				pricing,
				categories,
				icon,
				thumbnail,
				tags,
				jobRoles,
				hasFreePrice,
				hasPaidPrice,
				paidPrice,
				freeTierType,
				pricingPlans,
				discounts,
				discountCoupon,
				refundPolicy,
				contactSocial,
				contactEmail,
				contactPhone,
				contactPageUrl,
				pricingUrl,
				metaTitle,
				metaDescription,
			} = JSON.parse(req.body);
			const existingTool = await prisma.tool.findUnique({
				where: { id: Number(id) },
				include: {
					jobRoles: true,
					contactSocial: true, // Include contactSocial to check if it exists
				},
			});

			if (!existingTool) {
				return res.status(404).json({ error: 'Tool not found' });
			}

			// Delete old images if new ones are provided
			if (icon && existingTool.icon) {
				safeDeleteFile(path.join(uploadDir, path.basename(existingTool.icon)));
			}
			if (thumbnail && existingTool.thumbnail) {
				safeDeleteFile(
					path.join(uploadDir, path.basename(existingTool.thumbnail)),
				);
			}

			// Delete existing category relationships
			await prisma.toolsOnCategories.deleteMany({
				where: {
					toolId: Number(id),
				},
			});

			// Delete existing job role relationships if jobRoles is provided
			if (jobRoles !== undefined) {
				await prisma.toolsOnJobRoles.deleteMany({
					where: {
						toolId: Number(id),
					},
				});
			}
			// Delete existing FAQs
			await prisma.fAQ.deleteMany({
				where: {
					toolId: Number(id),
				},
			});
			// Prepare the update data
			const updateData: any = {
				icon: icon || existingTool.icon || '',
				thumbnail: thumbnail || existingTool.thumbnail || '',
				name,
				slug: name.toLowerCase().split(' ').join('-'),
				shortDescription,
				description,
				pros,
				cons,
				url,
				pricing,
				tags,
				categories: {
					create: categories.map((cat: { id: number; name: string }) => ({
						category: {
							connect: {
								id: cat.id,
							},
						},
					})),
				},
				...(hasFreePrice !== undefined && { hasFreePrice }),
				...(hasPaidPrice !== undefined && { hasPaidPrice }),
				...(paidPrice !== undefined && { paidPrice }),
				...(freeTierType !== null && { freeTierType }),
				...(pricingUrl !== null && { pricingUrl }),
				...(discounts !== null && { discounts }),
				...(discountCoupon !== null && { discountCoupon }),
				...(refundPolicy !== null && { refundPolicy }),
				...(contactEmail !== null && { contactEmail }),
				...(contactPhone !== null && { contactPhone }),
				...(contactPageUrl !== null && { contactPageUrl }),

				metaTitle: metaTitle || null,
				metaDescription: metaDescription || null,
			};

			// Handle pricing plans
			if (pricingPlans) {
				// Delete existing pricing plans
				await prisma.pricingPlan.deleteMany({
					where: {
						toolId: Number(id),
					},
				});

				// Create new pricing plans
				updateData.pricingPlans = {
					create: pricingPlans.map((plan: any) => ({
						name: plan.name,
						price: plan.price,
						billingPeriod: plan.billingPeriod,
					})),
				};
			}
			// Handle contactSocial relation properly
			if (contactSocial !== null) {
				if (existingTool.contactSocial) {
					// Update existing ContactSocial record
					updateData.contactSocial = {
						update: {
							facebook: contactSocial.facebook || null,
							twitter: contactSocial.twitter || null,
							linkedin: contactSocial.linkedin || null,
							instagram: contactSocial.instagram || null,
							youtube: contactSocial.youtube || null,
						},
					};
				} else {
					// Create new ContactSocial record
					updateData.contactSocial = {
						create: {
							facebook: contactSocial.facebook || null,
							twitter: contactSocial.twitter || null,
							linkedin: contactSocial.linkedin || null,
							instagram: contactSocial.instagram || null,
							youtube: contactSocial.youtube || null,
						},
					};
				}
			}

			// Only include jobRoles in update if it's provided
			if (jobRoles !== undefined) {
				updateData.jobRoles = {
					create:
						jobRoles.length > 0
							? jobRoles.map((role: { id: number; name: string }) => ({
									jobRole: {
										connect: {
											id: role.id,
										},
									},
							  }))
							: [],
				};
			}
			// Handle FAQs
			if (faqs) {
				updateData.faqs = {
					create: faqs.map((faq: any, index: number) => ({
						question: faq.question,
						answer: faq.answer,
						order: faq.order || index,
					})),
				};
			}

			// Update tool with new data
			const updatedTool = await prisma.tool.update({
				where: { id: Number(id) },
				data: updateData,
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
					contactSocial: true, // Include contactSocial in the response
					faqs: {
						orderBy: {
							order: 'asc',
						},
					},
				},
			});

			// Transform the response to match the expected format
			const transformedTool = {
				...updatedTool,
				categories: updatedTool.categories.map((tc) => ({
					id: tc.category.id,
					name: tc.category.name,
				})),
				jobRoles:
					updatedTool.jobRoles?.map((jr) => ({
						id: jr.jobRole.id,
						name: jr.jobRole.name,
					})) || [],
			};

			return res.status(200).json(transformedTool);
		} catch (error) {
			console.error('Error updating tool:', error);
			return res.status(500).json({ error: 'Failed to update tool' });
		}
	}

	if (req.method === 'DELETE') {
		try {
			const existingTool = await prisma.tool.findUnique({
				where: {
					id: Number(id),
				},
			});

			// Delete associated images
			if (existingTool?.icon) {
				safeDeleteFile(
					path.join(uploadDir, path.basename(existingTool.icon as string)),
				);
			}

			if (existingTool?.thumbnail) {
				safeDeleteFile(
					path.join(uploadDir, path.basename(existingTool.thumbnail as string)),
				);
			}

			// Delete the tool (cascading delete will handle category relationships)
			await prisma.tool.delete({
				where: { id: Number(id) },
			});

			const tools = await prisma.tool.findMany({
				include: {
					categories: {
						include: {
							category: true,
						},
					},
				},
			});
			return res.status(200).json(tools);
		} catch (error) {
			console.error('Error deleting tool:', error);
			return res.status(500).json({ error: 'Failed to delete tool' });
		}
	}

	if (req.method === 'GET') {
		try {
			const tool = await prisma.tool.findUnique({
				where: { id: Number(id) },
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
					contactSocial: true,
					pricingPlans: true,
					faqs: {
						orderBy: {
							order: 'asc',
						},
					},
				},
			});
			return res.status(200).json(tool);
		} catch (error) {
			console.error('Error fetching tool:', error);
			return res.status(500).json({ error: 'Failed to fetch tool' });
		}
	}
	return res.status(404).json({ message: 'Not Found' });
}
