import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/primsa';

// Define the structure of the news item and stories
type Story = {
	title: string;
	link: string;
	thumbnail: string;
	date: string;
	slugUrl: string;
};

type NewsItem = {
	title: string;
	url: string;
	icon: string;
	stories?: Story[];
};

// Utility function to normalize URLs for comparison
const normalizeUrl = (url: string): string => {
	try {
		const urlObj = new URL(url);
		// Remove common tracking parameters
		const paramsToRemove = [
			'utm_source',
			'utm_medium',
			'utm_campaign',
			'utm_content',
			'utm_term',
			'ref',
			'source',
		];
		paramsToRemove.forEach((param) => urlObj.searchParams.delete(param));

		// Remove trailing slash and fragments
		return urlObj.origin + urlObj.pathname.replace(/\/$/, '') + urlObj.search;
	} catch {
		return url.toLowerCase().trim();
	}
};

// Utility function to normalize titles for comparison
const normalizeTitle = (title: string): string => {
	return title
		.toLowerCase()
		.replace(/[^\w\s]/g, '') // Remove punctuation
		.replace(/\s+/g, ' ') // Normalize whitespace
		.trim();
};

// Enhanced duplicate check with similarity scoring
const calculateTitleSimilarity = (title1: string, title2: string): number => {
	const normalize = (str: string) =>
		str
			.toLowerCase()
			.replace(/[^\w\s]/g, '')
			.trim();
	const words1 = normalize(title1).split(/\s+/);
	const words2 = normalize(title2).split(/\s+/);

	const intersection = words1.filter((word) => words2.includes(word));
	const union = Array.from(new Set([...words1, ...words2]));

	return intersection.length / union.length;
};

const newsEndpoint = async (): Promise<NewsItem[]> => {
	const response = await fetch(
		`https://${process.env.SERP_API_ENDPOINT}?engine=google_news&topic_token=${process.env.SERP_API_TOPIC_TOKEN}&api_key=${process.env.SERP_API_KEY}`,
	);

	if (!response.ok) {
		throw new Error(`Failed to fetch news: ${response.statusText}`);
	}

	const data = await response.json();
	const newsResults = data.news_results;
	return newsResults as NewsItem[];
};

const rephraseTitle = async (title: string): Promise<string> => {
	const messagecontent = [
		{
			role: 'system',
			content:
				'You are a headline writer. Rephrase titles to be engaging while maintaining accuracy. Output only the clean title text without quotes, citations, or special characters.',
		},
		{
			role: 'user',
			content: `Rephrase this headline to be more engaging while keeping its core meaning: ${title}`,
		},
	];

	const response = await fetch(`https://api.perplexity.ai/chat/completions`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
		},
		body: JSON.stringify({
			model: 'sonar',
			messages: messagecontent,
		}),
	});

	if (!response.ok) {
		throw new Error(`Failed to generate description: ${response.statusText}`);
	}

	const data = await response.json();
	return data.choices[0].message.content;
};

const generateDescription = async (
	title: string,
	url: string,
): Promise<string> => {
	const messagecontent = [
		{
			role: 'system',
			content:
				'You are an AI news summarizer. Generate structured article summaries with clear key takeaways and paragraphs. Never include citations, quotes, or special characters. Use simple grammar and clear language.',
		},
		{
			role: 'user',
			content: `Analyze and summarize this AI news article:
  
  Title: ${title}
  URL: ${url}
  
  Format your response exactly like this:
  <div classname="news-para">
  <div class="keytakeaways">
  <h2>Key Takeaways</h2>
  <ul>
  <li>[First key takeaway]</li>
  <li>[Second key takeaway]</li>
  <li>[Third key takeaway]</li>
  </ul>
  </div>

  <div class="news-summary">
  <h2>Summary:</h2>
  
  <p>[First paragraph focusing on main points]</p>
  
  <p>[Second paragraph covering additional details]</p>
  
  <p>[Final paragraph with implications or conclusions]</p>
  </div>
  </div>
  Keep total length under 200 words. Use simple language and short sentences.`,
		},
	];

	const response = await fetch(`https://api.perplexity.ai/chat/completions`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
		},
		body: JSON.stringify({
			model: 'sonar',
			messages: messagecontent,
		}),
	});

	if (!response.ok) {
		throw new Error(`Failed to generate description: ${response.statusText}`);
	}

	const data = await response.json();
	return data.choices[0].message.content;
};

