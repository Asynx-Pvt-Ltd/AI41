import React from 'react';
import Image from 'next/image';

function ToolsList({ tools, loading, onEdit, onDelete }) {
	if (loading) {
		return (
			<div className="flex flex-row justify-center items-center">
				<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black dark:border-white"></div>
			</div>
		);
	}

	return (
		<div className="bg-white max-h-[80vh] overflow-y-auto">
			<table className="min-w-full bg-white">
				<thead>
					<tr>
						<th className="py-2 px-4">Icon</th>
						<th className="py-2 px-4">Name</th>
						<th className="py-2 px-4">Description</th>
						<th className="py-2 px-4">URL</th>
						<th className="py-2 px-4">Actions</th>
					</tr>
				</thead>
				<tbody>
					{tools.length > 0 &&
						tools?.map((tool) => (
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
									<a href={tool.url} target="_blank" rel="noopener noreferrer">
										{tool.url}
									</a>
								</td>
								<td className="h-auto align-middle border px-4 py-2">
									<div className="flex flex-row">
										<button
											className="bg-blue-500 text-white px-4 py-3 mr-2"
											onClick={() => onEdit(tool)}
										>
											Edit
										</button>
										<button
											className="bg-red-500 text-white px-4 py-2"
											onClick={() => onDelete(tool.id)}
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
	);
}

export default ToolsList;
