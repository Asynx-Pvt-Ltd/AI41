import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();
const uploadDir = process.env.IMAGE_UPLOAD_DIR as string;

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
		const { title, icon, url, tags } = req.body;

		const existingTutorial = await prisma.tutorial.findUnique({
			where: { id: Number(id) },
		});

		if (
			icon !== '' &&
			icon !== undefined &&
			icon !== null &&
			existingTutorial?.icon
		) {
			safeDeleteFile(
				path.join(uploadDir, path.basename(existingTutorial.icon as string)),
			);
		}

		const updatedTool = await prisma.tutorial.update({
			where: { id: Number(id) },
			data: {
				icon: icon ?? existingTutorial?.icon,
				title: title,
				url: url,
				tags: tags,
			},
		});
		return res.status(200).json(updatedTool);
	}

	if (req.method === 'DELETE') {
		const existingTool = await prisma.tutorial.findUnique({
			where: {
				id: Number(id),
			},
		});

		if (existingTool?.icon) {
			safeDeleteFile(
				path.join(uploadDir, path.basename(existingTool.icon as string)),
			);
		}

		await prisma.tutorial.delete({
			where: { id: Number(id) },
		});

		const tutorials = await prisma.tutorial.findMany();
		return res.status(200).json(tutorials);
	}

	if (req.method === 'GET') {
		const tool = await prisma.tutorial.findUnique({
			where: { id: Number(id) },
		});
		return res.status(200).json(tool);
	}
	return res.status(404).json({ message: 'Not Found' });
}
