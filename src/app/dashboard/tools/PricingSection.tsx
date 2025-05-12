import React, { useState } from 'react';

function PricingSection({
	formData,
	setFormData,
	handlePricingChange,
	handlePriceCheckboxChange,
	handlePaidPriceChange,
}: any) {
	const [showAddPlanModal, setShowAddPlanModal] = useState(false);
	const [planForm, setPlanForm] = useState({
		name: '',
		price: '',
		billingPeriod: 'month',
	});

	const handleFreeTierTypeChange = (e: any) => {
		setFormData((prev: any) => ({
			...prev,
			freeTierType: e.target.value,
		}));
	};

	const handleDiscountsChange = (e: any) => {
		setFormData((prev: any) => ({
			...prev,
			discounts: e.target.value,
		}));
	};

	const handleRefundPolicyChange = (e: any) => {
		setFormData((prev: any) => ({
			...prev,
			refundPolicy: e.target.value,
		}));
	};

	const handlePlanInputChange = (e: any) => {
		const { name, value } = e.target;
		setPlanForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const addPricingPlan = () => {
		if (planForm.name && planForm.price) {
			const newPlan = {
				id: Date.now(),
				name: planForm.name,
				price: planForm.price,
				billingPeriod: planForm.billingPeriod,
			};

			setFormData((prev: any) => ({
				...prev,
				pricingColumns: [...(prev.pricingColumns || []), newPlan],
			}));

			setPlanForm({
				name: '',
				price: '',
				billingPeriod: 'month',
			});

			setShowAddPlanModal(false);
		}
	};

	const removePricingPlan = (planId: any) => {
		setFormData((prev: any) => ({
			...prev,
			pricingColumns: prev.pricingColumns.filter(
				(plan: any) => plan.id !== planId,
			),
		}));
	};

	// Generic input change handler for fields like pricingUrl
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev: any) => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<div className="mb-6">
			<h3 className="text-lg font-semibold mb-4">Pricing Information</h3>

			<div className="mb-4">
				<label>
					Pricing Type <span className="text-red-500">*</span>
				</label>
				<select
					value={formData.pricing}
					onChange={handlePricingChange}
					className="px-4 py-2 border rounded-md w-full md:w-1/2"
				>
					<option value="Free">Free</option>
					<option value="Fremium">Freemium</option>
					<option value="Paid">Paid</option>
				</select>
			</div>

			<div className="mb-4">
				<div className="flex items-center gap-4 mb-2">
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

				{formData.hasFreePrice && (
					<div className="mb-4">
						<label>Free Tier Type</label>
						<input
							type="text"
							value={formData.freeTierType}
							onChange={handleFreeTierTypeChange}
							className="w-full p-2 border rounded"
							placeholder="e.g. 7-day trial, limited features, etc."
						/>
					</div>
				)}

				{formData.hasPaidPrice && (
					<div className="mb-4">
						<label>Base Price ($)</label>
						<input
							type="number"
							value={formData.paidPrice ?? ''}
							onChange={handlePaidPriceChange}
							className="w-full md:w-1/3 p-2 border rounded"
							placeholder="100"
							min="0"
							step="1"
						/>
					</div>
				)}
			</div>

			<div className="mb-4">
				<div className="flex justify-between items-center mb-2">
					<label className="font-medium">Pricing Plans</label>
					<button
						type="button"
						onClick={() => setShowAddPlanModal(true)}
						className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
					>
						Add Plan
					</button>
				</div>

				{formData.pricingColumns && formData.pricingColumns.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{formData.pricingColumns.map((plan: any) => (
							<div key={plan.id} className="border rounded p-3 relative">
								<button
									type="button"
									onClick={() => removePricingPlan(plan.id)}
									className="absolute top-2 right-2 text-red-500 font-bold"
								>
									×
								</button>
								<h4 className="font-semibold">{plan.name}</h4>
								<p className="text-lg font-medium">
									${plan.price}/{plan.billingPeriod}
								</p>
							</div>
						))}
					</div>
				) : (
					<p className="text-gray-500 italic">No pricing plans added yet.</p>
				)}

				{showAddPlanModal && (
					<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
						<div className="bg-white p-6 rounded-lg shadow-xl w-96">
							<h3 className="text-lg font-semibold mb-4">Add Pricing Plan</h3>

							<div className="mb-4">
								<label className="block mb-2">Plan Name</label>
								<input
									type="text"
									name="name"
									value={planForm.name}
									onChange={handlePlanInputChange}
									className="w-full p-2 border rounded"
									placeholder="e.g. Pro Plan, Basic, Enterprise"
								/>
							</div>

							<div className="mb-4">
								<label className="block mb-2">Price</label>
								<div className="flex items-center">
									<span className="mr-2">$</span>
									<input
										type="number"
										name="price"
										value={planForm.price}
										onChange={handlePlanInputChange}
										className="w-full p-2 border rounded"
										placeholder="0"
										min="0"
										step="0.01"
									/>
								</div>
							</div>

							<div className="mb-4">
								<label className="block mb-2">Billing Period</label>
								<select
									name="billingPeriod"
									value={planForm.billingPeriod}
									onChange={handlePlanInputChange}
									className="w-full p-2 border rounded"
								>
									<option value="month">Monthly</option>
									<option value="year">Yearly</option>
									<option value="one-time">One-time</option>
								</select>
							</div>

							<div className="flex justify-end space-x-2">
								<button
									type="button"
									onClick={() => setShowAddPlanModal(false)}
									className="px-4 py-2 bg-gray-200 rounded"
								>
									Cancel
								</button>
								<button
									type="button"
									onClick={addPricingPlan}
									className="px-4 py-2 bg-blue-500 text-white rounded"
								>
									Add Plan
								</button>
							</div>
						</div>
					</div>
				)}
			</div>

			<div className="mb-4">
				<label>Discounts</label>
				<textarea
					value={formData.discounts}
					onChange={handleDiscountsChange}
					className="w-full p-2 border rounded"
					placeholder="Describe any available discounts"
					rows={3}
				/>
			</div>

			<div className="mb-4">
				<label>Refund Policy</label>
				<textarea
					value={formData.refundPolicy}
					onChange={handleRefundPolicyChange}
					className="w-full p-2 border rounded"
					placeholder="Describe your refund policy"
					rows={3}
				/>
			</div>

			<div className="mb-4">
				<label>Pricing URL</label>
				<input
					type="url"
					name="pricingUrl"
					value={formData.pricingUrl || ''}
					onChange={handleInputChange}
					className="w-full p-2 border rounded"
					placeholder="Link to detailed pricing page"
				/>
			</div>
		</div>
	);
}

export default PricingSection;
