'use client';
import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';

import Footer from '../components/Footer';
import Link from 'next/link';

import JobsContent from '@/app/components/JobsContent';
import SEO from '../components/SEO';
export default function Page() {
	const [categories, setcategories] = useState<any>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		fetch('/api/job-roles')
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
				title="AI Tools Recommended for Your Job Position | AI41"
				description="Explore AI tools by job role and boost your productivity. Get expert recommendations for your profession on AI41."
			/>
			<Header />
			<main className="flex-grow bg-white dark:bg-gray-800 w-full lg:pt-10 lg:pl-6 lg:pr-6 lg:pb-6 my-3 pt-8">
				<div className="flex-col items-center justify-center">
					<h1 className="text-3xl font-bold text-center mb-2">AI Jobs</h1>
					<p className="text-sm mx-[6vw] text-left py-2 link_design">
						Do you ever get the feeling that AI is speeding away, leaving you
						behind? Unfortunately, many people worry that AI is here to replace
						jobs.Well, let’s be realistic. AI is not going to replace everyone.
						It’s coming to take out only those who aren’t adaptive. In fact,
						many don't even notice the flip side. If you are smart enough to
						make use of the <Link href={'/'}>AI tools</Link> to increase your
						productivity, you can stay ahead actually. That's exactly why we
						created this page. Just tell us what you do, and we'll hook you up
						with the best AI tools for your usage.
					</p>
				</div>
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
												href={`/job/${item.slug}`}
												key={index}
												className="bg-white shadow-md rounded-lg px-6 py-4 flex items-center justify-between lg:min-w-60 lg:h-12"
											>
												<h3 className="text-lg font-semibold ml-4">
													<i className={item.fontIcon}></i>{' '}
													{item.name ? item.name : 'General'}
												</h3>
												<span className="text-gray-500 text-sm">
													{item.tools.length}
												</span>
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
			<div className="bg-gray-50 dark:bg-gray-900">
				<JobsContent />
			</div>
			<Footer />
		</div>
	);
}
