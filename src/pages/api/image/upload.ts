import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export const config = {
	api: {
		bodyParser: false,
		responseLimit: false,
		externalResolver: true,
	},
	maxDuration: 30,
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === 'POST') {
		try {
			const uploadDir = process.env.IMAGE_UPLOAD_DIR as string; // External, writable directory

			if (!fs.existsSync(uploadDir)) {
				fs.mkdirSync(uploadDir, { recursive: true });
			}

			const originalFilename = req.query.filename as string;
			const fileExtension = path.extname(originalFilename);
			const uniqueFilename = `${crypto
				.randomBytes(16)
				.toString('hex')}${fileExtension}`;
			const filePath = path.join(uploadDir, uniqueFilename);

			const writeStream = fs.createWriteStream(filePath);
			await new Promise((resolve, reject) => {
				req.pipe(writeStream);
				req.on('end', resolve);
				req.on('error', reject);
				writeStream.on('error', reject);
			});

			return res.status(200).json({
				url: `${process.env.IMAGE_UPLOAD_ENDPOINT}/${uniqueFilename}`,
				pathname: filePath,
			});
		} catch (error) {
			console.error('Upload error:', error);
			return res.status(500).json({ message: 'Upload failed' });
		}
	} else {
		return res.status(405).json({ message: 'Method Not Allowed' });
	}
}
