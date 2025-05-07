'use client';
import React, { useEffect, useRef, useState } from 'react';
import DashboardLayout from '@/app/components/DashboardLayout';
import Image from 'next/image';
import { PutBlobResult } from '@vercel/blob';
import { toast } from 'react-toastify';
import AdvancedEditor from '@/app/components/AdvancedEditor';
export const dynamic = 'force-dynamic';

interface ToolFormData {
	name: string;
	description: string;
	shortDescription: string;
	pros: string;
	cons: string;
	url: string;
	categories: Array<{ id: number; name: string }>;
	jobRoles: Array<{ id: number; name: string }>;
	pricing: string;
	tags: string[];
	hasFreePrice: boolean | null;
	hasPaidPrice: boolean | null;
	paidPrice: string | null;
	metaTitle: string | null;
	metaDescription: string | null;
}

function Tools() {
	const [tools, setTools] = useState<any>([]);
	const inputFileRef = useRef<HTMLInputElement>(null);
	const inputFileRefThumbnail = useRef<HTMLInputElement>(null);
	const [selectedCategories, setSelectedCategories] = useState<
		Array<{ id: number; name: string }>
	>([]);
	const [selectedJobRoles, setSelectedJobRoles] = useState<
		Array<{ id: number; name: string }>
	>([]);

	const [formData, setFormData] = useState<ToolFormData>({
		name: '',
		description: '',
		shortDescription: '',
		pros: '',
		cons: '',
		url: '',
		categories: [],
		jobRoles: [],
		pricing: '',
		tags: [],
		hasFreePrice: false,
		hasPaidPrice: false,
		paidPrice: '',
		metaTitle: null,
		metaDescription: null,
	});

	const [category, setCategory] = useState('');
	const [jobRoles, setJobRoles] = useState<any>([]);
	const [categoryId, setCategoryId] = useState('');
	const [pricing, setPricing] = useState('Free');
	const [categories, setCategories] = useState<any>([]);
	const [iconError, setIconError] = useState<any>('');
	const [thumbnailError, setThumbnailError] = useState<any>('');
	const [editMode, setEditMode] = useState(false);
	const [loading, setLoading] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [editingTool, setEditingTool] = useState<any>(null);
	const [iconFile, setIconFile] = useState<File | null>(null);
	const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

	const fetchTools = async () => {
		setLoading(true);
		setCategory('');
		setPricing('Free');
		const response = await fetch('/api/tools');
		const data = await response.json();
		setTools(data);
		setLoading(false);
	};
	// Fetch tools from the backend
	useEffect(() => {
		fetchTools();
	}, []);

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
			} catch (error: any) {}
		};

		const fetchCategories = async () => {
			try {
				const response = await fetch('/api/categories');
				if (!response.ok) {
					return;
				}
				const data = await response.json();
				setCategories(data);
			} catch (error: any) {}
		};

		fetchCategories();
		fetchJobRoles();
	}, []);

	const handleJobRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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

	// Handle form input changes
	const handleInputChange = (e: { target: { name: any; value: any } }) => {
		const { name, value } = e.target;

		if (name === 'tags') {
			setFormData({ ...formData, [name]: value.split(',') });
		} else {
			setFormData({ ...formData, [name]: value });
		}
	};
	const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setIconFile(e.target.files[0]);
		}
	};

	const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setThumbnailFile(e.target.files[0]);
		}
	};
	// Add or update tool
	const handleFormSubmit = async (e: { preventDefault: () => void }) => {
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

		var data: any = {
			name: formData.name,
			description: formData.description,
			shortDescription: formData.shortDescription,
			pros: formData.pros,
			cons: formData.cons,
			url: formData.url,
			categories: formData.categories,
			jobRoles: formData.jobRoles,
			pricing: formData.pricing || pricing,
			tags: formData.tags,
			hasFreePrice: formData.hasFreePrice,
			hasPaidPrice: formData.hasPaidPrice,
			paidPrice: formData.paidPrice,
			metaTitle: formData.metaTitle,
			metaDescription: formData.metaDescription,
		};

		if (inputFileRef.current?.files?.length === 0 && editMode === false) {
			toast.error('No icon selected');
			setSubmitting(false);
			return;
		}
		if (
			inputFileRefThumbnail.current?.files?.length === 0 &&
			editMode === false
		) {
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
				const url = ((await response.json()) as PutBlobResult).url;
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
				const url = ((await response.json()) as PutBlobResult).url;
				data = { ...data, thumbnail: url };
			}
			if (
				editMode === true &&
				(editingTool?.id !== '' ||
					editingTool?.id !== null ||
					editingTool?.id !== undefined)
			) {
				// Update tool
				await fetch(`/api/tools/${editingTool?.id}`, {
					method: 'PUT',
					body: JSON.stringify(data),
				}).then((res) => {
					setSubmitting(false);
				});
			} else {
				// Create new tool
				await fetch('/api/tools', {
					method: 'POST',
					body: JSON.stringify(data),
				}).then((res) => {
					setSubmitting(false);
				});
			}
		}

		setFormData({
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
			metaTitle: null,
			metaDescription: null,
		});

		setEditMode(false);
		setEditingTool(null);
		setSelectedCategories([]);
		setSelectedJobRoles([]);
		setPricing('Free');

		if (inputFileRef.current) inputFileRef.current.value = '';
		if (inputFileRefThumbnail.current) inputFileRefThumbnail.current.value = '';
		setIconFile(null);
		setThumbnailFile(null);

		fetchTools();
	};

	const handleEdit = (tool: any) => {
		setEditMode(true);
		setEditingTool(tool);
		setSelectedCategories(tool.categories || []);
		setSelectedJobRoles(tool.jobRoles || []);

		if (inputFileRef.current) inputFileRef.current.value = '';
		if (inputFileRefThumbnail.current) inputFileRefThumbnail.current.value = '';

		setIconFile(null);
		setThumbnailFile(null);

		setFormData({
			...tool,
			categories: tool.categories || [],
			jobRoles: tool.jobRoles || [],
			pricing: tool.pricing || 'Free',
			hasFreePrice: tool.hasFreePrice ?? false,
			hasPaidPrice: tool.hasPaidPrice ?? false,
			paidPrice: tool.paidPrice ?? '',
			tags: tool.tags || [],
		});

		setPricing(tool.pricing || 'Free');
	};

	const handleDelete = async (id: any) => {
		setLoading(true);
		fetch(`/api/tools/${id}`, {
			method: 'DELETE',
		})
			.then((res) => res.json())
			.then((d) => {
				setTools(d);
				setLoading(false);
			})
			.catch((err) => {});
	};

	const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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

	const handlePricingChange = (e: { target: { value: string } }) => {
		setPricing(e.target.value);
		setFormData({ ...formData, pricing: e.target.value });
	};

	const handlePriceCheckboxChange = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		const { name, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: checked,
		}));
	};

	const handlePaidPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({
			...prev,
			paidPrice: e.target.value,
		}));
	};

	return (
		<DashboardLayout>
			<div>
				<h1 className="text-2xl font-bold mb-4">Tools</h1>

				<>
					{loading === false ? (
						<div className="bg-white max-h-[80vh] overflow-y-auto">
							<table className="min-w-full bg-white">
								<thead>
									<tr>
										<th className="py-2 px-4">Icon</th>
										<th className="py-2 px-4">Name</th>
										<th className="py-2 px-4">Description</th>
										<th className="py-2 px-4">URL</th>
										<th className="py-2 px-4"></th>
									</tr>
								</thead>
								<tbody>
									{tools.length > 0 &&
										tools?.map((tool: any) => (
											<tr key={tool.id}>
												<td className="border px-4 py-2">
													<Image
														src={tool.icon}
														alt={tool.name}
														width={32}
														height={32}
														className="w-8 h-8"
													/>
												</td>
												<td className="border px-4 py-2">{tool.name}</td>
												<td
													className="border px-4 py-2"
													dangerouslySetInnerHTML={{
														__html:
															tool.description.length > 250
																? `${tool.description.slice(0, 250)}...`
																: tool.description,
													}}
												></td>

												<td className="border px-4 py-2">
													<a
														href={tool.url}
														target="_blank"
														rel="noopener noreferrer"
													>
														{tool.url}
													</a>
												</td>
												<td className="h-auto align-middle border px-4 py-2">
													<div className="flex flex-row">
														<button
															className="bg-blue-500 text-white px-4 py-3 mr-2"
															onClick={() => handleEdit(tool)}
														>
															Edit
														</button>
														<button
															className="bg-red-500 text-white px-4 py-2"
															onClick={() => handleDelete(tool.id)}
														>
															Delete
														</button>
													</div>
												</td>
											</tr>
										))}
								</tbody>
							</table>
						</div>
					) : (
						<div className="flex flex-row justify-center items-center">
							<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black dark:border-white"></div>
						</div>
					)}
				</>

				<h2 className="text-xl font-bold mt-4">Add Tool</h2>
				{/* Add/Edit Form */}
				<form onSubmit={handleFormSubmit} className="flex flex-col mt-8">
					{submitting === false ? (
						<>
							<label>Meta Title</label>
							<input
								type="text"
								name="metaTitle"
								placeholder="meta title"
								value={formData.metaTitle ? formData.metaTitle : ''}
								onChange={handleInputChange}
								className="max-w-52 block mb-4 p-2 border"
							/>
							<label>Meta Description</label>
							<input
								type="text"
								name="metaDescription"
								placeholder="meta description"
								value={formData.metaDescription ? formData.metaDescription : ''}
								onChange={handleInputChange}
								className="max-w-52 block mb-4 p-2 border"
							/>

							<label>
								Name <span className="text-red-500">*</span>
							</label>
							<input
								type="text"
								name="name"
								placeholder="Name"
								value={formData.name}
								onChange={handleInputChange}
								className="max-w-52 block mb-4 p-2 border"
							/>

							<label>
								Short Description <span className="text-red-500">*</span>
							</label>
							{/* <textarea
                name="shortDescription"
                placeholder="Short Description"
                rows={3}
                value={formData.shortDescription}
                onChange={handleInputChange}
                className="block mb-4 p-2 border"
              /> */}
							<AdvancedEditor
								value={formData.shortDescription}
								onChange={(html) =>
									setFormData({ ...formData, shortDescription: html })
								}
							/>
							<label>
								Description <span className="text-red-500">*</span>
							</label>
							{/* <textarea
                name='description'
                placeholder='Description'
                rows={10}
                value={formData.description}
                onChange={handleInputChange}
                className='block mb-4 p-2 border'
              /> */}
							<AdvancedEditor
								value={formData.description}
								onChange={(html) =>
									setFormData({ ...formData, description: html })
								}
							/>
							<div>
								<label>Pros</label>
								<AdvancedEditor
									value={formData.pros}
									onChange={(html) => setFormData({ ...formData, pros: html })}
								/>
								<label>Cons</label>
								<AdvancedEditor
									value={formData.cons}
									onChange={(html) => setFormData({ ...formData, cons: html })}
								/>
							</div>

							<div className="flex flex-row items-center">
								<span className="pt-2 pr-2">
									Icon : <span className="text-red-500">*</span>
									(Only in case of new tool, reomm size 32x32(pixel))
								</span>
								<input
									type="file"
									name="icon"
									placeholder="icon"
									onChange={handleIconChange}
									className={`block mt-px ml-12 p-2 border`}
								/>
							</div>
							<div className="flex flex-row">
								<span className="pt-2 pr-2">
									Thumbnail: <span className="text-red-500">*</span>
									(Only in case of new tool,recomm size - 566x28(pixel))
								</span>
								<input
									type="file"
									name="thumbnail"
									placeholder="Thumbnail"
									onChange={handleThumbnailChange}
									className={`block mt-px p-2 border`}
								/>
							</div>
							<label>
								URL <span className="text-red-500">*</span>
							</label>
							<input
								type="text"
								name="url"
								placeholder="URL"
								value={formData.url}
								onChange={handleInputChange}
								className="max-w-52 block mb-4 p-2 border"
							/>
							<label>
								Categories <span className="text-red-500">*</span>
							</label>
							<select
								multiple
								value={selectedCategories.map((cat) => cat.id.toString())}
								onChange={handleCategoryChange}
								className="px-4 py-2 mb-4 border rounded-md text-gray-700 dark:text-gray-300 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/2 h-32"
							>
								{categories.map((category: { id: number; name: string }) => (
									<option key={category.id} value={category.id}>
										{category.name}
									</option>
								))}
							</select>
							<div className="mb-4">
								<p className="font-medium mb-2">Selected Categories:</p>
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
							<label>Job Roles</label>
							<select
								multiple
								value={selectedJobRoles.map((role) => role.id.toString())}
								onChange={handleJobRoleChange}
								className="px-4 py-2 mb-4 border rounded-md text-gray-700 dark:text-gray-300 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/2 h-32"
							>
								{jobRoles.map((role: { id: number; name: string }) => (
									<option key={role.id} value={role.id}>
										{role.name}
									</option>
								))}
							</select>
							<div className="mb-4">
								<p className="font-medium mb-2">Selected Job Roles:</p>
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
							<label>
								Pricing <span className="text-red-500">*</span>
							</label>
							<select
								value={formData.pricing}
								onChange={handlePricingChange}
								className="px-4 py-2 border rounded-md text-gray-700 dark:text-gray-300 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/2"
							>
								<option value={'Free'}>Free</option>
								<option value={'Fremium'}>Freemium</option>
								<option value={'Paid'}>Paid</option>
							</select>
							<div className="flex flex-col gap-4 mt-4">
								<label className="font-medium">Pricing Options</label>

								<div className="flex items-center gap-4">
									<label className="flex items-center gap-2">
										<input
											type="checkbox"
											name="hasFreePrice"
											checked={formData.hasFreePrice ?? false}
											onChange={handlePriceCheckboxChange}
											className="w-4 h-4"
										/>
										Free Tier
									</label>

									<label className="flex items-center gap-2">
										<input
											type="checkbox"
											name="hasPaidPrice"
											checked={formData.hasPaidPrice ?? false}
											onChange={handlePriceCheckboxChange}
											className="w-4 h-4"
										/>
										Paid Tier
									</label>
								</div>

								{formData.hasPaidPrice && (
									<div className="flex flex-col gap-2">
										<label>Price ($)</label>
										<input
											type="number"
											value={formData.paidPrice ?? ''}
											onChange={handlePaidPriceChange}
											className="max-w-52 p-2 border rounded"
											placeholder="100"
											min="0"
											step="1"
										/>
									</div>
								)}
							</div>

							<label className="mt-4">Tags</label>
							<input
								type="text"
								name="tags"
								placeholder="Tags separated by `,`"
								value={formData.tags}
								onChange={handleInputChange}
								className="max-w-52 block mb-4 p-2 border"
							/>
							<button
								type="submit"
								className="max-w-32 mt-4 bg-green-500 text-white px-4 py-2"
							>
								{editMode ? 'Update Tool' : 'Add Tool'}
							</button>
						</>
					) : (
						<div className="flex flex-row justify-center items-center">
							<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black dark:border-white"></div>
						</div>
					)}
				</form>
			</div>
		</DashboardLayout>
	);
}

export default Tools;
