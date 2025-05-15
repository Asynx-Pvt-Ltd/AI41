import { SignedIn, SignOutButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';

import { ReactNode } from 'react';

function DashboardLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex flex-col min-h-screen bg-white">
			{/* Top Navigation Bar */}
			<header className="bg-[#2c2c2c] text-white py-3 px-6 flex justify-between items-center shadow-md">
				<div className="flex items-center">
					<h1 className="text-xl font-semibold">AI Dashboard</h1>
				</div>
				<div className="flex items-center gap-4">
					<SignedIn>
						<SignOutButton>
							<button className="px-3 py-1 text-sm border border-white/30 rounded hover:bg-white/10 transition">
								Sign Out
							</button>
						</SignOutButton>
						<UserButton afterSignOutUrl="/" />
					</SignedIn>
				</div>
			</header>

			<div className="flex flex-1">
				{/* Sidebar */}
				<aside className="w-64 bg-[#2c2c2c] text-white">
					<nav className="py-6 px-3">
						<ul className="space-y-1">
							{[
								{ href: '/dashboard/feature-tools', label: 'Feature Tools' },
								{ href: '/dashboard/categories', label: 'Categories' },
								{ href: '/dashboard/tools', label: 'Tools' },
								{ href: '/dashboard/tutorials', label: 'Tutorials' },
								{ href: '/dashboard/news', label: 'AI News' },
								{ href: '/dashboard/job-roles', label: 'Job Roles' },
							].map((item) => (
								<li key={item.href}>
									<Link
										href={item.href}
										className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-white/10 transition-colors"
									>
										<span>{item.label}</span>
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</aside>

				{/* Main Content */}
				<main className="flex-1 bg-white p-8">
					<div className="max-w-7xl mx-auto">{children}</div>
				</main>
			</div>
		</div>
	);
}

export default DashboardLayout;
