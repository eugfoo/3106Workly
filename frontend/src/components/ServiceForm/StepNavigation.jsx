import React from "react";
import { useNavigate } from "react-router-dom";

const StepNavigation = ({ currentStep }) => {
	const navigate = useNavigate();

	const handleBack = () => {
		navigate(-1); // Go back one page in history
	};

	return (
		<div className="bg-gray-200 sticky top-0 z-10">
			<div className="max-w-4xl mx-auto px-4 py-4">
				<div className="flex overflow-x-auto pb-2 hide-scrollbar">
					<button onClick={handleBack} className="mr-4 hover:text-blue-600">
						<i className="fas fa-arrow-left"></i> Back
					</button>
					<div
						className={`flex items-center whitespace-nowrap mr-4 ${
							currentStep === 1 ? "text-blue-600" : "text-gray-500"
						}`}
					>
						<div
							className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
								currentStep === 1 ? "bg-blue-600 text-white" : "bg-gray-200"
							}`}
						>
							1
						</div>
						<span className="text-sm md:text-base">Overview</span>
					</div>
					<div
						className={`flex items-center whitespace-nowrap mr-4 ${
							currentStep === 2 ? "text-blue-600" : "text-gray-500"
						}`}
					>
						<div
							className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
								currentStep === 2 ? "bg-blue-600 text-white" : "bg-gray-200"
							}`}
						>
							2
						</div>
						<span className="text-sm md:text-base">Additional Services</span>
					</div>
					<div
						className={`flex items-center whitespace-nowrap mr-4 ${
							currentStep === 3 ? "text-blue-600" : "text-gray-500"
						}`}
					>
						<div
							className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
								currentStep === 3 ? "bg-blue-600 text-white" : "bg-gray-200"
							}`}
						>
							3
						</div>
						<span className="text-sm md:text-base">Other Information</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StepNavigation;
