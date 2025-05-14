import prisma from '../../../lib/primsa';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === 'POST') {
		const {
			name,
			description,
			shortDescription,
			pros,
			cons,
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
			refundPolicy,
			contactSocial,
			contactEmail,
			contactPhone,
			contactPageUrl,
			metaTitle,
			metaDescription,
		} = JSON.parse(req.body);

		try {
			const toolData: {
				icon: string;
				thumbnail: string;
				name: string;
				slug: string;
				description: string;
				shortDescription: string;
				pros: string;
				cons: string;
				url: string;
				pricing: string;
				tags: string[];
				categories: { create: any[] };
				jobRoles?: { create: any[] };
				hasFreePrice?: boolean;
				hasPaidPrice?: boolean;
				paidPrice?: string;
				freeTierType?: string;
				pricingPlans?: { create: any[] };
				discounts?: string;
				refundPolicy?: string;
				contactSocial?: { create: any };
				contactEmail?: string;
				contactPhone?: string;
				contactPageUrl?: string;
				metaTitle?: string;
				metaDescription?: string;
			} = {
				icon: icon ?? '',
				thumbnail: thumbnail ?? '',
				name,
				slug: name.toLowerCase().split(' ').join('-'),
				description,
				shortDescription,
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
				...(hasFreePrice !== null && { hasFreePrice }),
				...(hasPaidPrice !== null && { hasPaidPrice }),
				...(paidPrice !== null && { paidPrice }),
				...(freeTierType !== null && { freeTierType }),
				...(pricingPlans &&
					pricingPlans.length > 0 && {
						pricingPlans: {
							create: pricingPlans.map((plan: any) => ({
								name: plan.name,
								price: plan.price,
								billingPeriod: plan.billingPeriod,
							})),
						},
					}),
				...(discounts !== null && { discounts }),
				...(refundPolicy !== null && { refundPolicy }),
				...(contactSocial !== null && {
					contactSocial: {
						create: {
							facebook: contactSocial.facebook || null,
							twitter: contactSocial.twitter || null,
							linkedin: contactSocial.linkedin || null,
							instagram: contactSocial.instagram || null,
							youtube: contactSocial.youtube || null,
						},
					},
				}),
				...(contactEmail !== null && { contactEmail }),
				...(contactPhone !== null && { contactPhone }),
				...(contactPageUrl !== null && { contactPageUrl }),
				metaTitle: metaTitle ?? null,
				metaDescription: metaDescription ?? null,
			};

			if (jobRoles && jobRoles.length > 0) {
				toolData.jobRoles = {
					create: jobRoles.map((role: { id: number; name: string }) => ({
						jobRole: {
							connect: {
								id: role.id,
							},
						},
					})),
				};
			}

			const newTool = await prisma.tool.create({
				data: toolData,
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

			return res.json(newTool);
		} catch (error) {
			console.error('Error creating tool:', error);
			return res.status(500).json({ error: 'Failed to create tool' });
		}
	} else if (req.method === 'GET') {
		try {
			const tools = await prisma.tool.findMany({
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
				},
			});

			const transformedTools = tools.map((tool: any) => ({
				...tool,
				categories: tool.categories.map((tc: any) => ({
					id: tc.category.id,
					name: tc.category.name,
				})),
				jobRoles: tool.jobRoles.map((jr: any) => ({
					id: jr.jobRole.id,
					name: jr.jobRole.name,
				})),
			}));

			return res.json(transformedTools);
		} catch (error) {
			console.error('Error fetching tools:', error);
			return res.status(500).json({ error: 'Failed to fetch tools' });
		}
	}

	return res.status(405).json({ error: 'Method not allowed' });
}
