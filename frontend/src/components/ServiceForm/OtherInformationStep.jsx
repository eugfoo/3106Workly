import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";

const OtherInformationStep = ({ formData, setFormData, customCommands }) => {
	const [imagePreviews, setImagePreviews] = useState([]);
	const handleFileChange = (e) => {
		const files = Array.from(e.target.files);
		setFormData((prev) => ({ ...prev, images: Array.from(e.target.files) }));
		const previews = files.map((file) => URL.createObjectURL(file));
		setImagePreviews(previews);
	};
	return (
		<div className="space-y-4 md:space-y-6">
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">
					Add questions
					<br />
					<span className="text-xs text-gray-500">
						Help clients provide information about what you need to get started on their order
					</span>
				</label>
				<div data-color-mode="light">
					<MDEditor
						value={formData.questionPrompt}
						onChange={(value) =>
							setFormData((prev) => ({
								...prev,
								questionPrompt: value,
							}))
						}
						preview="edit"
						height={200}
						commands={customCommands}
						extraCommands={[]}
					/>
				</div>
				<p className="text-xs text-gray-500 mt-2">
					These questions will be fed into our AI model and regenerated as prompts for your clients
				</p>
			</div>
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">
					Add Images
					<br />
					<span className="text-xs text-gray-500">Showcase your services in a gallery</span>
				</label>
				<div className="border border-gray-300 rounded-md p-4 text-center">
					<input
						type="file"
						name="images"
						onChange={handleFileChange}
						className="hidden"
						id="images"
						multiple
					/>
					<label htmlFor="images" className="cursor-pointer">
						<div className="flex justify-center">
							<svg
								className="w-8 h-8 text-blue-500"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
								></path>
							</svg>
						</div>
						<p className="text-sm text-gray-500">Drag/Drop a image</p>
					</label>
				</div>
				{imagePreviews.length > 0 && (
					<div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
						{imagePreviews.map((preview, index) => (
							<div key={index} className="relative">
								<img
									src={preview}
									alt={`Preview ${index + 1}`}
									className="w-full h-auto rounded-md border"
								/>
								<p className="text-xs text-gray-500 mt-1">{formData.images[index]?.name}</p>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default OtherInformationStep;
