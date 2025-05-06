'use client';
import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';

function Footer() {
	const currentYear = new Date().getFullYear();
	const [latestTools, setLatestTools] = useState([]);
	useEffect(() => {
		const fetchLatestTools = async () => {
			const response = await fetch('/api/tools');
			const data = await response.json();
			const latestTools = data.slice(0, 5).map((tool: any) => ({
				name: tool.name,
				url: `/tool/${tool.slug}`,
			}));
			setLatestTools(latestTools);
		};
		fetchLatestTools();
	}, []);

	return (
		<footer className="w-full bg-[#222222] text-white py-12 pb-6 font-sans">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{/* Column 1: AI41 */}
					<div className="space-y-4">
						<h3 className="text-xl font-bold mb-4">AI41</h3>
						<p className="text-gray-300 text-sm">
							Effortlessly discover top AI tools on AI41. Sorted by category,
							role, pricing, and real user reviews.
						</p>
					</div>

					{/* Column 2: Latest Tools */}
					<div className="space-y-4">
						<h3 className="text-xl font-bold mb-4">Latest Tools</h3>
						<ul className="space-y-2">
							{latestTools.map((tool: any, index: any) => (
								<li key={index}>
									<Link
										href={tool.url}
										className="text-gray-300 hover:text-white text-sm"
									>
										{tool.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Column 3: Resources */}
					<div className="space-y-4">
						<h3 className="text-xl font-bold mb-4">Resources</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/all-ai-tools"
									className="text-gray-300 hover:text-white text-sm"
								>
									All AI Tools
								</Link>
							</li>
							<li>
								<Link
									href="/ai-news"
									className="text-gray-300 hover:text-white text-sm"
								>
									AI News
								</Link>
							</li>
							<li>
								<Link
									href="/ai-tutorials"
									className="text-gray-300 hover:text-white text-sm"
								>
									AI Tutorials
								</Link>
							</li>
							<li>
								<Link
									href="/ai-categories"
									className="text-gray-300 hover:text-white text-sm"
								>
									AI Categories
								</Link>
							</li>
							<li>
								<Link
									href="/job"
									className="text-gray-300 hover:text-white text-sm"
								>
									Jobs
								</Link>
							</li>
						</ul>
					</div>

					{/* Column 4: Useful Links */}
					<div className="space-y-4">
						<h3 className="text-xl font-bold mb-4">Useful Links</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/about"
									className="text-gray-300 hover:text-white text-sm"
								>
									About
								</Link>
							</li>
							<li>
								<Link
									href="/contact"
									className="text-gray-300 hover:text-white text-sm"
								>
									Contact
								</Link>
							</li>
							<li>
								<Link
									href="/privacy-policy"
									className="text-gray-300 hover:text-white text-sm"
								>
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link
									href="/terms"
									className="text-gray-300 hover:text-white text-sm"
								>
									Terms
								</Link>
							</li>
							<li>
								<Link
									href="/submit-ai"
									className="text-gray-300 hover:text-white text-sm"
								>
									Submit AI Tool
								</Link>
							</li>
						</ul>
					</div>
				</div>

				{/* Copyright */}
				<div className="border-t border-gray-800 mt-8 pt-6 text-center">
					<p className="text-gray-400 text-sm">
						© {currentYear} AI41. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
