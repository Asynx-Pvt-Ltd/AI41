import React, { useEffect, useRef, useState } from 'react';
import { PutBlobResult } from '@vercel/blob';
import { toast } from 'react-toastify';
import AdvancedEditor from '@/app/components/AdvancedEditor';
import PricingSection from './PricingSection';
import ContactSection from './ContactSection';

function ToolForm({ editMode, editingTool, onSubmitSuccess }) {
	const inputFileRef = useRef(null);
	const inputFileRefThumbnail = useRef(null);
	const [categories, setCategories] = useState([]);
	const [jobRoles, setJobRoles] = useState([]);
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [selectedJobRoles, setSelectedJobRoles] = useState([]);
	const [iconFile, setIconFile] = useState(null);
	const [thumbnailFile, setThumbnailFile] = useState(null);
	const [submitting, setSubmitting] = useState(false);
	const [iconError, setIconError] = useState('');
	const [thumbnailError, setThumbnailError] = useState('');

	const [formData, setFormData] = useState({
		name: '',
		description: '',
		shortDescription: '',
		pros: '',
		cons: '',
		faqs: [],
		url: '',
		categories: [],
		jobRoles: [],
		pricing: 'Free',
		tags: [],
		hasFreePrice: false,
		hasPaidPrice: false,
		paidPrice: '',
		freeTierType: '',
		discounts: '',
		discountCoupon: '',
		refundPolicy: '',
		pricingUrl: '',
		pricingPlans: [],
		contactSocial: {
			facebook: '',
			twitter: '',
			linkedin: '',
			instagram: '',
			youtube: '',
		},
		contactEmail: '',
		contactPhone: '',
		contactPageUrl: '',
		metaTitle: null,
		metaDescription: null,
	});

	useEffect(() => {
		const fetchJobRoles = async () => {
			try {
				const response = await fetch('/api/job-roles');
				if (!response.ok) {
					console.log('Failed to fetch job roles');
					return;
				}
				const data = await response.json();
				setJobRoles(data);
			} catch (error) {
				console.error('Error fetching job roles:', error);
			}
		};

		const fetchCategories = async () => {
			try {
				const response = await fetch('/api/categories');
				if (!response.ok) {
					return;
				}
				const data = await response.json();
				setCategories(data);
			} catch (error) {
				console.error('Error fetching categories:', error);
			}
		};

		fetchCategories();
		fetchJobRoles();
	}, []);

	useEffect(() => {
		if (editMode && editingTool) {
			setSelectedCategories(editingTool.categories || []);
			setSelectedJobRoles(editingTool.jobRoles || []);

			setFormData({
				...editingTool,
				categories: editingTool.categories || [],
				jobRoles: editingTool.jobRoles || [],
				pricing: editingTool.pricing || 'Free',
				hasFreePrice: editingTool.hasFreePrice ?? false,
				hasPaidPrice: editingTool.hasPaidPrice ?? false,
				paidPrice: editingTool.paidPrice ?? '',
				freeTierType: editingTool.freeTierType || '',
				discounts: editingTool.discounts || '',
				discountCoupon: editingTool.discountCoupon || '',
				refundPolicy: editingTool.refundPolicy || '',
				contactSocial: editingTool.contactSocial || {
					facebook: '',
					twitter: '',
					linkedin: '',
					instagram: '',
					youtube: '',
				},
				contactEmail: editingTool.contactEmail || '',
				contactPhone: editingTool.contactPhone || '',
				contactPageUrl: editingTool.contactPageUrl || '',
				pricingUrl: editingTool.pricingUrl || '',
				pricingPlans: editingTool.pricingPlans || [],
				tags: editingTool.tags || [],
				faqs: editingTool.faqs || [],
			});
		}
	}, [editMode, editingTool]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		if (name === 'tags') {
			setFormData({ ...formData, [name]: value.split(',') });
		} else {
			setFormData({ ...formData, [name]: value });
		}
	};

	const handleIconChange = (e) => {
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];
			if (file.size > 5 * 1024 * 1024) {
				// 5MB limit
				setIconError('Icon file size must be less than 5MB');
				return;
			}
			setIconFile(file);
			setIconError('');
		}
	};

	const handleThumbnailChange = (e) => {
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];
			if (file.size > 5 * 1024 * 1024) {
				// 5MB limit
				setThumbnailError('Thumbnail file size must be less than 5MB');
				return;
			}
			setThumbnailFile(file);
			setThumbnailError('');
		}
	};

	const compressImage = (file, maxWidth = 800, quality = 0.8) => {
		return new Promise((resolve) => {
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');
			const img = new Image();

			img.onload = () => {
				const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
				canvas.width = img.width * ratio;
				canvas.height = img.height * ratio;

				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
				canvas.toBlob(resolve, 'image/jpeg', quality);
			};

			img.src = URL.createObjectURL(file);
		});
	};

	const handleJobRoleChange = (e) => {
		const selectedOptions = Array.from(e.target.selectedOptions);
		const newJobRoles = selectedOptions.map((option) => ({
			id: parseInt(option.value),
			name: option.text,
		}));

		setSelectedJobRoles(newJobRoles);
		setFormData({
			...formData,
			jobRoles: newJobRoles,
		});
	};

	const handleCategoryChange = (e) => {
		const selectedOptions = Array.from(e.target.selectedOptions);
		const newCategories = selectedOptions.map((option) => ({
			id: parseInt(option.value),
			name: option.text,
		}));

		setSelectedCategories(newCategories);
		setFormData({
			...formData,
			categories: newCategories,
		});
	};

	const handlePricingChange = (e) => {
		setFormData({ ...formData, pricing: e.target.value });
	};

	const handlePriceCheckboxChange = (e) => {
		const { name, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: checked,
		}));
	};

	const handlePaidPriceChange = (e) => {
		setFormData((prev) => ({
			...prev,
			paidPrice: e.target.value,
		}));
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		setSubmitting(true);
		// Validate FAQs
		const invalidFAQs = formData.faqs.some(
			(faq) => !faq.question.trim() || !faq.answer.trim(),
		);
		if (invalidFAQs) {
			toast.error('Please fill in all FAQ questions and answers');
			setSubmitting(false);
			return;
		}
		if (
			formData.name === '' ||
			formData.shortDescription === '' ||
			formData.description === '' ||
			formData.url === '' ||
			formData.categories.length === 0
		) {
			toast.error('Add necessary data');
			setSubmitting(false);
			return;
		}

		let data = {
			name: formData.name,
			description: formData.description,
			shortDescription: formData.shortDescription,
			pros: formData.pros,
			cons: formData.cons,
			faqs: formData.faqs,
			url: formData.url,
			categories: formData.categories,
			jobRoles: formData.jobRoles,
			pricing: formData.pricing,
			tags: formData.tags,
			hasFreePrice: formData.hasFreePrice,
			hasPaidPrice: formData.hasPaidPrice,
			paidPrice: formData.paidPrice,
			freeTierType: formData.freeTierType,
			discounts: formData.discounts,
			discountCoupon: formData.discountCoupon,
			refundPolicy: formData.refundPolicy,
			contactSocial: formData.contactSocial,
			contactEmail: formData.contactEmail,
			contactPhone: formData.contactPhone,
			contactPageUrl: formData.contactPageUrl,
			pricingUrl: formData.pricingUrl,
			pricingPlans: formData.pricingPlans,
			metaTitle: formData.metaTitle,
			metaDescription: formData.metaDescription,
		};

		if (inputFileRef.current?.files?.length === 0 && !editMode) {
			toast.error('No icon selected');
			setSubmitting(false);
			return;
		}
		if (inputFileRefThumbnail.current?.files?.length === 0 && !editMode) {
			toast.error('No thumbnail selected');
			setSubmitting(false);
			return;
		} else {
			setIconError('');
			setThumbnailError('');

			if (iconFile) {
				const compressedIcon = await compressImage(iconFile);
				const response = await fetch(
					`/api/image/upload?filename=${iconFile.name}`,
					{
						method: 'POST',
						body: compressedIcon,
					},
				);
				const url = (await response.json()).url;
				data = { ...data, icon: url };
			}

			if (thumbnailFile) {
				const compressedThumbnail = await compressImage(thumbnailFile);
				const response = await fetch(
					`/api/image/upload?filename=${thumbnailFile.name}`,
					{
						method: 'POST',
						body: compressedThumbnail,
					},
				);
				const url = (await response.json()).url;
				data = { ...data, thumbnail: url };
			}

			if (editMode && editingTool?.id) {
				// Update tool
				await fetch(`/api/tools/${editingTool.id}`, {
					method: 'PUT',
					body: JSON.stringify(data),
				}).then((res) => {
					if (res.ok) {
						toast.success('Tool updated successfully');
						onSubmitSuccess();
					} else {
						toast.error('Failed to update tool');
					}
					setSubmitting(false);
				});
			} else {
				// Create new tool
				await fetch('/api/tools', {
					method: 'POST',
					body: JSON.stringify(data),
				}).then((res) => {
					if (res.ok) {
						toast.success('Tool added successfully');
						onSubmitSuccess();
					} else {
						toast.error('Failed to add tool');
					}
					setSubmitting(false);
				});
			}
		}
	};

	const handleContactSocialChange = (platform, value) => {
		setFormData((prev) => ({
			...prev,
			contactSocial: {
				...prev.contactSocial,
				[platform]: value,
			},
		}));
	};

	const addFAQ = () => {
		setFormData((prev) => ({
			...prev,
			faqs: [
				...prev.faqs,
				{ question: '', answer: '', order: prev.faqs.length },
			],
		}));
	};

	const removeFAQ = (index) => {
		setFormData((prev) => ({
			...prev,
			faqs: prev.faqs.filter((_, i) => i !== index),
		}));
	};

	const updateFAQ = (index, field, value) => {
		setFormData((prev) => ({
			...prev,
			faqs: prev.faqs.map((faq, i) =>
				i === index ? { ...faq, [field]: value } : faq,
			),
		}));
	};

	if (submitting) {
		return (
			<div className="flex flex-row justify-center items-center">
				<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black dark:border-white"></div>
			</div>
		);
	}

	return (
		<form onSubmit={handleFormSubmit} className="flex flex-col mt-8">
			<div className="mb-6">
				<h3 className="text-lg font-semibold mb-4">Basic Information</h3>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label>Meta Title</label>
						<input
							type="text"
							name="metaTitle"
							placeholder="Meta title"
							value={formData.metaTitle || ''}
							onChange={handleInputChange}
							className="w-full block mb-4 p-2 border"
						/>
					</div>

					<div>
						<label>Meta Description</label>
						<input
							type="text"
							name="metaDescription"
							placeholder="Meta description"
							value={formData.metaDescription || ''}
							onChange={handleInputChange}
							className="w-full block mb-4 p-2 border"
						/>
					</div>
				</div>

				<div>
					<label>
						Name <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						name="name"
						placeholder="Name"
						value={formData.name}
						onChange={handleInputChange}
						className="max-w-lg block mb-4 p-2 border w-full"
					/>
				</div>

				<div>
					<label>
						URL <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						name="url"
						placeholder="URL"
						value={formData.url}
						onChange={handleInputChange}
						className="max-w-lg block mb-4 p-2 border w-full"
					/>
				</div>

				<div className="mb-4">
					<label>
						Short Description <span className="text-red-500">*</span>
					</label>
					<AdvancedEditor
						value={formData.shortDescription}
						onChange={(html) =>
							setFormData({ ...formData, shortDescription: html })
						}
					/>
				</div>

				<div className="mb-4">
					<label>
						Description <span className="text-red-500">*</span>
					</label>
					<AdvancedEditor
						value={formData.description}
						onChange={(html) => setFormData({ ...formData, description: html })}
					/>
				</div>

				<div className="mb-4">
					<label>Pros</label>
					<AdvancedEditor
						value={formData.pros}
						onChange={(html) => setFormData({ ...formData, pros: html })}
					/>
				</div>

				<div className="mb-4">
					<label>Cons</label>
					<AdvancedEditor
						value={formData.cons}
						onChange={(html) => setFormData({ ...formData, cons: html })}
					/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="mb-4">
						<label>
							Icon <span className="text-red-500">*</span>
							<span className="text-sm text-gray-500 ml-2">
								(Size: 32x32px)
							</span>
						</label>
						<input
							type="file"
							ref={inputFileRef}
							onChange={handleIconChange}
							className="block w-full p-2 border"
						/>
						{iconError && <p className="text-red-500 text-sm">{iconError}</p>}
					</div>

					<div className="mb-4">
						<label>
							Thumbnail <span className="text-red-500">*</span>
							<span className="text-sm text-gray-500 ml-2">
								(Size: 566x288px)
							</span>
						</label>
						<input
							type="file"
							ref={inputFileRefThumbnail}
							onChange={handleThumbnailChange}
							className="block w-full p-2 border"
						/>
						{thumbnailError && (
							<p className="text-red-500 text-sm">{thumbnailError}</p>
						)}
					</div>
				</div>
			</div>

			<div className="mb-6">
				<h3 className="text-lg font-semibold mb-4">Categories & Tags</h3>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="mb-4">
						<label>
							Categories <span className="text-red-500">*</span>
						</label>
						<select
							multiple
							value={selectedCategories.map((cat) => cat.id.toString())}
							onChange={handleCategoryChange}
							className="px-4 py-2 mb-2 border rounded-md w-full h-32"
						>
							{categories.map((category) => (
								<option key={category.id} value={category.id}>
									{category.name}
								</option>
							))}
						</select>
						<div className="mb-2">
							<p className="font-medium mb-1">Selected Categories:</p>
							<div className="flex flex-wrap gap-2">
								{selectedCategories.map((cat) => (
									<span
										key={cat.id}
										className="bg-blue-100 text-blue-800 px-2 py-1 rounded"
									>
										{cat.name}
									</span>
								))}
							</div>
						</div>
					</div>

					<div className="mb-4">
						<label>Job Roles</label>
						<select
							multiple
							value={selectedJobRoles.map((role) => role.id.toString())}
							onChange={handleJobRoleChange}
							className="px-4 py-2 mb-2 border rounded-md w-full h-32"
						>
							{jobRoles.map((role) => (
								<option key={role.id} value={role.id}>
									{role.name}
								</option>
							))}
						</select>
						<div className="mb-2">
							<p className="font-medium mb-1">Selected Job Roles:</p>
							<div className="flex flex-wrap gap-2">
								{selectedJobRoles.map((role) => (
									<span
										key={role.id}
										className="bg-purple-100 text-purple-800 px-2 py-1 rounded"
									>
										{role.name}
									</span>
								))}
							</div>
						</div>
					</div>
				</div>

				<div className="mb-4">
					<label>Tags</label>
					<input
						type="text"
						name="tags"
						placeholder="Tags separated by `,`"
						value={formData.tags}
						onChange={handleInputChange}
						className="block w-full mb-4 p-2 border"
					/>
				</div>
			</div>
			<PricingSection
				formData={formData}
				setFormData={setFormData}
				handlePricingChange={handlePricingChange}
				handlePriceCheckboxChange={handlePriceCheckboxChange}
				handlePaidPriceChange={handlePaidPriceChange}
			/>

			<div className="mb-6">
				<div className="flex items-center justify-between mb-4">
					<h3 className="text-lg font-semibold">Frequently Asked Questions</h3>
					<button
						type="button"
						onClick={addFAQ}
						className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
					>
						<svg
							className="w-4 h-4 mr-2"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 4v16m8-8H4"
							/>
						</svg>
						Add FAQ
					</button>
				</div>

				{formData.faqs.length === 0 ? (
					<div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
						<p className="text-sm">
							No FAQs added yet. Click "Add FAQ" to get started.
						</p>
					</div>
				) : (
					<div className="border border-gray-200 rounded-lg bg-gray-50 h-full">
						<div className="p-3 border-b border-gray-200 bg-white rounded-t-lg">
							<div className="flex items-center justify-between">
								<span className="text-sm font-medium text-gray-700">
									{formData.faqs.length} FAQ
									{formData.faqs.length !== 1 ? 's' : ''} added
								</span>
								{formData.faqs.length > 3 && (
									<span className="text-xs text-gray-500">
										Scroll to view all
									</span>
								)}
							</div>
						</div>
						<div
							className="p-4"
							style={
								formData.faqs.length > 3
									? { maxHeight: '800px', overflowY: 'auto' }
									: {}
							}
						>
							<div className="space-y-4">
								{formData.faqs.map((faq, index) => (
									<div
										key={index}
										className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
									>
										<div className="flex items-center justify-between mb-3">
											<div className="flex items-center space-x-2">
												<span className="inline-flex items-center justify-center w-6 h-6 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">
													{index + 1}
												</span>
												<span className="text-sm font-medium text-gray-700">
													FAQ {index + 1}
												</span>
											</div>
											<button
												type="button"
												onClick={() => removeFAQ(index)}
												className="inline-flex items-center p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
												title="Remove FAQ"
											>
												<svg
													className="w-4 h-4"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
													/>
												</svg>
											</button>
										</div>

										<div className="space-y-3">
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-1">
													Question <span className="text-red-500">*</span>
												</label>
												<input
													type="text"
													value={faq.question}
													onChange={(e) =>
														updateFAQ(index, 'question', e.target.value)
													}
													className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
													placeholder="Enter your question here..."
													required
												/>
											</div>

											<div>
												<label className="block text-sm font-medium text-gray-700 mb-1">
													Answer <span className="text-red-500">*</span>
												</label>
												<textarea
													value={faq.answer}
													onChange={(e) =>
														updateFAQ(index, 'answer', e.target.value)
													}
													className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
													placeholder="Enter your answer here..."
													rows={3}
													required
												/>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				)}
			</div>

			<ContactSection
				formData={formData}
				setFormData={setFormData}
				handleInputChange={handleInputChange}
				handleContactSocialChange={handleContactSocialChange}
			/>
			<button
				type="submit"
				className="mt-6 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors w-full md:w-auto"
			>
				{editMode ? 'Update Tool' : 'Add Tool'}
			</button>
		</form>
	);
}

export default ToolForm;
