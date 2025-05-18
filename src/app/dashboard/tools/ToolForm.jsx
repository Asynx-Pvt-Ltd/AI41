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
			setIconFile(e.target.files[0]);
		}
	};

	const handleThumbnailChange = (e) => {
		if (e.target.files && e.target.files.length > 0) {
			setThumbnailFile(e.target.files[0]);
		}
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
				const response = await fetch(
					`/api/image/upload?filename=${iconFile.name}`,
					{
						method: 'POST',
						body: iconFile,
					},
				);
				const url = (await response.json()).url;
				data = { ...data, icon: url };
			}

			if (thumbnailFile) {
				const response = await fetch(
					`/api/image/upload?filename=${thumbnailFile.name}`,
					{
						method: 'POST',
						body: thumbnailFile,
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
