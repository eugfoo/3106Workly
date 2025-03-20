import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ServicesList = ({ services }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 8;
	const navigate = useNavigate();

	// Get user info from Redux store
	const { userInfo } = useSelector((state) => state.auth);

	// Pagination logic
	const totalPages = Math.ceil(services.length / itemsPerPage);
	const indexOfLast = currentPage * itemsPerPage;
	const indexOfFirst = indexOfLast - itemsPerPage;
	const currentServices = services.slice(indexOfFirst, indexOfLast);

	const goToPage = (pageNumber) => setCurrentPage(pageNumber);
	const goPrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
	const goNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

	const handleCardClick = (serviceId) => {
		// Route based on user type
		if (!userInfo) {
			// Not logged in
			navigate(`/services/${serviceId}`);
		} else {
			switch (userInfo.userType) {
				case "freelancer":
					navigate(`/freelancer/${serviceId}`);
					break;
				case "admin": // To Do: Update with the correct admin route
					navigate(`/admin/services/${serviceId}`);
					break;
				case "client": // To Do: Update with the correct admin route
				default:
					navigate(`/services/${serviceId}`);
					break;
			}
		}
	};

	// Helper function to strip markdown formatting
	const stripMarkdown = (text) => {
		if (!text) return "";
		const strippedText = text
			.replace(/#{1,6} /g, "") // Remove headers
			.replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold
			.replace(/\*(.*?)\*/g, "$1") // Remove italic
			.replace(/~~(.*?)~~/g, "$1") // Remove strikethrough
			.replace(/- /g, "") // Remove unordered list markers
			.replace(/\d+\. /g, "") // Remove ordered list markers
			.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Remove links
			.replace(/`([^`]+)`/g, "$1") // Remove code blocks
			.trim();
		return strippedText.length > 50
			? `${strippedText.substring(0, 47)}...`
			: strippedText;
	};

	return (
		<div className="p-4">
			<>
				{services.length > 0 ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{currentServices.map((service) => (
							<div
								key={service._id}
								className="border rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-102 bg-white cursor-pointer"
								onClick={() => handleCardClick(service._id)}
							>
								<div className="w-full h-40 overflow-hidden rounded-t-lg">
									{service.images && service.images.length > 0 ? (
										<img
											src={service.images[0]}
											alt="Service Image"
											className="object-cover w-full h-full"
										/>
									) : (
										<div className="w-full h-full bg-gray-200 flex items-center justify-center">
											<span className="text-gray-500">No image available</span>
										</div>
									)}
								</div>
								<div className="p-4">
									<h3 className="text-xl font-semibold text-gray-800">
										{service.title}
									</h3>
									<p className="text-gray-600 mt-2 line-clamp-3">
										{stripMarkdown(service.description)}
									</p>
									<p className="text-sm font-semibold text-gray-600 mt-2 line-clamp-3">
										From ${service.price}
									</p>

									{service.searchTags && service.searchTags.length > 0 && (
										<div className="mt-4 flex flex-wrap gap-2">
											{service.searchTags.map((tag, index) => (
												<span
													key={index}
													className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded"
												>
													{tag}
												</span>
											))}
										</div>
									)}
								</div>
							</div>
						))}
					</div>
				) : (
					<p className="text-2xl font-bold text-gray-600 text-center mt-6">
						No services found.
					</p>
				)}
			</>

			{services.length > 0 && (
				<div className="flex justify-center items-center mt-6 space-x-2">
					<button
						onClick={goPrev}
						disabled={currentPage === 1}
						className={`px-3 py-1 border rounded ${
							currentPage === 1
								? "text-gray-400 border-gray-300"
								: "text-blue-600 border-blue-600 hover:bg-blue-100"
						}`}
					>
						Prev
					</button>
					{[...Array(totalPages)].map((_, idx) => (
						<button
							key={idx}
							onClick={() => goToPage(idx + 1)}
							className={`px-3 py-1 border rounded ${
								currentPage === idx + 1
									? "dark:bg-blue-700 text-white"
									: "text-blue-700 border-blue-700 hover:bg-blue-100"
							}`}
						>
							{idx + 1}
						</button>
					))}
					<button
						onClick={goNext}
						disabled={currentPage === totalPages}
						className={`px-3 py-1 border rounded ${
							currentPage === totalPages
								? "text-gray-400 border-gray-300"
								: "text-blue-600 border-blue-600 hover:bg-blue-100"
						}`}
					>
						Next
					</button>
				</div>
			)}
		</div>
	);
};

export default ServicesList;
