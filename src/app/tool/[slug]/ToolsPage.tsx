'use client';
import Image from 'next/image';
import Footer from '../../components/Footer';
import { Header } from '../../components/Header';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaExternalLinkAlt } from 'react-icons/fa';
import {
	CheckCircle,
	Facebook,
	Instagram,
	Linkedin,
	Twitter,
	X,
	XCircle,
	Youtube,
} from 'lucide-react';
import FAQTutorialsAccordion from '@/app/components/ui/FAQ';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/app/components/ui/TabsCN';
import FeaturedTools from '@/app/components/FeaturedTools';
import { usePathname } from 'next/navigation';
import FormatMarkdownText from '@/app/components/textFormatter';

interface FAQ {
	question: string;
	answer: string;
	order?: number;
}

export default function Tool({
	tool,
	alternatives,
}: {
	tool: any;
	alternatives: any;
}) {
	const pathname = usePathname();

	const faqs = tool.faqs || [];
	const JobRoles = ({
		roles,
	}: {
		roles: { jobRole: { name: string; slug: string } }[];
	}) => {
		const [showAll, setShowAll] = useState(false);

		if (!roles || roles.length === 0) return null;

		return (
			<div className="flex gap-2">
				<span className="text-gray-700 font-medium">Best For:</span>
				<div className="flex flex-wrap items-center gap-1">
					{showAll ? (
						<>
							{roles.map((role, i) => (
								<Link
									key={i}
									href={`/job/${role.jobRole.slug}`}
									className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm hover:bg-green-200 transition-colors"
								>
									{role.jobRole.name}
								</Link>
							))}
							{roles.length > 2 && (
								<button
									onClick={() => setShowAll(false)}
									className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm hover:bg-gray-300 transition-colors"
								>
									See Less
								</button>
							)}
						</>
					) : (
						<>
							{roles.slice(0, 2).map((role, i) => (
								<Link
									key={i}
									href={`/job/${role.jobRole.slug}`}
									className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm hover:bg-green-200 transition-colors"
								>
									{role.jobRole.name}
								</Link>
							))}
							{roles.length > 2 && (
								<button
									onClick={() => setShowAll(true)}
									className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm hover:bg-gray-300 transition-colors"
								>
									+{roles.length - 2} roles
								</button>
							)}
						</>
					)}
				</div>
			</div>
		);
	};

	const ToolTags = ({ tags }: { tags: string[] }) => {
		const [showAll, setShowAll] = useState(false);

		if (!tags || tags.length === 0) return null;

		return (
			<div className="flex flex-row flex-wrap items-center gap-2">
				{showAll ? (
					<>
						{tags.map((t, i) => (
							<Link
								key={i}
								href={`/plans`}
								className="px-3 py-1 bg-orange-200 text-gray-800 rounded-full text-xs hover:bg-gray-300 transition-colors"
							>
								{t}
							</Link>
						))}
						{tags.length > 2 && (
							<button
								onClick={() => setShowAll(false)}
								className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-xs hover:bg-gray-300 transition-colors"
							>
								See Less
							</button>
						)}
					</>
				) : (
					<>
						{tags.slice(0, 2).map((t, i) => (
							<Link
								key={i}
								href={`/plans`}
								className="px-3 py-1 bg-orange-200 text-gray-800 rounded-full text-xs hover:bg-gray-300 transition-colors"
							>
								{t}
							</Link>
						))}
						{tags.length > 2 && (
							<button
								onClick={() => setShowAll(true)}
								className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-xs hover:bg-gray-300 transition-colors"
							>
								+{tags.length - 2} tags
							</button>
						)}
					</>
				)}
			</div>
		);
	};

	const CategoryTags = ({
		categories,
	}: {
		categories: { id: number; name: string }[];
	}) => {
		const [showAll, setShowAll] = useState(false);

		if (!categories || categories.length === 0) return null;

		return (
			<div className="flex gap-1 items-center">
				{showAll ? (
					<>
						{categories.map((cat) => (
							<Link
								key={cat.id}
								className="bg-[#1c1c1c] text-white px-3 py-1 rounded-full 
                hover:bg-blue-700 transition-all duration-300 shadow-md 
                hover:shadow-lg transform hover:-translate-y-1 text-xs"
								href={
									'/ai-categories/' +
									cat.name.replaceAll(' ', '-').toLowerCase()
								}
							>
								{cat.name}
							</Link>
						))}
						{categories.length > 2 && (
							<button
								onClick={() => setShowAll(false)}
								className=" text-white px-3 py-1 rounded-full 
                bg-gray-500 transition-all duration-300 shadow-md 
                hover:shadow-lg transform hover:-translate-y-1 text-xs "
							>
								See Less
							</button>
						)}
					</>
				) : (
					<>
						{categories.slice(0, 2).map((cat) => (
							<Link
								key={cat.id}
								className="bg-[#1c1c1c] text-white px-3 py-1 rounded-full 
                hover:bg-blue-700 transition-all duration-300 shadow-md 
                hover:shadow-lg transform hover:-translate-y-1 text-xs"
								href={
									'/ai-categories/' +
									cat.name.replaceAll(' ', '-').toLowerCase()
								}
							>
								{cat.name}
							</Link>
						))}
						{categories.length > 2 && (
							<button
								onClick={() => setShowAll(true)}
								className="bg-gray-500 text-white px-3 py-1 rounded-full 
                hover:bg-blue-700 transition-all duration-300 shadow-md 
                hover:shadow-lg transform hover:-translate-y-1 text-xs"
							>
								+{categories.length - 2} more
							</button>
						)}
					</>
				)}
			</div>
		);
	};
	const [copied, setCopied] = useState(false);
	const handleCopyClick = () => {
		navigator.clipboard.writeText(tool.discountCoupon);
		setCopied(true);

		setTimeout(() => {
			setCopied(false);
		}, 2000);
	};
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="flex-grow bg-white dark:bg-gray-800 w-full pt-10 pl-6 pr-6 pb-6 text-center">
				{
					<>
						<div className="flex flex-row">
							<div className="flex flex-col h-fit w-full lg:mx-10 mx-0 border-[#222222] bg-white p-2 lg:p-10 shadow-sm shadow-[#222222] rounded-lg justify-around gap-2">
								<div className="flex flex-row justify-between">
									<div className="flex gap-1">
										<CategoryTags categories={tool.categories} />
									</div>
									<div className="flex flex-col">
										<div className="flex flex-row justify-around">
											<Link
												href={`https://twitter.com/intent/tweet?url=${pathname}`}
												target="_blank"
												className="mr-1"
											>
												<Image
													src={'/twitter.png'}
													width={14}
													height={14}
													alt="x.com"
												/>
											</Link>
											<Link
												href={`https://www.facebook.com/sharer/sharer.php?u=${pathname}`}
												target="_blank"
												className="mr-1"
											>
												<Image
													src={'/facebook.png'}
													width={18}
													height={18}
													alt="facebook.com"
													className="mt-[-2px]"
												/>
											</Link>
											<Link
												href={`https://www.linkedin.com/shareArticle?url=${pathname}&title=${tool.name}`}
												target="_blank"
												className="mr-2"
											>
												<Image
													src={'/linkedin.png'}
													width={14}
													height={14}
													alt="linkedin.com"
												/>
											</Link>
											<Link
												href={`https://t.me/share/url?url=${pathname}`}
												target="_blank"
												className="mr-2"
											>
												<Image
													src={'/telegram.png'}
													width={16}
													height={16}
													alt="telegram.com"
												/>
											</Link>
											<Link
												href={`mailto:?subject=${tool.name}&body=${pathname}`}
												target="_blank"
												className="mr-1"
											>
												<Image
													src={'/email.png'}
													width={16}
													height={16}
													alt="Mail"
												/>
											</Link>
										</div>
									</div>
								</div>
								<div className="flex flex-wrap justify-between md:flex-nowrap">
									<div className="flex flex-col md:pr-4">
										<div className="flex w-full flex-row p-[3px] bg-[#222222] overflow-hidden rounded-lg shadow-lg">
											<Image
												src={
													tool.thumbnail == ''
														? '/placeholder.jpeg'
														: tool.thumbnail
												}
												width={566}
												height={288}
												alt="ChatGPT"
												className="w-[566px] h-[288px] object-cover object-top"
											/>
										</div>
										<div className="flex flex-row mt-3 w-fit gap-1">
											{tool.hasFreePrice && (
												<Link
													href={`/tools/free`}
													className="px-3 py-1 bg-green-200 text-gray-800 rounded-full text-xs hover:bg-gray-300 transition-colors"
												>
													Free
												</Link>
											)}
											{tool.hasPaidPrice && (
												<p className="px-3 py-1 bg-orange-200 text-gray-800 rounded-full text-xs">
													From ${tool.paidPrice}
												</p>
											)}
										</div>
										<div className="flex flex-row mt-5 w-fit">
											<JobRoles roles={tool.jobRoles} />
										</div>
									</div>
									<div className="flex flex-col justify-around lg:mt-0 mt-4 gap-5 lg:justify-center">
										<div className="flex flex-row justify-center gap-1">
											<Image
												src={tool.icon}
												alt={tool.name}
												width={32}
												height={32}
												className="w-8 h-8"
											/>
											<h1 className="text-2xl font-bold text-gray-800 ">
												{tool?.name}
											</h1>
										</div>

										<div className="flex flex-row max-w-[500px] py-1 px-2 lg:py-4 lg:px-4 bg-[rgba(34,34,34,0.9)] rounded-lg shadow-lg shadow-[#222222] lg:p-2">
											<p
												className="text-white text-center leading-tight line-clamp-5 overflow-hidden"
												dangerouslySetInnerHTML={{
													__html: tool?.shortDescription,
												}}
											></p>
										</div>
										<Link
											href={tool?.url}
											target="_blank"
											rel="noopener noreferrer"
											className="flex gap-2 items-center max-w-32 self-center mt-4 lg:mt-0 bg-[rgba(34,34,34,0.9)] text-white px-4 py-2 rounded-md hover:bg-[#222222] transition"
										>
											Visit Site <FaExternalLinkAlt size={12} />
										</Link>
									</div>
								</div>
							</div>
						</div>
						<div className="flex flex-col lg:flex-row justify-center w-full">
							<div className="mt-8 w-full md:mx-4 lg:mx-10 lg:min-w-[1050px]">
								<Tabs defaultValue="description" className="w-full">
									<TabsList className="w-full justify-start overflow-x-auto">
										<h2>
											<TabsTrigger value="description">Description</TabsTrigger>
										</h2>
										<h2>
											<TabsTrigger value="proscons">Pros & Cons</TabsTrigger>
										</h2>
										<h2>
											<TabsTrigger value="similar">Similar Tools</TabsTrigger>
										</h2>
										<h2>
											<TabsTrigger value="faq">FAQ</TabsTrigger>
										</h2>
										<h2>
											<TabsTrigger value="pricing">Pricing</TabsTrigger>
										</h2>
										<h2>
											<TabsTrigger value="contact">Contact</TabsTrigger>
										</h2>
									</TabsList>
									<TabsContent
										value="description"
										className="bg-white shadow-lg rounded-lg p-8"
									>
										<p
											className="text-left"
											dangerouslySetInnerHTML={{
												__html: tool.description,
											}}
										/>
									</TabsContent>

									<TabsContent
										value="proscons"
										className="bg-white shadow-lg rounded-lg p-8"
									>
										<div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
											<div className="bg-green-50 rounded-lg p-5 border border-green-100">
												<div className="flex items-center gap-2 mb-4">
													<CheckCircle className="text-green-600 w-5 h-5" />
													<h3 className="text-lg font-semibold text-green-800">
														Pros
													</h3>
												</div>
												<div className="space-y-3">
													<p
														className="text-left"
														dangerouslySetInnerHTML={{
															__html: tool.pros,
														}}
													/>
												</div>
											</div>

											<div className="bg-red-50 rounded-lg p-5 border border-red-100">
												<div className="flex items-center gap-2 mb-4">
													<XCircle className="text-red-600 w-5 h-5" />
													<h2 className="text-lg font-semibold text-red-800">
														Cons
													</h2>
												</div>
												<div className="space-y-3">
													<p
														className="text-left"
														dangerouslySetInnerHTML={{
															__html: tool.pros,
														}}
													/>
												</div>
											</div>
										</div>
									</TabsContent>

									<TabsContent
										value="similar"
										className="bg-white shadow-lg rounded-lg p-8"
									>
										<div className="flex flex-col gap-4">
											<h3 className="font-bold text-2xl text-center">
												Similar to {tool.name}
											</h3>

											<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
												{alternatives
													.sort(() => Math.random() - 0.5)
													.slice(0, 8)
													.map((tool: any, idx: number) => (
														<div
															key={idx}
															className="rounded-md overflow-hidden bg-white border-slate-400 dark:bg-gray-800 dark:border-slate-500 border hover:border-slate-700 relative"
														>
															<div className="flex flex-col justify-between h-full">
																<div className="flex flex-col items-center">
																	<div className="flex flex-row justify-center items-center mt-4">
																		<Image
																			src={tool.icon}
																			alt={tool.name}
																			width={32}
																			height={32}
																			className="w-10 h-10 mr-2"
																		/>
																		<h4 className="text-black dark:text-zinc-100 font-bold tracking-wide text-lg capitalize">
																			{tool.name}
																		</h4>
																	</div>
																	<p
																		className="my-3 text-center text-black tracking-wide leading-0 text-sm line-clamp-3 overflow-hidden px-4"
																		dangerouslySetInnerHTML={{
																			__html: tool.shortDescription,
																		}}
																	/>
																</div>
																<div className="flex flex-col justify-center items-center mb-4">
																	<Link
																		href={'/tool/' + tool.slug}
																		className="w-fit h-8 rounded-md py-1 px-2 bg-black text-white dark:bg-white dark:text-black flex items-center gap-2 mt-2"
																	>
																		Visit <FaExternalLinkAlt size={10} />
																	</Link>
																</div>
															</div>
														</div>
													))}
											</div>
										</div>
									</TabsContent>
									<TabsContent
										value="faq"
										className="bg-white shadow-lg rounded-lg p-8"
									>
										<FAQTutorialsAccordion
											faqs={faqs.map((faq: FAQ) => ({
												question: faq.question,
												answer: faq.answer,
											}))}
										/>
									</TabsContent>
									<TabsContent
										value="pricing"
										className="bg-white shadow-xl rounded-lg p-8"
									>
										<div className="w-full bg-white px-4 sm:px-6 lg:px-8">
											<div className="max-w-7xl">
												{/* Free Tier */}
												{tool.hasFreePrice && (
													<div className="mb-8 bg-gray-50 p-6 rounded-lg border-l-4 border-green-500">
														<div className="flex items-center gap-2 mb-2">
															<CheckCircle className="text-green-600 w-5 h-5" />
															<h3 className="text-xl font-semibold text-gray-800">
																Free Tier
															</h3>
														</div>
														<p className="text-gray-500 text-left">
															Access to core features with limited usage
														</p>
														<div className="mt-2 text-left">
															<Link
																href="/tools/free"
																className="px-3 py-1 bg-green-200 hover:bg-gray-300 text-gray-800 rounded-full text-xs"
															>
																Free
															</Link>
														</div>
													</div>
												)}

												{/* Pricing Plans */}
												{tool.pricingPlans && (
													<div>
														<h3 className="text-xl font-semibold mb-6 text-gray-800 border-b border-gray-300 pb-2">
															Pricing Plans (Paid Tier)
														</h3>
														<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
															{tool.pricingPlans.map(
																(plan: any, index: any) => (
																	<div
																		key={index}
																		className="border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
																	>
																		<div className="bg-gray-50 p-4 border-b border-gray-200">
																			<h4 className="font-bold text-lg text-center text-gray-800">
																				{plan.name}
																			</h4>
																		</div>
																		<div className="p-8 text-center bg-white">
																			<p className="text-3xl font-bold text-gray-900 mb-1">
																				${plan.price}
																			</p>
																			<p className="text-gray-600 mb-6">
																				per {plan.billingPeriod}
																			</p>
																		</div>
																	</div>
																),
															)}
														</div>
													</div>
												)}

												{/* Discounts */}
												<div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
													{/* Discounts */}
													<div className="bg-gray-50 p-6 rounded-lg border-l-4 border-gray-800">
														<div className="flex items-center gap-2 mb-2">
															<div className="w-5 h-5 text-blue-600">%</div>
															<h3 className="text-xl font-semibold text-gray-800">
																Discounts
															</h3>
														</div>
														<p
															className="text-gray-500 text-left mb-4"
															dangerouslySetInnerHTML={{
																__html: tool.discounts,
															}}
														/>

														{tool.discountCoupon && (
															<div className="mt-4 text-left">
																<h3 className="font-medium text-gray-700 mb-2">
																	Coupon Code
																</h3>
																<div className="flex items-center">
																	<div className="relative flex-1">
																		<div className="bg-white border border-gray-300 rounded-l-md py-2 px-4 font-mono text-gray-800 w-full">
																			{tool.discountCoupon}
																		</div>
																	</div>
																	<button
																		onClick={handleCopyClick}
																		className="bg-blue-600 hover:bg-blue-700 text-white rounded-r-md transition-colors w-24 h-10 text-center"
																	>
																		{copied ? (
																			<CheckCircle
																				size={20}
																				className="mx-auto"
																			/>
																		) : (
																			'Copy'
																		)}
																	</button>
																</div>
																{copied && (
																	<p className="text-green-600 text-sm mt-1">
																		Coupon copied to clipboard!
																	</p>
																)}
															</div>
														)}
													</div>

													{/* Refund Policy */}
													<div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#2c2c2c]">
														<div className="flex items-center gap-2 mb-2">
															<div className="w-5 h-5 text-yellow-600">↩️</div>
															<h3 className="text-xl font-semibold text-gray-800">
																Refund Policy
															</h3>
														</div>
														<p
															className="text-gray-500 text-left"
															dangerouslySetInnerHTML={{
																__html: tool.refundPolicy,
															}}
														/>
													</div>
												</div>

												{/* Pricing URL button */}
												<div className="mt-10 text-center">
													<Link
														href={tool.pricingUrl}
														target="_blank"
														rel="noopener noreferrer"
														className="bg-gray-900 text-white px-8 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-300 inline-flex items-center justify-center shadow-md"
													>
														See Full Pricing Details{' '}
														<FaExternalLinkAlt className="ml-2" size={12} />
													</Link>
												</div>
											</div>
										</div>
									</TabsContent>
									<TabsContent
										value="contact"
										className="bg-white shadow-xl rounded-lg p-8"
									>
										<div className="flex flex-col gap-8">
											{/* Contact information */}
											<div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
												<h3 className="text-xl font-semibold mb-5 text-gray-800 border-b pb-2">
													Contact Information
												</h3>
												<div className="flex gap-6 items-center py-4 justify-center flex-wrap">
													{tool.contactEmail && (
														<div className="flex items-center">
															<div className="w-10 h-10 rounded-full bg-[#1c1c1c] flex items-center justify-center mr-2">
																<span className="text-white">@</span>
															</div>
															<div>
																<p className="text-sm text-gray-500 text-start">
																	Email
																</p>
																<p className="font-medium">
																	{tool.contactEmail}
																</p>
															</div>
														</div>
													)}
													{tool.contactPhone && (
														<div className="flex items-center">
															<div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-2">
																<span className="text-green-600">☎</span>
															</div>
															<div>
																<p className="text-sm text-gray-500 text-start">
																	Phone
																</p>
																<p className="font-medium">
																	{tool.contactPhone}
																</p>
															</div>
														</div>
													)}
												</div>
											</div>

											{/* Social Media */}
											{tool.contactSocial && (
												<div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
													<h3 className="text-xl font-semibold mb-5 text-gray-800 border-b pb-2">
														Social Media
													</h3>
													<div className="flex flex-wrap gap-4 text-normal justify-center">
														{tool.contactSocial.facebook && (
															<Link
																href={tool.contactSocial.facebook}
																target="_blank"
																rel="noopener noreferrer"
																className="flex items-center rounded-full p-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
															>
																<div className="flex items-center gap-2">
																	<Facebook />
																</div>
															</Link>
														)}
														{tool.contactSocial.twitter && (
															<Link
																href={tool.contactSocial.twitter}
																target="_blank"
																rel="noopener noreferrer"
																className="flex items-center p-2 bg-black text-white rounded-full hover:bg-blue-500 transition-colors duration-300"
															>
																<div className="flex items-center gap-2">
																	<Twitter />
																</div>
															</Link>
														)}
														{tool.contactSocial.linkedin && (
															<Link
																href={tool.contactSocial.linkedin}
																target="_blank"
																rel="noopener noreferrer"
																className="flex items-center p-2  bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors duration-300"
															>
																<div className="flex items-center gap-2">
																	<Linkedin />
																</div>
															</Link>
														)}
														{tool.contactSocial.instagram && (
															<Link
																href={tool.contactSocial.instagram}
																target="_blank"
																rel="noopener noreferrer"
																className="flex items-center p-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors duration-300"
															>
																<div className="flex items-center gap-2">
																	<Instagram />
																</div>
															</Link>
														)}
														{tool.contactSocial.youtube && (
															<Link
																href={tool.contactSocial.youtube}
																target="_blank"
																rel="noopener noreferrer"
																className="flex items-center p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-300"
															>
																<div className="flex items-center gap-2">
																	<Youtube />
																</div>
															</Link>
														)}
													</div>
												</div>
											)}

											{/* Contact page button */}
											{tool.contactPageUrl && (
												<div className="text-center">
													<Link
														href={tool.contactPageUrl}
														target="_blank"
														rel="noopener noreferrer"
														className="bg-[#1c1c1c] text-white px-8 py-2 rounded-lg font-medium hover:bg-[#1c1c1c]/80 transition-colors duration-300 inline-flex items-center justify-center shadow-md"
													>
														Contact {tool.name}{' '}
														<FaExternalLinkAlt className="ml-2" size={12} />
													</Link>
												</div>
											)}
										</div>
									</TabsContent>
								</Tabs>
							</div>
							<div className="mt-8 w-full md:min-w-[360px] lg:min-w-[360px]">
								<FeaturedTools />
							</div>
						</div>
					</>
				}
			</main>
			<Footer />
		</div>
	);
}
