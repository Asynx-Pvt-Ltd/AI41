import { NextPage } from 'next';
import { Header } from '../components/Header';
import Footer from '../components/Footer';

interface Props {}

export const metadata = {
	title: 'Privacy Policy: How AI41 Protects Your Data | AI41',
	description: `Read AI41's Privacy Policy to learn how we collect, use, and protect your data. Stay informed about your privacy on AI41.`,
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
						Privacy Policy
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
							Welcome to AI41! We care about your privacy and want to explain
							how we collect, use, and protect your information.
						</p>
					</div>

					<div className="mb-10">
						<h2 className="text-2xl font-bold mb-4">1. What We Collect</h2>
						<ul className="list-disc pl-6">
							<li>
								<strong>Basic info</strong> you provide, like your name or email
								when submitting or rating tools.
							</li>
							<li>
								<strong>Usage data</strong> like pages you visit, clicks, and
								time spent — to help improve the site.
							</li>
							<li>
								<strong>Tool submissions</strong> and ratings you share, which
								may be displayed publicly.
							</li>
						</ul>
					</div>

					<div className="mb-10">
						<h2 className="text-2xl font-bold mb-4">2. How We Use It</h2>
						<ul className="list-disc pl-6">
							<li>To run and improve AI41.</li>
							<li>To publish AI tool listings and user ratings.</li>
							<li>To send updates or respond to you (if you contact us).</li>
						</ul>
					</div>

					<div className="mb-10">
						<h2 className="text-2xl font-bold mb-4">3. Sharing</h2>
						<p>We don't sell your personal data. We only share data:</p>
						<ul className="list-disc pl-6 mt-2">
							<li>
								With trusted services that help run the site (like hosting).
							</li>
							<li>If required by law.</li>
						</ul>
					</div>

					<div className="mb-10">
						<h2 className="text-2xl font-bold mb-4">4. Cookies</h2>
						<p>
							We use cookies to understand how people use our site and to
							improve your experience.
						</p>
					</div>

					<div className="mb-10">
						<h2 className="text-2xl font-bold mb-4">5. Your Choices</h2>
						<p>You can:</p>
						<ul className="list-disc pl-6 mt-2">
							<li>Contact us to delete your submitted data.</li>
							<li>Use browser settings to block cookies.</li>
						</ul>
					</div>

					<div>
						<h2 className="text-2xl font-bold mb-4">6. Contact Us</h2>
						<p>
							Have questions? Email us at:{' '}
							<strong className="text-blue-600">info@ai41.org</strong>
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
