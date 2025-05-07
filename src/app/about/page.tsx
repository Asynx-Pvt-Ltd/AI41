import { NextPage } from 'next';
import Footer from '../components/Footer';
import { Header } from '../components/Header';

interface Props {}

export const metadata = {
	title: 'Learn About AI41’s Mission & Team | AI41',
	description:
		'Discover AI41’s mission, vision, and expert team behind the platform. See how we curate and review AI tools for you.',
};
const Page: NextPage<Props> = ({}) => {
	return (
		<main className="min-h-screen bg-white">
			<section>
				<Header />
			</section>
			{/* Hero Section */}
			<section className="w-full py-16">
				<div className="container mx-auto px-4 md:px-6">
					<h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
						About AI41
					</h1>
					<p className="text-xl text-center max-w-3xl mx-auto">
						Your ultimate destination for discovering the best AI tools sorted
						by category, role, and user reviews.
					</p>
				</div>
			</section>

			{/* Main Content */}
			<section className="container mx-auto px-4 md:px-6">
				<div className="max-w-4xl mx-auto">
					<div className="mb-12">
						<h2 className="text-3xl font-bold mb-6 text-[#1c1c1c]">
							Our Mission
						</h2>
						<p className="text-lg text-gray-700 mb-4">
							At AI41, we're dedicated to simplifying the discovery of AI tools.
							Our mission is to create a comprehensive, user-friendly platform
							that helps professionals, developers, and enthusiasts find the
							perfect AI tools for their specific needs.
						</p>
						<p className="text-lg text-gray-700">
							We believe that the right AI tool can transform workflows, boost
							productivity, and unlock new possibilities. That's why we've built
							AI41 - to connect you with the AI solutions that matter most.
						</p>
					</div>

					<div className="mb-12">
						<h2 className="text-3xl font-bold mb-6 text-[#1c1c1c]">
							What Makes Us Different
						</h2>
						<div className="grid md:grid-cols-2 gap-6">
							<div className="bg-gray-50 p-6 rounded-lg">
								<h3 className="text-xl font-semibold mb-3 text-[#1c1c1c]">
									Category & Role Based
								</h3>
								<p className="text-gray-700">
									We organize AI tools by both category and professional role,
									making it easier to find tools that align with your specific
									workflow and requirements.
								</p>
							</div>
							<div className="bg-gray-50 p-6 rounded-lg">
								<h3 className="text-xl font-semibold mb-3 text-[#1c1c1c]">
									Real User Reviews
								</h3>
								<p className="text-gray-700">
									Our platform features authentic reviews from real users,
									helping you make informed decisions based on others'
									experiences.
								</p>
							</div>
							<div className="bg-gray-50 p-6 rounded-lg">
								<h3 className="text-xl font-semibold mb-3 text-[#1c1c1c]">
									Pricing Transparency
								</h3>
								<p className="text-gray-700">
									We clearly display pricing information for all tools, allowing
									you to find solutions that fit your budget without any
									surprises.
								</p>
							</div>
							<div className="bg-gray-50 p-6 rounded-lg">
								<h3 className="text-xl font-semibold mb-3 text-[#1c1c1c]">
									Curated Selection
								</h3>
								<p className="text-gray-700">
									Every tool in our directory is carefully vetted to ensure it
									meets our quality standards before being added to our
									collection.
								</p>
							</div>
						</div>
					</div>

					<div className="mb-12">
						<h2 className="text-3xl font-bold mb-6 text-[#1c1c1c]">
							Our Story
						</h2>
						<p className="text-lg text-gray-700 mb-4">
							AI41 was born out of a simple frustration: the difficulty of
							finding the right AI tools in an increasingly crowded marketplace.
							Our founder, a technology enthusiast, spent countless hours
							researching and testing various AI solutions, only to realize that
							there wasn't a comprehensive resource that organized tools by
							practical use cases and professional roles.
						</p>
						<p className="text-lg text-gray-700">
							In 2023, AI41 was launched with the goal of creating the most
							helpful AI tool directory on the web. Today, we're proud to serve
							a growing community of AI users and continue expanding our
							collection to include the latest and most impactful tools.
						</p>
					</div>

					<div>
						<h2 className="text-3xl font-bold mb-6 text-[#1c1c1c]">
							Join Our Community
						</h2>
						<p className="text-lg text-gray-700 mb-6">
							AI41 is more than just a directory—it's a community of
							forward-thinking professionals and enthusiasts. We encourage you
							to:
						</p>
						<ul className="list-disc pl-6 text-lg text-gray-700 mb-6">
							<li className="mb-2">
								Submit new AI tools that deserve attention
							</li>
							<li className="mb-2">
								Share your experiences through honest reviews
							</li>
							<li className="mb-2">
								Connect with other users who share your interests
							</li>
							<li>Stay updated on the latest AI trends and tools</li>
						</ul>
						<div className="mt-8">
							<a
								href="/submit-ai"
								className="inline-block bg-[#1c1c1c] text-white py-3 px-6 rounded-md font-semibold hover:bg-gray-800 transition duration-300"
							>
								Submit Your Tool
							</a>
						</div>
					</div>
				</div>
			</section>

			<section className="mt-8">
				<Footer />
			</section>
		</main>
	);
};

export default Page;
