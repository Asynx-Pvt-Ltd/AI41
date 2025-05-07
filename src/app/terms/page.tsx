import { NextPage } from 'next';
import Footer from '../components/Footer';
import { Header } from '../components/Header';

interface Props {}

export const metadata = {
	title: 'Terms of Service: AI41 User Agreement & Rules | AI41',
	description:
		'See AI41’s Terms of Service to learn the rules, conditions, and user guidelines. Use our platform confidently and securely.',
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
					<p className="mt-4 text-center text-lg">Last Updated: May 7, 2025</p>
				</div>
			</section>

			{/* Main Content */}
			<section className="container mx-auto px-4 md:px-6">
				<div className="max-w-4xl mx-auto prose prose-lg">
					<div className="mb-10">
						<h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
						<p>
							Welcome to AI41. By accessing and using our website, you agree to
							be bound by these Terms of Service. If you do not agree with any
							part of these terms, please do not use our services.
						</p>
					</div>

					<div className="mb-10">
						<h2 className="text-2xl font-bold mb-4">
							2. Description of Service
						</h2>
						<p>
							AI41 is a directory listing website that provides information
							about AI tools organized by category and job role. We aim to help
							users discover and compare various AI tools available in the
							market.
						</p>
					</div>

					<div className="mb-10">
						<h2 className="text-2xl font-bold mb-4">3. User Accounts</h2>
						<p>
							Some features of our service may require you to create an account.
							You are responsible for maintaining the confidentiality of your
							account information and for all activities that occur under your
							account.
						</p>
						<p className="mt-2">You agree to:</p>
						<ul className="list-disc pl-6 mt-2">
							<li>
								Provide accurate and complete information when creating your
								account
							</li>
							<li>Update your information to keep it accurate and current</li>
							<li>
								Protect your account credentials and not share them with others
							</li>
							<li>
								Notify us immediately of any unauthorized use of your account
							</li>
						</ul>
					</div>

					<div className="mb-10">
						<h2 className="text-2xl font-bold mb-4">4. User Submissions</h2>
						<p>
							Users may submit AI tools for inclusion in our directory. By
							submitting content to AI41, you grant us a non-exclusive,
							worldwide, royalty-free license to use, reproduce, modify, and
							display the content in connection with our services.
						</p>
						<p className="mt-2">You represent and warrant that:</p>
						<ul className="list-disc pl-6 mt-2">
							<li>
								You own or have the necessary rights to the content you submit
							</li>
							<li>
								Your submissions do not violate any third party's intellectual
								property rights
							</li>
							<li>Your submissions are accurate and not misleading</li>
							<li>
								Your submissions comply with all applicable laws and regulations
							</li>
						</ul>
					</div>

					<div className="mb-10">
						<h2 className="text-2xl font-bold mb-4">5. User Reviews</h2>
						<p>
							Users may submit reviews of AI tools listed in our directory.
							Reviews should be honest, accurate, and based on actual experience
							with the tool being reviewed.
						</p>
						<p className="mt-2">We reserve the right to remove reviews that:</p>
						<ul className="list-disc pl-6 mt-2">
							<li>Contain abusive, offensive, or inappropriate language</li>
							<li>Are deemed to be spam or fraudulent</li>
							<li>Violate any third party's rights</li>
							<li>Do not comply with these Terms of Service</li>
						</ul>
					</div>

					<div className="mb-10">
						<h2 className="text-2xl font-bold mb-4">
							6. Intellectual Property
						</h2>
						<p>
							The content, organization, graphics, design, and other matters
							related to AI41 are protected under applicable copyrights,
							trademarks, and other proprietary rights. Copying, redistributing,
							use, or publication of any such matters or any part of the website
							is prohibited without our express permission.
						</p>
					</div>

					<div className="mb-10">
						<h2 className="text-2xl font-bold mb-4">7. Third-Party Links</h2>
						<p>
							Our website may contain links to third-party websites or
							resources. These links are provided for your convenience only. We
							have no control over the contents of those sites or resources and
							accept no responsibility for them or for any loss or damage that
							may arise from your use of them.
						</p>
					</div>

					<div className="mb-10">
						<h2 className="text-2xl font-bold mb-4">
							8. Disclaimer of Warranties
						</h2>
						<p>
							The information provided on AI41 is for general informational
							purposes only. We make no representations or warranties of any
							kind, express or implied, about the completeness, accuracy,
							reliability, suitability, or availability of the website or the
							information, products, services, or related graphics contained on
							the website.
						</p>
					</div>

					<div className="mb-10">
						<h2 className="text-2xl font-bold mb-4">
							9. Limitation of Liability
						</h2>
						<p>
							In no event will AI41, its owners, employees, or affiliates be
							liable for any loss or damage including without limitation,
							indirect or consequential loss or damage, or any loss or damage
							whatsoever arising from loss of data or profits arising out of, or
							in connection with, the use of this website.
						</p>
					</div>

					<div className="mb-10">
						<h2 className="text-2xl font-bold mb-4">
							10. Modifications to Terms
						</h2>
						<p>
							We reserve the right to modify these Terms of Service at any time.
							We will notify users of any significant changes by posting a
							notice on our website. Your continued use of AI41 after such
							modifications will constitute your acknowledgment of the modified
							Terms of Service and agreement to abide by them.
						</p>
					</div>

					<div>
						<h2 className="text-2xl font-bold mb-4">11. Contact Information</h2>
						<p>
							If you have any questions about these Terms of Service, please
							contact us at:
						</p>
						<p className="mt-2">Email: support@ai41.com</p>
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
