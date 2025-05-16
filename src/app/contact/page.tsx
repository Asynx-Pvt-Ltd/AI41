'use client';
import { useState } from 'react';
import { Header } from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function ContactUs() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: '',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<{
		success: boolean;
		message: string;
	} | null>(null);

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			await new Promise((resolve) => setTimeout(resolve, 1500));
			setSubmitStatus({
				success: true,
				message:
					"Your message has been sent successfully. We'll get back to you soon!",
			});
			setFormData({ name: '', email: '', subject: '', message: '' });
		} catch (error) {
			setSubmitStatus({
				success: false,
				message: 'Something went wrong. Please try again later.',
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
			<Header />

			<main className="flex-grow container mx-auto px-4 py-12">
				<div className="max-w-4xl mx-auto">
					<div className="text-center mb-12">
						<h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
							Contact Us
						</h1>
						<p className="text-lg text-gray-600 dark:text-gray-300">
							Have questions or suggestions? We're here to help!
						</p>
					</div>

					<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
						<div className="grid md:grid-cols-2">
							{/* Contact Information */}
							<div className="bg-[#222222] p-8 text-white">
								<h2 className="text-2xl font-bold mb-6">Get in Touch</h2>

								<div className="space-y-6">
									<div className="flex items-start space-x-4">
										<div className="mt-1">
											<lord-icon
												src="https://cdn.lordicon.com/osuxyevn.json"
												trigger="hover"
												colors="primary:#ffffff"
												style={{ width: '25px', height: '25px' }}
											/>
										</div>
										<div>
											<h3 className="font-semibold text-lg">Email</h3>
											<p className="text-gray-300">support@ai41.com</p>
										</div>
									</div>

									<div className="flex items-start space-x-4">
										<div className="mt-1">
											<lord-icon
												src="https://cdn.lordicon.com/hvbzttbj.json"
												trigger="hover"
												colors="primary:#ffffff"
												style={{ width: '25px', height: '25px' }}
											/>
										</div>
										<div>
											<h3 className="font-semibold text-lg">Location</h3>
											<p className="text-gray-300">
												AI41 Headquarters
												<br />
												123 Tech Drive
												<br />
												San Francisco, CA 94105
											</p>
										</div>
									</div>

									<div className="flex items-start space-x-4">
										<div className="mt-1">
											<lord-icon
												src="https://cdn.lordicon.com/tclnsjgx.json"
												trigger="hover"
												colors="primary:#ffffff"
												style={{ width: '25px', height: '25px' }}
											/>
										</div>
										<div>
											<h3 className="font-semibold text-lg">Office Hours</h3>
											<p className="text-gray-300">
												Monday - Friday: 9AM - 6PM
												<br />
												Saturday: 10AM - 4PM
												<br />
												Sunday: Closed
											</p>
										</div>
									</div>

									<div className="pt-6">
										<h3 className="font-semibold text-lg mb-3">
											Connect With Us
										</h3>
										<div className="flex space-x-4">
											<Link
												href="https://twitter.com/ai41"
												target="_blank"
												rel="noreferrer"
												aria-label="Twitter"
												className="text-white hover: transition duration-300"
											>
												<svg
													className="w-6 h-6"
													fill="currentColor"
													viewBox="0 0 24 24"
													aria-hidden="true"
												>
													<path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
												</svg>
											</Link>
											<Link
												href="https://linkedin.com/company/ai41"
												target="_blank"
												rel="noreferrer"
												aria-label="LinkedIn"
												className="text-white hover:text-gray-200 transition duration-300"
											>
												<svg
													className="w-6 h-6"
													fill="currentColor"
													viewBox="0 0 24 24"
													aria-hidden="true"
												>
													<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
												</svg>
											</Link>
											<Link
												href="https://github.com/ai41-org"
												target="_blank"
												rel="noreferrer"
												aria-label="GitHub"
												className="text-white hover:text-gray-200 transition duration-300"
											>
												<svg
													className="w-6 h-6"
													fill="currentColor"
													viewBox="0 0 24 24"
													aria-hidden="true"
												>
													<path
														fillRule="evenodd"
														d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
														clipRule="evenodd"
													></path>
												</svg>
											</Link>
										</div>
									</div>
								</div>
							</div>

							{/* Contact Form */}
							<div className="p-8">
								<h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
									Send us a Message
								</h2>

								<form onSubmit={handleSubmit} className="space-y-6">
									<div>
										<label
											htmlFor="name"
											className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
										>
											Full Name
										</label>
										<input
											type="text"
											id="name"
											name="name"
											required
											value={formData.name}
											onChange={handleChange}
											className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
											placeholder="Your name"
										/>
									</div>

									<div>
										<label
											htmlFor="email"
											className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
										>
											Email Address
										</label>
										<input
											type="email"
											id="email"
											name="email"
											required
											value={formData.email}
											onChange={handleChange}
											className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
											placeholder="your.email@example.com"
										/>
									</div>

									<div>
										<label
											htmlFor="subject"
											className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
										>
											Subject
										</label>
										<input
											type="text"
											id="subject"
											name="subject"
											required
											value={formData.subject}
											onChange={handleChange}
											className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
											placeholder="How can we help you?"
										/>
									</div>

									<div>
										<label
											htmlFor="message"
											className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
										>
											Message
										</label>
										<textarea
											id="message"
											name="message"
											rows={5}
											required
											value={formData.message}
											onChange={handleChange}
											className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
											placeholder="Your message here..."
										></textarea>
									</div>

									{submitStatus && (
										<div
											className={`p-4 rounded-md ${
												submitStatus.success
													? 'bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-200'
													: 'bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-200'
											}`}
										>
											{submitStatus.message}
										</div>
									)}

									<div>
										<button
											type="submit"
											disabled={isSubmitting}
											className={`w-full py-3 px-6 bg-[#222222] hover:bg-gray-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ${
												isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
											}`}
										>
											{isSubmitting ? 'Sending...' : 'Send Message'}
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}
