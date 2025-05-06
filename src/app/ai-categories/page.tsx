'use client';
import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Player } from '@lordicon/react';
import Footer from '../components/Footer';
import Link from 'next/link';
import SEO from '../components/SEO';

export default function Page() {
	const [categories, setcategories] = useState<any>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		fetch('/api/categories')
			.then((res) => res.json())
			.then((d) => {
				setLoading(false);
				setcategories(d);
			})
			.catch((err) => {
				console.log('====================================');
				console.log('err --->', err);
				console.log('====================================');
			});
	}, []);

	return (
		<div className="flex flex-col min-h-screen">
			<SEO
				title="Explore AI Categories by Use Case & Industry | AI41"
				description="Browse AI categories tailored to your needs. From chatbots to image generation, find top tools for every industry on AI41. Start exploring now, for free!"
			/>
			<Header />
			<main className="flex-grow bg-white dark:bg-gray-800 w-full pt-10 pl-6 pr-6 pb-6 text-center">
				<h1 className="text-3xl font-bold text-center mb-4">AI Categories</h1>
				{loading === false ? (
					<div className="container mx-auto px-4 py-8">
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
							{categories.length > 0
								? categories.map((item: any, index: number) => (
										<lord-icon
											src={`https://cdn.lordicon.com/${item.fontIcon}.json`}
											trigger="hover"
											style={{
												width: '25' + 'px',
												height: '25' + 'px',
												padding: '10px',
											}}
										>
											<Link
												href={`/ai-categories/${item.slug}`}
												key={index}
												className="bg-white shadow-md rounded-lg px-6 py-4 flex items-center justify-between min-w-80 h-12 lg:min-w-60 lg:h-12"
											>
												<h3 className="text-lg font-semibold lg:ml-4">
													{item.name ? item.name : 'General'}
												</h3>{' '}
												<span className="text-gray-500 text-sm">
													{item.tools.length}
												</span>{' '}
											</Link>
										</lord-icon>
								  ))
								: null}
						</div>
					</div>
				) : (
					<div className="flex flex-row justify-center items-center">
						<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black dark:border-white"></div>
					</div>
				)}
			</main>
			<Footer />
		</div>
	);
}
