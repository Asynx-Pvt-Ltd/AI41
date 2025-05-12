'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { Header } from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export default function FreeTools() {
	const [tools, setTools] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Fetch free tools from the API
		fetch('/api/tools/free')
			.then((res) => res.json())
			.then((data) => {
				setTools(data.tools);
				setLoading(false);
			})
			.catch((err) => {
				console.error('Error fetching free tools:', err);
				setLoading(false);
			});
	}, []);

	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="flex-grow bg-white dark:bg-gray-800 w-full py-10 px-6 pb-20">
				<div className="max-w-7xl mx-auto">
					<h1 className="text-3xl font-bold text-center mb-4">Free AI Tools</h1>
					<p className="text-center text-gray-600 mb-10">
						Discover powerful AI tools that are completely free to use
					</p>

					{loading ? (
						<div className="flex justify-center items-center py-20">
							<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black dark:border-white"></div>
						</div>
					) : tools.length > 0 ? (
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
							{tools.map((tool, idx) => (
								<div
									key={idx}
									className="rounded-lg overflow-hidden bg-white border border-slate-200 shadow-md hover:shadow-lg transition-shadow duration-300"
								>
									<div className="relative h-40 w-full overflow-hidden">
										<Image
											src={tool.thumbnail || '/placeholder.jpeg'}
											alt={tool.name}
											fill
											className="object-cover object-top"
										/>
									</div>

									<div className="p-4">
										<div className="flex items-center mb-3">
											<Image
												src={tool.icon || '/placeholder.jpeg'}
												alt={tool.name}
												width={24}
												height={24}
												className="w-6 h-6 mr-2"
											/>
											<h2 className="font-bold text-lg">{tool.name}</h2>
										</div>

										<p
											className="text-sm text-gray-600 mb-4 line-clamp-3"
											dangerouslySetInnerHTML={{
												__html: tool.shortDescription,
											}}
										/>

										<div className="flex flex-wrap gap-2 mb-4">
											{tool.categories &&
												tool.categories
													.slice(0, 2)
													.map((cat: any, i: number) => (
														<Link
															key={i}
															href={`/ai-categories/${cat.name
																.replaceAll(' ', '-')
																.toLowerCase()}`}
															className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs hover:bg-blue-700 transition-all"
														>
															{cat.name}
														</Link>
													))}
											<span className="px-2 py-1 bg-green-200 text-green-800 rounded-full text-xs">
												Free
											</span>
										</div>

										{tool.jobRoles && tool.jobRoles.length > 0 && (
											<div className="flex flex-wrap gap-1 mb-4">
												<span className="text-gray-700 text-xs">Best For:</span>
												{tool.jobRoles
													.slice(0, 1)
													.map((role: any, i: number) => (
														<Link
															key={i}
															href={`/job/${
																role.jobRole.slug ||
																role.jobRole.name
																	.toLowerCase()
																	.replaceAll(' ', '-')
															}`}
															className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs hover:bg-green-200 transition-colors"
														>
															{role.jobRole.name}
														</Link>
													))}
												{tool.jobRoles.length > 1 && (
													<span className="px-2 py-1 text-gray-600 text-xs">
														+{tool.jobRoles.length - 1} more
													</span>
												)}
											</div>
										)}

										<div className="flex justify-between items-center">
											<Link
												href={`/tool/${tool.slug}`}
												className="text-black hover:underline text-sm"
											>
												View Details
											</Link>

											<a
												href={tool.url}
												target="_blank"
												rel="noopener noreferrer"
												className="flex items-center gap-1 bg-black text-white px-3 py-1 rounded-md hover:bg-gray-800 transition-colors text-sm"
											>
												Visit <FaExternalLinkAlt size={10} />
											</a>
										</div>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="text-center py-20">
							<p className="text-xl text-gray-600">No free tools found</p>
							<p className="text-gray-500 mt-2">
								Check back later for more free AI tools!
							</p>
						</div>
					)}
				</div>
			</main>
			<Footer />
		</div>
	);
}
