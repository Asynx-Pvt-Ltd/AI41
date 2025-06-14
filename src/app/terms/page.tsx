import { NextPage } from 'next';
import Footer from '../components/Footer';
import { Header } from '../components/Header';
import Link from 'next/link';

interface Props {}

export const metadata = {
	title: 'Terms of Service: AI41 User Agreement & Rules | AI41',
	description: `See AI41's Terms of Service to learn the rules, conditions, and user guidelines. Use our platform confidently and securely.`,
};
const Page: NextPage<Props> = ({}) => {
	return (
		<main className="min-h-screen bg-white">
			<section>
				<Header />
			</section>
			{/* Hero Section */}
			<section className="w-full py-12">
				<div className="container mx-auto px-4 md:px-6">
					<h1 className="text-3xl md:text-4xl font-bold text-center">
						Terms of Service
					</h1>
					<p className="mt-4 text-center text-lg">
						Effective Date: 14th June 2025
					</p>
				</div>
			</section>

			{/* Main Content */}
			<section className="container mx-auto px-4 md:px-6">
				<div className="max-w-4xl mx-auto prose prose-lg">
					<div className="mb-8">
						<p className="text-lg">
							Welcome to AI41! By using this website, you agree to follow these
							terms. Please read them carefully.
						</p>
					</div>

					<div className="mb-10">
						<h2 className="text-2xl font-bold mb-4">1. What We Do</h2>
						<p>
							AI41 is a directory of AI tools. We share information, news, and
							let users rate and submit AI tools.
						</p>
					</div>

					<div className="mb-10">
						<h2 className="text-2xl font-bold mb-4">
							2. Your Responsibilities
						</h2>
						<p>When using our site, you agree to:</p>
						<ul className="list-disc pl-6 mt-2">
							<li>Share only accurate and respectful content.</li>
							<li>
								Not spam, copy others' work, or post anything harmful or
								illegal.
							</li>
							<li>
								Use the site only for personal or business research, not to
								abuse or damage it.
							</li>
						</ul>
					</div>

					<div className="mb-10">
						<h2 className="text-2xl font-bold mb-4">
							3. Submitting Tools or Content
						</h2>
						<ul className="list-disc pl-6">
							<li>
								You keep ownership of anything you submit, but you give us the
								right to show it on AI41.
							</li>
							<li>
								We may edit or remove submissions if needed (for example, if
								they break the rules or contain spam).
							</li>
						</ul>
					</div>

					<div className="mb-10">
						<h2 className="text-2xl font-bold mb-4">4. Ratings and Reviews</h2>
						<ul className="list-disc pl-6">
							<li>
								Reviews and ratings must be honest and based on your real
								experience.
							</li>
							<li>We may remove fake or abusive reviews.</li>
						</ul>
					</div>

					<div className="mb-10">
						<h2 className="text-2xl font-bold mb-4">5. No Guarantees</h2>
						<p>
							We try to keep the info on AI41 up to date, but we don't promise
							it's always 100% accurate. Use the tools listed at your own risk.
						</p>
					</div>

					<div className="mb-10">
						<h2 className="text-2xl font-bold mb-4">6. Changes</h2>
						<p>
							We may update these terms from time to time. If we do, we'll post
							the new version on this page.
						</p>
					</div>

					<div>
						<h2 className="text-2xl font-bold mb-4">7. Contact</h2>
						<p>
							Questions? Email us at:{' '}
							<Link href={'mailto:info@ai41.org'} target="_blank">
								{' '}
								<strong className="text-blue-600">info@ai41.org</strong>
							</Link>
						</p>
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
