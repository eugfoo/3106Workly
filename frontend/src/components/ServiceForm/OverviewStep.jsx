import React from "react";
import MDEditor from "@uiw/react-md-editor";

const OverviewStep = ({
	formData,
	handleChange,
	setFormData,
	customCommands,
}) => {
	return (
		<div className="space-y-4 md:space-y-6">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Title
					</label>
					<input
						type="text"
						name="title"
						value={formData.title}
						onChange={handleChange}
						className="w-full p-2 border border-gray-300 rounded-md"
						placeholder="Service title"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Category
					</label>
					<select
						name="category"
						value={formData.category}
						onChange={handleChange}
						className="w-full p-2 border border-gray-300 rounded-md"
					>
						<option value="">Select A Category</option>
						<option value="Creative Services">Creative Services</option>
						<option value="Writing and Translation">
							Writing and Translation
						</option>
						<option value="Digital Marketing">Digital Marketing</option>
						<option value="Programming and Tech">Programming and Tech</option>
						<option value="Bueiness Services">Business Services</option>
						<option value="Audio and Music Services">
							Audio and Music Services
						</option>
						<option value="Lifestyle and Personal Services">
							Lifestyle and Personal Services
						</option>
					</select>
				</div>
			</div>
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">
					Description
					<br />
					<span className="text-xs text-gray-500">
						Briefly describe your service
					</span>
				</label>
				<div data-color-mode="light">
					<MDEditor
						value={formData.description}
						onChange={(value) =>
							setFormData((prev) => ({ ...prev, description: value }))
						}
						preview="edit"
						height={200}
						commands={customCommands}
						extraCommands={[]}
					/>
				</div>
			</div>

			{/* Wrapped category and project duration in a grid container */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Base Price
					</label>
					<input
						type="number"
						name="price"
						value={formData.price}
						onChange={handleChange}
						className="w-full p-2 border border-gray-300 rounded-md"
						placeholder="Base price of your service"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Estimated Project Duration (Days)
					</label>
					<input
						type="number"
						name="duration"
						value={formData.duration}
						onChange={handleChange}
						className="w-full p-2 border border-gray-300 rounded-md"
						placeholder="Estimated number of days"
					/>
				</div>
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">
					Search Tags
					<br />
					<span className="text-xs text-gray-500">
						Enter up to 5 tags you feel your clients will use when looking for
						your service
					</span>
				</label>
				<input
					type="text"
					name="searchTags"
					value={formData.searchTags}
					onChange={handleChange}
					className="w-full p-2 border border-gray-300 rounded-md"
					placeholder="Enter tags separated by commas (e.g. Photography, Editing, Photoshop)"
				/>
			</div>
		</div>
	);
};

export default OverviewStep;
