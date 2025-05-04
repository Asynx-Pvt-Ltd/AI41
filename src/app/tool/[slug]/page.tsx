'use client';
import Image from 'next/image';
import Footer from '../../components/Footer';
import { Header } from '../../components/Header';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card } from '@/app/components/Card';
import Link from 'next/link';
import FormattedContent from '@/app/components/FormattedContent';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { CheckCircle, XCircle } from 'lucide-react';
import FAQTutorialsAccordion from '@/app/components/ui/FAQ';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/app/components/ui/TabsCN';
import FeaturedTools from '@/app/components/FeaturedTools';

export default function Tool() {
	const [tool, setTool] = useState<any>();
	const [alternatives, setAlternatives] = useState<any>([]);
	const params = useParams<{ slug: string }>();

	const faqs = [
		{
			question: 'What is an AI tool directory?',
			answer: (
				<>
					An AI tool directory is a curated platform with a list of assorted
					tools empowered by Artificial Intelligence. You can use it to find the
					right tools for your needs.
				</>
			),
		},
		{
			question: 'Are the tools listed here free?',
			answer: (
				<>
					Our list includes some free and paid tools. You can go through the
					dedicated page of each tool to know the pricing details.
				</>
			),
		},
		{
			question:
				'Do I need to sign up or create an account to access the directory?',
			answer: (
				<>
					No sign-up or account is required to check the tools. Even with a
					sign-up account, you may benefit from such features as adding tools to
					your favorite list.
				</>
			),
		},
		{
			question: 'Are the tools listed verified and reliable?',
			answer: (
				<>
					We're serious about reliability. Every tool in our directory is vetted
					through user feedback and performance checks. We even consider the
					credibility of the developers. That means you will see only trusted,
					high-quality tools for your purpose.
				</>
			),
		},
		{
			question:
				'How do you verify the effectiveness of the AI tools listed here?',
			answer: (
				<>
					We run the tools through scenarios relevant to their intended use.
					Similarly, our team checks the case studies and user reviews.
					Sometimes, we even reach out to the companies directly for deeper
					insights. Thus, we ensure that all the tools listed on our platform
					are high-quality.
				</>
			),
		},
	];

	useEffect(() => {
		if (params && params.slug) {
			fetch(`/api/tools/slug/${params?.slug}`)
				.then((res) => res.json())
				.then((d) => {
					setTool(d.tool);
					setAlternatives(d.alternatives);
				})
				.catch((err) => {});
		}
	}, [params]);

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
								className="bg-blue-600 text-white px-3 py-1 rounded-full 
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
								className="bg-blue-600 text-white px-3 py-1 rounded-full 
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

	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="flex-grow bg-white dark:bg-gray-800 w-full pt-10 pl-6 pr-6 pb-6 text-center">
				{tool ? (
					<>
						<div className="flex flex-row">
							<div className="flex flex-col h-fit w-full lg:mx-10 mx-0 border-[#222222] bg-white p-2 lg:p-10 shadow-sm shadow-[#222222] rounded-lg justify-around gap-2">
								<div className="flex flex-row justify-between">
									<div className="flex gap-1">
										<CategoryTags categories={tool.categories} />
									</div>
									<div className="flex flex-col">
										<div className="flex flex-row justify-around">
											<a
												href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
												target="_blank"
												className="mr-1"
											>
												<Image
													src={'/twitter.png'}
													width={14}
													height={14}
													alt="x.com"
												/>
											</a>
											<a
												href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
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
											</a>
											<a
												href={`https://www.linkedin.com/shareArticle?url=${window.location.href}&title=${tool.name}`}
												target="_blank"
												className="mr-2"
											>
												<Image
													src={'/linkedin.png'}
													width={14}
													height={14}
													alt="linkedin.com"
												/>
											</a>
											<a
												href={`https://t.me/share/url?url=${window.location.href}`}
												target="_blank"
												className="mr-2"
											>
												<Image
													src={'/telegram.png'}
													width={16}
													height={16}
													alt="telegram.com"
												/>
											</a>
											<a
												href={`mailto:?subject=${tool.name}&body=${window.location.href}`}
												target="_blank"
												className="mr-1"
											>
												<Image
													src={'/email.png'}
													width={16}
													height={16}
													alt="Mail"
												/>
											</a>
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
													href={`/tool/free`}
													className="px-3 py-1 bg-green-200 text-gray-800 rounded-full text-xs hover:bg-gray-300 transition-colors"
												>
													Free
												</Link>
											)}
											{tool.hasPaidPrice && (
												<Link
													href={`/submit-ai`}
													className="px-3 py-1 bg-orange-200 text-gray-800 rounded-full text-xs hover:bg-gray-300 transition-colors"
												>
													From ${tool.paidPrice}
												</Link>
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
										<a
											href={tool?.url}
											target="_blank"
											rel="noopener noreferrer"
											className="flex gap-2 items-center max-w-32 self-center mt-4 lg:mt-0 bg-[rgba(34,34,34,0.9)] text-white px-4 py-2 rounded-md hover:bg-[#222222] transition"
										>
											Visit Site <FaExternalLinkAlt size={12} />
										</a>
									</div>
								</div>
							</div>
						</div>
						<div className="flex flex-col lg:flex-row justify-center w-full">
							<div className="mt-8 w-full md:mx-4 lg:mx-10 lg:min-w-[1050px]">
								<Tabs defaultValue="description" className="w-full">
									<TabsList className="w-full justify-start overflow-x-auto">
										<TabsTrigger value="description">Description</TabsTrigger>
										<TabsTrigger value="proscons">Pros & Cons</TabsTrigger>
										<TabsTrigger value="similar">Similar Tools</TabsTrigger>
										<TabsTrigger value="faq">FAQ</TabsTrigger>
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
													<h2 className="text-lg font-semibold text-green-800">
														Pros
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
											<h2 className="font-bold text-2xl text-center">
												Similar to {tool.name}
											</h2>
											{alternatives ? (
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
											) : (
												<div className="flex justify-center">
													<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black dark:border-white" />
												</div>
											)}
										</div>
									</TabsContent>
									<TabsContent
										value="faq"
										className="bg-white shadow-lg rounded-lg p-8"
									>
										<FAQTutorialsAccordion faqs={faqs} />
									</TabsContent>
								</Tabs>
							</div>
							<div className="mt-8 w-full md:min-w-[360px] lg:min-w-[360px]">
								<FeaturedTools />
							</div>
						</div>
					</>
				) : (
					<div className="flex flex-row justify-center items-center">
						<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black dark:border-white "></div>
					</div>
				)}
			</main>
			<Footer />
		</div>
	);
}
