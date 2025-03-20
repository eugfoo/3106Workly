import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import StepNavigation from "../../components/ServiceForm/StepNavigation";
import OverviewStep from "../../components/ServiceForm/OverviewStep";
import AdditionalServiceStep from "../../components/ServiceForm/AdditionalServicesStep";
import OtherInformationStep from "../../components/ServiceForm/OtherInformationStep";
import { commands } from "@uiw/react-md-editor";

const ServiceForm = ({
	isEditing = false,
	initialData = null,
	serviceId = null,
}) => {
	const navigate = useNavigate();
	const [currentStep, setCurrentStep] = useState(1);

	const [formData, setFormData] = useState(
		isEditing
			? {
					...initialData,
					searchTags: initialData.searchTags.join(", "),
					price: initialData.price.toString(),
					duration: initialData.duration.toString(),
					images: [], // Clear images as we can't populate File objects
				}
			: {
					title: "",
					category: "",
					description: "",
					price: "",
					duration: "",
					searchTags: "",
					questionPrompt: "",
					images: [],
					additionalServices: [],
				},
	);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = new FormData();

		Object.keys(formData).forEach((key) => {
			if (key === "images") {
				formData.images.forEach((image) => {
					data.append("images", image);
				});
			} else if (key === "searchTags") {
				formData[key]
					.split(",")
					.map((tag) => tag.trim())
					.forEach((tag) => {
						data.append("searchTags[]", tag);
					});
			} else if (key === "additionalServices") {
				formData[key].forEach((service, index) => {
					Object.keys(service).forEach((serviceKey) => {
						data.append(
							`additionalServices[${index}][${serviceKey}]`,
							service[serviceKey],
						);
					});
				});
			} else {
				data.append(key, formData[key]);
			}
		});

		try {
			if (isEditing) {
				await axios.put(`/api/services/${serviceId}`, data, {
					headers: { "Content-Type": "multipart/form-data" },
				});
				toast.success("Service updated successfully");
			} else {
				await axios.post("/api/services", data, {
					headers: { "Content-Type": "multipart/form-data" },
				});
				toast.success("Service created successfully");
			}
			navigate("/services/manage");
		} catch (error) {
			toast.error(error.response?.data?.message || "Something went wrong");
		}
	};

	const validateFormData = (formData) => {
		const errors = {};
		if (!formData.title.trim()) {
			errors.title = "Title is required";
		}

		if (!formData.category.trim()) {
			errors.category = "Category is required";
		}

		if (
			!formData.price.trim() ||
			isNaN(formData.price) ||
			Number(formData.price) <= 0
		) {
			errors.price = "Invalid base price";
		}

		if (
			!formData.duration.trim() ||
			isNaN(formData.duration) ||
			Number(formData.duration) <= 0
		) {
			errors.duration = "Invalid estimated duration";
		}

		if (!formData.searchTags.trim()) {
			errors.searchTags = "Search tags are required";
		} else if (formData.searchTags.trim().split(",").length > 5) {
			errors.searchTags = "Search tags limit exceeded";
		}

		if (formData.additionalServices.length > 0) {
			formData.additionalServices.forEach((service, index) => {
				if (!service.name.trim()) {
					errors[`additionalService${index}`] =
						"Additional service name cannot be empty";
				} else if (isNaN(service.price) || Number(service.price) <= 0) {
					errors[`additionalService${index}`] =
						"Invalid additional service price";
				} else if (isNaN(service.duration) || Number(service.duration) <= 0) {
					errors[`additionalService${index}`] =
						"Invalid additional service duration";
				}
			});
		}

		return errors;
	};

	const nextStep = (e) => {
		e.preventDefault();
		const errors = validateFormData(formData);
		if (Object.keys(errors).length > 0) {
			const firstError = Object.values(errors)[0];
			toast.error(firstError);
			return;
		}
		setCurrentStep((prev) => prev + 1);
	};

	const prevStep = (e) => {
		e.preventDefault();
		setCurrentStep((prev) => prev - 1);
	};

	const customCommands = [
		commands.title1,
		commands.title2,
		commands.title3,
		commands.divider,
		commands.bold,
		commands.italic,
		commands.strikethrough,
		commands.divider,
		commands.unorderedListCommand,
		commands.orderedListCommand,
	];

	return (
		<div className="bg-gray-50 min-h-screen">
			<StepNavigation currentStep={currentStep} />
			<div className="max-w-4xl mx-auto p-3 md:p-6">
				<div className="bg-white p-4 md:p-8 rounded-md shadow-sm">
					<form onSubmit={handleSubmit}>
						{/* Step 1: Overview */}
						{currentStep === 1 && (
							<OverviewStep
								formData={formData}
								handleChange={handleChange}
								setFormData={setFormData}
								customCommands={customCommands}
							/>
						)}
						{/* Step 2: Pricing */}
						{currentStep === 2 && (
							<AdditionalServiceStep
								formData={formData}
								setFormData={setFormData}
							/>
						)}
						{/* Step 3: Description */}
						{currentStep === 3 && (
							<OtherInformationStep
								formData={formData}
								setFormData={setFormData}
								customCommands={customCommands}
							/>
						)}
						{/* Navigation Buttons */}
						<div className="mt-6 md:mt-8 flex justify-end">
							{currentStep > 1 && (
								<button
									type="button"
									onClick={prevStep}
									className="mr-2 px-3 py-2 md:px-4 border border-gray-300 rounded-md text-gray-700 text-sm md:text-base"
								>
									Back
								</button>
							)}
							{currentStep < 3 ? (
								<button
									type="button"
									onClick={nextStep}
									className="px-3 py-2 md:px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm md:text-base"
								>
									Continue
								</button>
							) : (
								<button
									type="submit"
									className="px-3 py-2 md:px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm md:text-base"
								>
									{isEditing ? "Confirm Edit" : "Publish Service"}
								</button>
							)}
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ServiceForm;
