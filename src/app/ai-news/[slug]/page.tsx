'use client';
import { NextPage } from 'next';
import { Header } from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import Link from 'next/link';
import DOMPurify from 'isomorphic-dompurify';

interface NewsItem {
	id: number;
	icon: string;
	title: string;
	url: string;
	date: string;
	slugUrl: string;
	description: string;
}

interface Props {
	params: {
		slug: string;
	};
}
interface Keyword {
	id: number;
	keyword: string;
	keywordUrl: string;
}

interface KeywordProcessorProps {
	htmlContent: string;
}

const KeywordProcessor: React.FC<KeywordProcessorProps> = ({ htmlContent }) => {
	const [keywords, setKeywords] = useState<Keyword[]>([]);
	const [processedContent, setProcessedContent] = useState<string>(htmlContent);

	useEffect(() => {
		const fetchKeywords = async () => {
			try {
				const response = await fetch('/api/getNewsKeyword');
				if (!response.ok) throw new Error('Failed to fetch keywords');
				const data: Keyword[] = await response.json();
				setKeywords(data);
				processHtmlWithKeywords(data);
			} catch (error) {
				console.error('Error fetching keywords:', error);
			}
		};

		fetchKeywords();
	}, [htmlContent]);

	const processHtmlWithKeywords = (keywordList: Keyword[]) => {
		const tempDiv = document.createElement('div');
		tempDiv.innerHTML = DOMPurify.sanitize(htmlContent);

		const processNode = (node: ChildNode) => {
			if (node.nodeType === Node.TEXT_NODE) {
				const content = node.textContent || '';
				let lastIndex = 0;
				const fragments: string[] = [];

				const sortedKeywords = [...keywordList].sort(
					(a, b) => b.keyword.length - a.keyword.length,
				);

				for (const keywordObj of sortedKeywords) {
					const regex = new RegExp(`\\b${keywordObj.keyword}\\b`, 'gi');
					let match;

					while ((match = regex.exec(content)) !== null) {
						if (match.index > lastIndex) {
							fragments.push(content.substring(lastIndex, match.index));
						}

						fragments.push(
							`<a href="${keywordObj.keywordUrl}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">${match[0]}</a>`,
						);

						lastIndex = regex.lastIndex;
					}
				}

				if (lastIndex < content.length) {
					fragments.push(content.substring(lastIndex));
				}

				if (fragments.length > 0) {
					const span = document.createElement('span');
					span.innerHTML = fragments.join('');
					node.parentNode?.replaceChild(span, node);
				}
			} else if (node.nodeType === Node.ELEMENT_NODE) {
				if ((node as HTMLElement).tagName.toLowerCase() !== 'a') {
					Array.from(node.childNodes).forEach(processNode);
				}
			}
		};

		Array.from(tempDiv.childNodes).forEach(processNode);
		setProcessedContent(tempDiv.innerHTML);
	};

	return (
		<div
			className="prose dark:prose-invert prose-lg max-w-none text-gray-800 dark:text-gray-200"
			dangerouslySetInnerHTML={{ __html: processedContent }}
		/>
	);
};

const RelatedNews = ({ currentNewsId }: { currentNewsId: number }) => {
	const [relatedNews, setRelatedNews] = useState<NewsItem[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchRelatedNews = async () => {
			try {
				const response = await fetch('/api/news', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				});

				if (!response.ok) {
					throw new Error('Failed to fetch related news');
				}

				const data = await response.json();
				const filteredNews = data
					.filter((news: NewsItem) => news.id !== currentNewsId)
					.slice(-6);
				setRelatedNews(filteredNews);
				setLoading(false);
			} catch (error) {
				console.error('Error fetching related news:', error);
				setLoading(false);
			}
		};

		fetchRelatedNews();
	}, []);

	if (loading) return null;

	return (
		<section className="container mx-auto px-4 py-5 max-w-7xl">
			<h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
				More AI News
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{relatedNews.map((news) => (
					<Link
						href={'/ai-news/' + encodeURIComponent(news.slugUrl)}
						key={news.id}
						className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
					>
						<div className="relative h-48 w-full">
							<Image
								src={news.icon || '/ai-tools-directory.webp'}
								alt={news.title}
								layout="fill"
								objectFit="cover"
								className="transition-transform duration-300 hover:scale-105"
							/>
						</div>
						<div className="p-4">
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2">
								{news.title}
							</h3>
							{/* <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
								<div
									className="prose dark:prose-invert prose-lg max-w-none text-gray-800 dark:text-gray-200"
									dangerouslySetInnerHTML={{ __html: news.description }}
								/>
							</p> */}
							<div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
								{format(new Date(news.date), 'MMMM d, yyyy')}
							</div>
						</div>
					</Link>
				))}
			</div>
		</section>
	);
};

const Page: NextPage<Props> = ({ params }) => {
	const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchSingleNews = async () => {
			try {
				const response = await fetch('/api/fetchSingleNews', {
					method: 'POST',
					body: JSON.stringify({
						slug: decodeURIComponent(params.slug),
					}),
					headers: {
						'Content-Type': 'application/json',
					},
				});

				if (!response.ok) {
					throw new Error('Failed to fetch news item');
				}

				const data = await response.json();
				setNewsItem(data);
				setLoading(false);
			} catch (err) {
				setError(
					err instanceof Error ? err.message : 'An unknown error occurred',
				);
				setLoading(false);
			}
		};

		fetchSingleNews();
	}, [params.slug]);

	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex justify-center items-center min-h-screen text-red-500">
				{error}
			</div>
		);
	}

	if (!newsItem) {
		return null;
	}

	const formattedDate = format(
		new Date(newsItem.date),
		"MMMM d, yyyy 'at' h:mm a",
	);

	return (
		<div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
			<Header />
			<main className="flex-grow container mx-auto px-4 py-10 max-w-4xl">
				<article className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
					<div className="relative h-[400px] w-full">
						<Image
							src={newsItem.icon || '/ai-tools-directory.webp'}
							alt={newsItem.title}
							layout="fill"
							objectFit="cover"
							className="transition-transform duration-300 hover:scale-105"
						/>
					</div>

					<div className="p-6 md:p-10">
						<header className="mb-6">
							<h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
								{newsItem.title}
							</h1>

							<div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
								<span className="text-sm">{formattedDate}</span>
								<Link
									href={newsItem.url}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-500 hover:underline"
								>
									Original Source
								</Link>
							</div>
						</header>

						<div className="prose dark:prose-invert prose-lg max-w-none text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
							{/* <KeywordProcessor htmlContent={newsItem.description} /> */}
							<div
								className="prose dark:prose-invert prose-lg max-w-none text-gray-800 dark:text-gray-200"
								dangerouslySetInnerHTML={{ __html: newsItem.description }}
							/>
						</div>
					</div>
				</article>
			</main>
			<RelatedNews currentNewsId={newsItem.id} />
			<Footer />
		</div>
	);
};

export default Page;
