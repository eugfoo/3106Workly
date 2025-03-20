import React from "react";
import AdditionalServiceItem from "./AdditionalServiceItem";

const AdditionalServicesStep = ({ formData, setFormData }) => {
	const addAdditionalService = () => {
		setFormData((prev) => ({
			...prev,
			additionalServices: [
				...prev.additionalServices,
				{ name: "", price: "", duration: "" },
			],
		}));
	};

	const updateAdditionalService = (index, updatedService) => {
		const updatedServices = [...formData.additionalServices];
		updatedServices[index] = updatedService;
		setFormData((prev) => ({
			...prev,
			additionalServices: updatedServices,
		}));
	};

	const deleteAdditionalService = (index) => {
		const updatedServices = formData.additionalServices.filter(
			(_, i) => i !== index,
		);
		setFormData((prev) => ({
			...prev,
			additionalServices: updatedServices,
		}));
	};

	return (
		<div className="space-y-4 md:space-y-6">
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-3">
					Additional Services
				</label>

				{formData.additionalServices.length > 0 ? (
					formData.additionalServices.map((service, index) => (
						<AdditionalServiceItem
							key={index}
							service={service}
							index={index}
							onUpdate={updateAdditionalService}
							onDelete={deleteAdditionalService}
						/>
					))
				) : (
					<p className="text-sm text-gray-500 mb-3">
						No additional services added yet.
					</p>
				)}

				<button
					type="button"
					onClick={addAdditionalService}
					className="text-blue-600 text-sm font-medium flex items-center hover:underline"
				>
					<svg
						className="w-4 h-4 mr-1"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
							clipRule="evenodd"
						></path>
					</svg>
					Add another service
				</button>
			</div>
		</div>
	);
};

export default AdditionalServicesStep;
