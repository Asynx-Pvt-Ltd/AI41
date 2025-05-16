'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import '../styles/style.css';
import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
} from '@nextui-org/react';

export const Header = () => {
	const [darkMode, setDarkMode] = useState(false);
	const [menuDisplay, setMenuDisplay] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const toggleDarkMode = () => {
		setDarkMode(!darkMode);
	};

	const toggleMobileMenu = () => {
		setMobileMenuOpen(!mobileMenuOpen);
	};

	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, [darkMode]);

	// Disable body scroll when mobile menu is open
	useEffect(() => {
		if (mobileMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}

		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [mobileMenuOpen]);

	// Navigation items with their respective lord-icon sources
	const navItems = [
		{
			href: '/all-ai-tools',
			text: 'Full List',
			iconSrc: 'https://cdn.lordicon.com/rvdhgcpo.json',
		},
		{
			href: '/ai-categories',
			text: 'AI Categories',
			iconSrc: 'https://cdn.lordicon.com/iwlihxdl.json',
		},
		{
			href: '/job',
			text: 'AI Jobs',
			iconSrc: 'https://cdn.lordicon.com/mqqsmsvs.json',
		},
		{
			href: '/ai-tutorials',
			text: 'AI Tutorials',
			iconSrc: 'https://cdn.lordicon.com/rfoqztsr.json',
		},
		{
			href: '/ai-news',
			text: 'AI News',
			iconSrc: 'https://cdn.lordicon.com/ejurburo.json',
		},
	];

	// More menu items
	const moreMenuItems = [
		{
			href: '/about',
			text: 'About Us',
			iconSrc: 'https://cdn.lordicon.com/ziflyeyv.json',
		},
		{
			href: '/contact',
			text: 'Contact Us',
			iconSrc: 'https://cdn.lordicon.com/ctsunjjx.json',
		},
		{
			href: '/submit-ai',
			text: 'Submit AI',
			iconSrc: 'https://cdn.lordicon.com/utrckbca.json',
		},
	];

	return (
		<header
			id="header"
			className="site-header dark:bg-gray-800 w-full bg-[#222222] shadow-md"
		>
			<div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-8">
				{/* Left: Logo/Image */}
				<Link href="/" className="flex items-center cursor-pointer z-20">
					<span className="text-xl md:text-2xl font-bold text-white dark:text-gray-300 hover:text-gray-200 transition duration-300">
						AI41
					</span>
				</Link>

				{/* Mobile Menu Button */}
				<button
					onClick={toggleMobileMenu}
					className="md:hidden flex items-center z-20"
					aria-label="Toggle mobile menu"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						className="w-6 h-6 text-white"
					>
						{mobileMenuOpen ? (
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						) : (
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 6h16M4 12h16M4 18h16"
							/>
						)}
					</svg>
				</button>

				{/* Desktop Navigation */}
				<nav className="hidden md:flex justify-around space-x-6">
					{navItems.map((item, index) => (
						<Link
							key={index}
							href={item.href}
							className="flex items-center justify-between group"
						>
							<div className="flex items-start space-x-2 group">
								<span className="site-icon">
									<lord-icon
										src={item.iconSrc}
										trigger="hover"
										target=".group"
										colors="primary:#ffffff"
										style={{
											width: '25px',
											height: '25px',
										}}
									/>
								</span>
								<span className="text-lg text-white dark:text-gray-300 group-hover:text-blue-400 transition duration-200 site-title">
									{item.text}
								</span>
							</div>
						</Link>
					))}

					<Dropdown
						isOpen={menuDisplay}
						onMouseLeave={() => setMenuDisplay(false)}
						className="bg-[#222222]"
					>
						<DropdownTrigger>
							<div
								className="flex space-x-2 cursor-pointer"
								onMouseEnter={() => setMenuDisplay(true)}
								onClick={() => setMenuDisplay(!menuDisplay)}
							>
								<lord-icon
									src="https://cdn.lordicon.com/zhgkkdks.json"
									target=".group"
									trigger="hover"
									colors="primary:#ffffff;"
									style={{
										width: '25px',
										height: '25px',
									}}
								/>
								<span className="text-lg text-white dark:text-gray-300 hover:text-blue-400 transition duration-200">
									More
								</span>
							</div>
						</DropdownTrigger>

						<DropdownMenu
							className="bg-[#222222]"
							aria-label="More Menu"
							itemClasses={{
								base: [
									'data-[hover=true]:text-foreground',
									'dark:data-[hover=true]:bg-gray-500',
								],
							}}
						>
							{moreMenuItems.map((item, index) => (
								<DropdownItem
									key={index}
									className="bg-[#222222] hover:bg-gray-600"
								>
									<Link
										href={item.href}
										className="flex items-center space-x-2 px-4 py-2 text-lg text-white dark:text-gray-300 hover:text-blue-400 transition duration-200"
									>
										<lord-icon
											src={item.iconSrc}
											target=".group"
											trigger="hover"
											colors="primary:#ffffff;"
											style={{
												width: '25px',
												height: '25px',
											}}
										/>
										<span>{item.text}</span>
									</Link>
								</DropdownItem>
							))}
						</DropdownMenu>
					</Dropdown>
				</nav>

				{/* Mobile Navigation */}
				<div
					className={`fixed inset-0 bg-[#222222] z-10 flex flex-col pt-20 px-6 md:hidden transform transition-transform duration-300 ease-in-out ${
						mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
					}`}
				>
					<div className="flex flex-col space-y-6">
						{navItems.map((item, index) => (
							<Link
								key={index}
								href={item.href}
								className="flex items-center space-x-3 py-2 border-b border-gray-700"
								onClick={() => setMobileMenuOpen(false)}
							>
								<lord-icon
									src={item.iconSrc}
									colors="primary:#ffffff"
									style={{
										width: '25px',
										height: '25px',
									}}
								/>
								<span className="text-lg text-white">{item.text}</span>
							</Link>
						))}

						<div className="pt-4 border-t border-gray-700">
							<p className="text-gray-400 mb-4 text-sm">More Options</p>
							{moreMenuItems.map((item, index) => (
								<Link
									key={index}
									href={item.href}
									className="flex items-center space-x-3 py-2 border-b border-gray-700"
									onClick={() => setMobileMenuOpen(false)}
								>
									<lord-icon
										src={item.iconSrc}
										colors="primary:#ffffff"
										style={{
											width: '25px',
											height: '25px',
										}}
									/>
									<span className="text-lg text-white">{item.text}</span>
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};