const formatTitle = (title: string): string => {
	return title
		.toLowerCase()
		.replace(/['"']/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.replace(/-+/g, '-');
};

async function generateAIImagePrompt(newsTitle: string): Promise<string> {
	const aiPrompts = [
		// `Futuristic digital visualization of Artificial Intelligence, representing: ${newsTitle}`,
		// `High-tech neural network illustration capturing the essence of: ${newsTitle}`,
		// `Cybernetic concept art depicting advanced AI technology: ${newsTitle}`,
		// `Stunning abstract representation of artificial intelligence and machine learning: ${newsTitle}`,
		// `Cutting-edge AI visualization with interconnected digital neural pathways: ${newsTitle}`,
		`A simple, modern illustration for our blog post: ${newsTitle}`,
		// `Cool animated background (i.e. changing colors) with text:${newsTitle}`,
	];

	return aiPrompts[Math.floor(Math.random() * aiPrompts.length)];
}

const generateImage = async (prompt: string) => {
	const res = await fetch('https://api.openai.com/v1/images/generations', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
		},
		body: JSON.stringify({
			model: 'dall-e-3',
			prompt,
			n: 1,
			size: '1792x1024',
		}),
	});

	const image = await res.json();

	const fetchImage = await fetch(image.data[0].url);
	const arrayBuffer = await fetchImage.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);
	return buffer;
};

