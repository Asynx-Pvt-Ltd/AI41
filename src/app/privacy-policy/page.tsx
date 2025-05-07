import { NextPage } from 'next';
import { Header } from '../components/Header';
import Footer from '../components/Footer';

interface Props {}

export const metadata = {
	title: 'Privacy Policy: How AI41 Protects Your Data | AI41',
	description:
		'Read AI41’s Privacy Policy to learn how we collect, use, and protect your data. Stay informed about your privacy on AI41.',
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
					<p className="mt-4 text-center text-lg">Last Updated: May 7, 2025</p>
				</div>
			</section>

			{/* Main Content */}
			<section className="container mx-auto px-4 md:px-6">
				<div className="max-w-4xl mx-auto prose prose-lg">
					<div className="mb-10">
						<h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
						<p>
							At AI41, we respect your privacy and are committed to protecting
							your personal data. This Privacy Policy explains how we collect,
							use, disclose, and safeguard your information when you visit our
							website.
						</p>
						<p className="mt-2">
							Please read this Privacy Policy carefully. If you do not agree
							with the terms of this Privacy Policy, please do not access the
							site.
						</p>
					</div>

					<div className="mb-10">
						<h2 className="text-2xl font-bold mb-4">
							2. Information We Collect
						</h2>
						<h3 className="text-xl font-semibold mt-6 mb-2">
							2.1 Personal Data
						</h3>
						<p>
							We may collect personal identification information from users in
							various ways, including, but not limited to:
						</p>
						<ul className="list-disc pl-6 mt-2">
							<li>When users register on our site</li>
							<li>When users submit an AI tool</li>
							<li>When users write reviews</li>
							<li>When users subscribe to our newsletter</li>
							<li>When users contact us</li>
						</ul>
						<p className="mt-2">
							The personal information we may collect includes:
						</p>
						<ul className="list-disc pl-6 mt-2">
							<li>Name</li>
							<li>Email address</li>
							<li>Professional information (job title, industry)</li>
							<li>Social media profiles (optional)</li>
						</ul>

						<h3 className="text-xl font-semibold mt-6 mb-2">
							2.2 Non-Personal Data
						</h3>
						<p>
							We may collect non-personal identification information about users
							whenever they interact with our site. This may include:
						</p>
						<ul className="list-disc pl-6 mt-2">
							<li>Browser name</li>
							<li>Type of computer or device</li>
							<li>
								Technical information about users' means of connection to our
								site
							</li>
							<li>Operating system</li>
							<li>Internet service providers</li>
							<li>Other similar information</li>
						</ul>
					</div>

					<div className="mb-10">
						<h2 className="text-2xl font-bold mb-4">
							3. How We Use Your Information
						</h2>
						<p>
							We may use the information we collect from you for the following
							purposes:
						</p>
						<ul className="list-disc pl-6 mt-2">
							<li>To personalize user experience</li>
							<li>To improve our website</li>
							<li>To process transactions</li>
							<li>To send periodic emails</li>
							<li>To display user-generated content (such as reviews)</li>
							<li>To respond to user inquiries and support requests</li>
							<li>
								To send newsletters and marketing communications (with your
								consent)
							</li>
						</ul>
					</div>

					<div className="mb-10">
						<h2 className="text-2xl font-bold mb-4">
							4. Cookies and Tracking Technologies
						</h2>
						<p>
							Our website may use "cookies" to enhance user experience. Users'
							web browsers place cookies on their hard drive for record-keeping
							purposes and sometimes to track information about them. Users may
							choose to set their web browser to refuse cookies or to alert you
							when cookies are being sent. If they do so, note that some parts
							of the site may not function properly.
						</p>
						<p className="mt-2">We use the following types of cookies:</p>
						<ul className="list-disc pl-6 mt-2">
							<li>
								<strong>Essential cookies:</strong> Necessary for the website to
								function properly
							</li>
							<li>
								<strong>Preference cookies:</strong> Enable the website to
								remember information that changes the way the website behaves or
								looks
							</li>
							<li>
								<strong>Statistics cookies:</strong> Help us understand how
								visitors interact with the website by collecting and reporting
								information anonymously
							</li>
							<li>
								<strong>Marketing cookies:</strong> Used to track visitors
								across websites to display relevant advertisements
							</li>
						</ul>
					</div>

					<div className="mb-10">
						<h2 className="text-2xl font-bold mb-4">
							5. Third-Party Disclosure
						</h2>
						<p>
							We do not sell, trade, or otherwise transfer your personally
							identifiable information to outside parties unless we provide
							users with advance notice. This does not include website hosting
							partners and other parties who assist us in operating our website,
							conducting our business, or serving our users, so long as those
							parties agree to keep this information confidential.
						</p>
						<p className="mt-2">
							We may also release information when its release is appropriate to
							comply with the law, enforce our site policies, or protect ours or
							others' rights, property, or safety.
						</p>
					</div>

					<div className="mb-10">
						<h2 className="text-2xl font-bold mb-4">6. Third-Party Links</h2>
						<p>
							Occasionally, at our discretion, we may include or offer
							third-party products or services on our website. These third-party
							sites have separate and independent privacy policies. We therefore
							have no responsibility or liability for the content and activities
							of these linked sites. Nonetheless, we seek to protect the
							integrity of our site and welcome any feedback about these sites.
						</p>
					</div>

					<div className="mb-10">
						<h2 className="text-2xl font-bold mb-4">7. Data Security</h2>
						<p>
							We implement appropriate data collection, storage, and processing
							practices and security measures to protect against unauthorized
							access, alteration, disclosure, or destruction of your personal
							information, username, password, transaction information, and data
							stored on our site.
						</p>
					</div>

					<div className="mb-10">
						<h2 className="text-2xl font-bold mb-4">
							8. Your Data Protection Rights
						</h2>
						<p>
							Depending on your location, you may have certain rights regarding
							your personal data, including:
						</p>
						<ul className="list-disc pl-6 mt-2">
							<li>The right to access the personal data we hold about you</li>
							<li>
								The right to request the correction of inaccurate personal data
							</li>
							<li>The right to request that we delete your data</li>
							<li>The right to restrict processing of your data</li>
							<li>The right to data portability</li>
							<li>The right to object to our processing of your data</li>
							<li>The right to withdraw consent at any time</li>
						</ul>
						<p className="mt-2">
							To exercise any of these rights, please contact us using the
							information provided in Section 11.
						</p>
					</div>

					<div className="mb-10">
						<h2 className="text-2xl font-bold mb-4">
							9. Children's Information
						</h2>
						<p>
							Our website is not intended for children under 13 years of age. We
							do not knowingly collect personal information from children under
							13. If you are a parent or guardian and you believe your child has
							provided us with personal information, please contact us so that
							we can take necessary actions.
						</p>
					</div>

					<div className="mb-10">
						<h2 className="text-2xl font-bold mb-4">
							10. Changes to This Privacy Policy
						</h2>
						<p>
							We may update our Privacy Policy from time to time. We will notify
							you of any changes by posting the new Privacy Policy on this page
							and updating the "Last Updated" date at the top. You are advised
							to review this Privacy Policy periodically for any changes.
						</p>
					</div>

					<div>
						<h2 className="text-2xl font-bold mb-4">11. Contact Us</h2>
						<p>
							If you have any questions about this Privacy Policy, please
							contact us at:
						</p>
						<p className="mt-2">Email: privacy@ai41.com</p>
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
