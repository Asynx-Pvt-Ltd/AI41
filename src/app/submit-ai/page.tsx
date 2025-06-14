'use client';
import Image from 'next/image';
import Footer from '../components/Footer';
import { Header } from '../components/Header';
import Link from 'next/link';

export default function SubmitAI() {
	const faqs = [
		{
			question: 'Is it free to submit an AI tool?',
			answer:
				'Yes, submissions are currently 100% free while we grow our directory.',
		},
		{
			question: 'How long does it take to get listed?',
			answer:
				'We manually review every submission. It usually takes a few days, but may vary depending on volume.',
		},
		{
			question: 'Can I submit my own AI tool?',
			answer:
				'Absolutely! Creators and founders are welcome to submit their own tools — just make sure they meet our guidelines.',
		},
		{
			question: 'What kind of tools can I submit?',
			answer:
				"Any legitimate AI-related tool — web apps, APIs, platforms, plugins, etc. We don't accept anything illegal, spammy, or unsafe.",
		},
		{
			question: 'Can I update or remove a tool I submitted?',
			answer:
				"Yes, just email us the details, and we'll help you update or remove it.",
		},
		{
			question: 'Will you promote my tool?',
			answer:
				"Being listed is free. We may feature certain tools in our newsletter or on the homepage — but we don't guarantee promotion.",
		},
		{
			question: 'What if I found a mistake in a listing?',
			answer: "Let us know at info@ai41.org and we'll fix it!",
		},
	];

	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="flex-grow bg-white dark:bg-gray-800 lg:pt-4 w-full pl-4 px-2 text-center">
				<div className="container mx-auto px-4 py-8">
					<h1 className="border-image text-3xl font-bold text-center mb-8 leading-normal text-balance">
						We're building and improving AI41 every day — and we'd love your
						help!
					</h1>
					<div className="max-w-4xl mx-auto text-left pt-12">
						<p className="text-lg mb-6">
							If you know an AI tool that deserves to be listed, feel free to
							send it our way. We're currently accepting{' '}
							<strong>submissions for free</strong>, as we grow the directory.
						</p>

						<h2 className="text-2xl font-bold mb-4">Submission Guidelines:</h2>
						<ul className="mb-6 space-y-2">
							<li>
								• Only submit <strong>legitimate AI tools</strong>.
							</li>
							<li>
								• Tools must{' '}
								<strong>not be illegal, harmful, or misleading</strong>.
							</li>
							<li>• Please include basic info like:</li>
							<ul className="ml-6 mt-2 space-y-1">
								<li>◦ Tool name</li>
								<li>◦ Website or link</li>
								<li>◦ Short description</li>
								<li>
									◦ Optional: Your name and contact (in case we need to follow
									up)
								</li>
							</ul>
						</ul>

						<h2 className="text-2xl font-bold mb-4">How to Submit:</h2>
						<p className="text-lg mb-6">
							Send your submission to:{' '}
							<Link href={'mailto:info@ai41.org'} target="_blank">
								{' '}
								<strong className="text-blue-600">info@ai41.org</strong>
							</Link>
						</p>
						<p className="mb-6">
							We review every submission manually. Not all tools will be listed,
							but we appreciate every suggestion!
						</p>
						<p className="text-lg font-medium">
							Thanks for helping us grow the AI41 community.
						</p>
					</div>
				</div>

				<div className="max-w-5xl mx-auto px-4 py-8">
					<h2 className="text-3xl font-bold text-center mb-8">
						Frequently Asked Questions (FAQs)
					</h2>
					<div className="space-y-6">
						{faqs.map((faq, index) => (
							<div key={index} className="border-b border-gray-200 pb-4">
								<h3 className="text-xl text-left font-semibold mb-2">
									{faq.question}
								</h3>
								<div className="text-gray-600 text-left">{faq.answer}</div>
							</div>
						))}
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}
