'use client';
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/app/components/DashboardLayout';
import ToolsList from './ToolsList';
import ToolForm from './ToolForm';
export const dynamic = 'force-dynamic';

function Tools() {
	const [tools, setTools] = useState([]);
	const [loading, setLoading] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [editingTool, setEditingTool] = useState(null);

	const fetchTools = async () => {
		setLoading(true);
		const response = await fetch('/api/tools');
		const data = await response.json();
		setTools(data);
		setLoading(false);
	};

	useEffect(() => {
		fetchTools();
	}, []);

	const handleEdit = (tool: any) => {
		setEditMode(true);
		setEditingTool(tool);
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
			.catch((err) => {
				console.error(err);
				setLoading(false);
			});
	};

	const resetForm = () => {
		setEditMode(false);
		setEditingTool(null);
	};

	return (
		<DashboardLayout>
			<div>
				<h1 className="text-2xl font-bold mb-4">Tools</h1>

				<ToolsList
					tools={tools}
					loading={loading}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>

				<h2 className="text-xl font-bold mt-8">
					{editMode ? 'Edit Tool' : 'Add Tool'}
				</h2>

				<ToolForm
					editMode={editMode}
					editingTool={editingTool}
					onSubmitSuccess={() => {
						resetForm();
						fetchTools();
					}}
				/>
			</div>
		</DashboardLayout>
	);
}

export default Tools;
