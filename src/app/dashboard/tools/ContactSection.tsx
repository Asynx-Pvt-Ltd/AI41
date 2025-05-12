import React from 'react';

const socialPlatforms = [
	{
		name: 'facebook',
		icon: 'M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z',
	},
	{
		name: 'twitter',
		icon: 'M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z',
	},
	{
		name: 'linkedin',
		icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z',
	},
	{
		name: 'instagram',
		icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.148-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.98-6.98.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.667-.072-4.947-.2-4.361-2.618-6.78-6.98-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z',
	},
	{
		name: 'youtube',
		icon: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
	},
];

function ContactSection({
	formData,
	setFormData,
	handleInputChange,
	handleContactSocialChange,
}: any) {
	const handleSocialChange = (platform: any, value: any) => {
		handleContactSocialChange(platform, value);
	};

	return (
		<div className="mb-6">
			<h3 className="text-lg font-semibold mb-4">Contact Information</h3>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
				<div>
					<label>Contact Email</label>
					<input
						type="email"
						name="contactEmail"
						value={formData.contactEmail || ''}
						onChange={handleInputChange}
						className="w-full p-2 border rounded"
						placeholder="contact@example.com"
					/>
				</div>

				<div>
					<label>Contact Phone</label>
					<input
						type="tel"
						name="contactPhone"
						value={formData.contactPhone || ''}
						onChange={handleInputChange}
						className="w-full p-2 border rounded"
						placeholder="+1 (123) 456-7890"
					/>
				</div>
			</div>

			<div className="mb-4">
				<label>Contact Page URL</label>
				<input
					type="url"
					name="contactPageUrl"
					value={formData.contactPageUrl || ''}
					onChange={handleInputChange}
					className="w-full p-2 border rounded"
					placeholder="https://example.com/contact"
				/>
			</div>

			<div className="mb-4">
				<h4 className="font-medium mb-2">Social Media Links</h4>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{socialPlatforms.map((platform) => (
						<div key={platform.name}>
							<label className="flex items-center mb-1">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									className="mr-2 text-gray-600"
									fill="currentColor"
								>
									<path d={platform.icon} />
								</svg>
								{platform.name.charAt(0).toUpperCase() + platform.name.slice(1)}
							</label>
							<input
								type="url"
								value={formData.contactSocial[platform.name] || ''}
								onChange={(e) =>
									handleSocialChange(platform.name, e.target.value)
								}
								className="w-full p-2 border rounded"
								placeholder={`https://${platform.name}.com/yourpage`}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default ContactSection;