const uploadImage = async (image: Buffer, cleanTitle: string) => {
	const sanitizedFilename =
		cleanTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.png';

	const encodedFilename = encodeURIComponent(sanitizedFilename);

	const fullUploadUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/image/upload?filename=${encodedFilename}`;

	const imageUploadResponse = await fetch(fullUploadUrl, {
		method: 'POST',
		body: image,
	});

	if (!imageUploadResponse.ok) {
		const errorText = await imageUploadResponse.text();
		console.error('Upload error:', errorText);
		throw new Error(`Image upload failed: ${errorText}`);
	}

	const uploadedImageData = await imageUploadResponse.json();
	return uploadedImageData.url;
};

// Enhanced function to check if a single news item is duplicate
const isNewsItemDuplicate = async (
	newsItem: any,
	processedInBatch: Set<string>,
) => {
	const normalizedUrl = normalizeUrl(newsItem.url);
	const normalizedTitle = normalizeTitle(newsItem.title);
	const slugUrl = newsItem.slugUrl;

	// Check against current batch first (faster)
	if (
		processedInBatch.has(normalizedUrl) ||
		processedInBatch.has(normalizedTitle) ||
		processedInBatch.has(slugUrl)
	) {
		return true;
	}

	// Check against database
	const existingNews = await prisma.news.findFirst({
		where: {
			OR: [{ slugUrl: slugUrl }, { url: newsItem.url }],
		},
		select: { id: true },
	});

	if (existingNews) {
		return true;
	}

	// Additional title similarity check (optional)
	const similarTitle = await prisma.news.findFirst({
		where: {
			title: {
				contains: normalizedTitle.split(' ').slice(0, 3).join(' '), // Check first 3 words
				mode: 'insensitive',
			},
		},
		select: { id: true, title: true },
	});

	if (similarTitle) {
		const similarity = calculateTitleSimilarity(
			newsItem.title,
			similarTitle.title,
		);
		if (similarity > 0.7) {
			return true;
		}
	}

	return false;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'GET') {
		try {
			const results = await newsEndpoint();
			const uniqueResults = [];
			const processedUrls = new Set<string>();
			const processedTitles = new Set<string>();
			const processedSlugs = new Set<string>();

			// Get target count from query parameter or default to 1
			const targetNewsCount = 1;
			let totalProcessed = 0;
			let duplicatesSkipped = 0;

			// Flatten all stories from all news items
			const allStories = [];
			for (const item of results) {
				if (item.stories) {
					allStories.push(...item.stories);
				}
			}

			console.log(`Found ${allStories.length} total stories to process`);

			// Process stories one by one until we get enough unique ones
			for (const story of allStories) {
				if (uniqueResults.length >= targetNewsCount) break;

				totalProcessed++;
				console.log(
					`Processing story ${totalProcessed}: ${story.title.substring(
						0,
						50,
					)}...`,
				);

				try {
					// STEP 1: Quick duplicate check BEFORE expensive API calls
					// Create preliminary newsItem with original title for duplicate checking
					const preliminarySlugUrl = formatTitle(story.title);

					const preliminaryNewsItem = {
						title: story.title, // Use original title for initial check
						url: story.link,
						slugUrl: preliminarySlugUrl,
					};

					// Check if this news item is a duplicate BEFORE API calls
					const isDuplicateBeforeProcessing = await isNewsItemDuplicate(
						preliminaryNewsItem,
						new Set([
							...Array.from(processedUrls),
							...Array.from(processedTitles),
							...Array.from(processedSlugs),
						]),
					);

					if (isDuplicateBeforeProcessing) {
						console.log(
							`Skipping duplicate BEFORE processing: ${story.title.substring(
								0,
								50,
							)}...`,
						);
						duplicatesSkipped++;
						continue; // Continue to next story WITHOUT making API calls
					}

					// STEP 2: Only if not duplicate, proceed with expensive API calls
					console.log(
						`Processing unique story: ${story.title.substring(0, 50)}...`,
					);

					const title = await rephraseTitle(story.title);
					const cleanTitle = formatTitle(title);
					const description = await generateDescription(
						story.title,
						story.link,
					);

					const prompt = await generateAIImagePrompt(cleanTitle);
					const image = await generateImage(prompt);

					const imageUrl = await uploadImage(image, cleanTitle);

					const finalNewsItem = {
						title: title,
						url: story.link,
						slugUrl: cleanTitle,
						icon: imageUrl || '/placeholder.jpeg',
						date: story.date,
						description,
					};

					// STEP 3: Double-check with final rephrased title (optional safety check)
					const isDuplicateAfterProcessing = await isNewsItemDuplicate(
						finalNewsItem,
						new Set([
							...Array.from(processedUrls),
							...Array.from(processedTitles),
							...Array.from(processedSlugs),
						]),
					);

					if (isDuplicateAfterProcessing) {
						console.log(
							`Skipping duplicate AFTER processing (rephrased title conflict): ${title.substring(
								0,
								50,
							)}...`,
						);
						duplicatesSkipped++;
						continue;
					}

					// Add to tracking sets
					processedUrls.add(normalizeUrl(finalNewsItem.url));
					processedTitles.add(normalizeTitle(finalNewsItem.title));
					processedSlugs.add(finalNewsItem.slugUrl);

					// Add to results
					uniqueResults.push(finalNewsItem);
					console.log(`Added unique news: ${title.substring(0, 50)}...`);
				} catch (error) {
					console.error(`Error processing story: ${story.title}`, error);
					continue; // Continue to next story on error
				}
			}

			// If we still don't have enough unique news
			if (uniqueResults.length === 0) {
				return res.status(200).json({
					message:
						'No new unique news found after processing all available stories',
					duplicatesSkipped,
					totalProcessed,
					availableStories: allStories.length,
					formattedResults: [],
					prismaRes: { count: 0 },
				});
			}

			// Save to database
			const prismaRes = await prisma.news.createMany({
				data: uniqueResults,
				skipDuplicates: true,
			});

			return res.status(200).json({
				formattedResults: uniqueResults,
				prismaRes,
				duplicatesSkipped,
				totalProcessed,
				availableStories: allStories.length,
				uniqueNewsFound: uniqueResults.length,
				message: `Successfully processed ${uniqueResults.length} unique news items`,
			});
		} catch (error: any) {
			console.error('Handler error:', error);
			return res
				.status(500)
				.json({ error: error.message || 'Internal Server Error' });
		}
	}

	return res.status(405).json({ error: 'Method not allowed' });
};

export default handler;
