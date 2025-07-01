'use client';
import React, { useEffect, useRef, useState } from 'react';
import DashboardLayout from '@/app/components/DashboardLayout';
import Image from 'next/image';
import { PutBlobResult } from '@vercel/blob';
import { toast } from 'react-toastify';

export const dynamic = 'force-dynamic';

function Tutorials() {
	const [tutorials, setTutorials] = useState<any>([]);
	const inputFileRef = useRef<HTMLInputElement>(null);
	const [formData, setFormData] = useState<any>({
		title: '',
		description: '',
		url: '',
		tags: [''],
	});
	const [editMode, setEditMode] = useState(false);
	const [loading, setLoading] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [editingTool, setEditingTool] = useState<any>(null);
	const [keywords, setKeywords] = useState('');
	const [currentKeywords, setCurrentKeywords] = useState('');

	const fetchTools = async () => {
		setLoading(true);
		try {
			const response = await fetch('/api/tutorial');
			const data = await response.json();
			setTutorials(data);
		} catch (error) {
			toast.error('Failed to fetch tutorials');
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchTools();
	}, []);

	const handleInputChange = (e: { target: { name: any; value: any } }) => {
		const { name, value } = e.target;
		if (name === 'tags') {
			setFormData({ ...formData, [name]: value.split(',') });
		} else {
			setFormData({ ...formData, [name]: value });
		}
	};

	useEffect(() => {
		const fetchKeywords = async () => {
			try {
				const response = await fetch('/api/getKeywords', {
					headers: {
						'Content-Type': 'application/json',
					},
				});
				const data = await response.json();
				if (response.status != 200) return setCurrentKeywords(data.message);
				// Make sure we're storing a string value
				setCurrentKeywords(
					typeof data === 'string' ? data : JSON.stringify(data),
				);
			} catch (error) {
				toast.error('Failed to fetch keywords');
			}
		};
		fetchKeywords();
	}, [keywords]);

	const handleKeywordSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();

		try {
			const res = await fetch('/api/addTutorials', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTHORIZATION_TOKEN}`,
				},
				body: JSON.stringify({ keyword: keywords }),
			});

			if (res.ok) {
				const data = await res.json();
				if (res.status === 200) {
					toast.success(data.message || 'Keywords added successfully');
				} else {
					toast.error(data.message || 'Failed to add keywords');
				}
				setKeywords('');
			} else {
				toast.error(`Error: ${res.statusText}`);
			}
		} catch (error) {
			toast.error('Failed to submit keywords');
		}
	};

	const handleFormSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		const data: any = {
			title: formData.title,
			url: formData.url,
			tags: formData.tags,
		};

		if (data.title === '' || data.url === '') {
			toast.error('Add necessary data');
			return;
		}

		if (inputFileRef.current?.files?.length === 0 && !editMode) {
			toast.error('No Icon Selected');
			return;
		}

		try {
			setSubmitting(true);

			if (inputFileRef.current?.files?.[0]) {
				const response = await fetch(
					`/api/image/upload?filename=${inputFileRef.current.files[0].name}`,
					{
						method: 'POST',
						body: inputFileRef.current.files[0],
					},
				);

				if (!response.ok) {
					throw new Error(`Upload failed: ${response.statusText}`);
				}

				const result = await response.json();
				data.icon = result.url;
			}

			if (editMode && editingTool?.id) {
				await fetch(`/api/tutorial/${editingTool.id}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTHORIZATION_TOKEN}`,
					},
					body: JSON.stringify(data),
				});
				toast.success('Tutorial updated successfully');
			} else {
				await fetch('/api/tutorial', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTHORIZATION_TOKEN}`,
					},
					body: JSON.stringify(data),
				});
				toast.success('Tutorial added successfully');
			}

			setFormData({
				title: '',
				description: '',
				url: '',
				tags: [''],
			});
			setEditMode(false);
			await fetchTools();
		} catch (error) {
			toast.error('Failed to save tutorial');
		} finally {
			setSubmitting(false);
		}
	};

	const handleEdit = (tool: any) => {
		setEditMode(true);
		setEditingTool(tool);
		setFormData(tool);
	};

	const handleDelete = async (id: any) => {
		try {
			setLoading(true);
			const response = await fetch(`/api/tutorial/${id}`, {
				method: 'DELETE',
			});
			const data = await response.json();
			setTutorials(data);
			toast.success('Tutorial deleted successfully');
		} catch (error) {
			toast.error('Failed to delete tutorial');
		} finally {
			setLoading(false);
		}
	};

	return (
		<DashboardLayout>
			<div>
				<h1 className="text-2xl font-bold mb-4">Tutorials</h1>

				{loading ? (
					<div className="flex flex-row justify-center items-center">
						<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black dark:border-white"></div>
					</div>
				) : (
					<div className="bg-white max-h-[80vh] overflow-y-auto">
						<table className="min-w-full bg-white">
							<thead>
								<tr>
									<th className="py-2 px-4">Thumbnail</th>
									<th className="py-2 px-4">Title</th>
									<th className="py-2 px-4">URL</th>
									<th className="py-2 px-4"></th>
								</tr>
							</thead>
							<tbody>
								{tutorials.length > 0 &&
									tutorials.map((tutorial: any) => (
										<tr key={tutorial.id}>
											<td className="border px-4 py-2">
												<Image
													src={tutorial.icon}
													alt={tutorial.title}
													width={128}
													height={128}
													className="w-32 h-32"
												/>
											</td>
											<td className="border px-4 py-2">{tutorial.title}</td>
											<td className="border px-4 py-2">
												<a
													href={tutorial.url}
													target="_blank"
													rel="noopener noreferrer"
												>
													{tutorial.url}
												</a>
											</td>
											<td className="h-auto align-middle border px-4 py-2">
												<div className="flex flex-row">
													<button
														className="bg-blue-500 text-white px-4 py-3 mr-2"
														onClick={() => handleEdit(tutorial)}
													>
														Edit
													</button>
													<button
														className="bg-red-500 text-white px-4 py-2"
														onClick={() => handleDelete(tutorial.id)}
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
				)}

				<h2 className="text-xl font-bold mt-4">Add Tutorial</h2>
				<form onSubmit={handleFormSubmit} className="flex flex-col mt-8">
					{submitting ? (
						<div className="flex flex-row justify-center items-center">
							<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black dark:border-white"></div>
						</div>
					) : (
						<>
							<label>
								Title <span className="text-red-500">*</span>
							</label>
							<input
								type="text"
								name="title"
								placeholder="Title"
								value={formData.title}
								onChange={handleInputChange}
								className="max-w-80 block mb-4 p-2 border"
							/>
							<div className="flex flex-row">
								<span className="pt-2 pr-2">
									Icon: <span className="text-red-500">*</span>
									(Only in case of new tool)
								</span>
								<input
									type="file"
									name="icon"
									placeholder="icon"
									ref={inputFileRef}
									className="block mb-4 p-2 border"
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
							<label>Tags</label>
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
								{editMode ? 'Update Tutorial' : 'Add Tutorial'}
							</button>
						</>
					)}
				</form>

				<form
					onSubmit={handleKeywordSubmit}
					className="flex flex-col gap-[2vh] w-fit mt-10"
				>
					<label className="flex flex-col gap-[2vh] font-bold text-xl">
						Keywords
						<input
							type="text"
							name="keywords"
							value={keywords}
							placeholder="Keywords separated by `,`"
							className="p-2 font-normal text-medium"
							onChange={(e) => setKeywords(e.target.value)}
						/>
					</label>
					<p>Current Value: {currentKeywords.trim().replace(/\s+/g, ',')}</p>
					<input
						type="submit"
						value="Submit Keywords"
						className="p-2 px-4 bg-green-500 text-white w-fit cursor-pointer"
					/>
				</form>
			</div>
		</DashboardLayout>
	);
}

export default Tutorials;
