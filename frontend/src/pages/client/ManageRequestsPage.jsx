import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageRequestsPage = () => {
	const [serviceRequests, setServiceRequests] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchRequests = async () => {
			try {
				const response = await axios.get("/api/services/service-requests"); 
				setServiceRequests(response.data);
				setLoading(false);
			} catch (error) {
				console.error("Failed to fetch service requests:", error);
				setLoading(false);
			}
		};

		fetchRequests();
	}, []);

	return (
		<div className="container mx-auto px-6 py-6">
			<h1 className="text-2xl font-semibold mb-4">Manage Service Requests</h1>

			{/* Loading Spinner */}
			{loading && <p className="text-gray-500">Loading requests...</p>}

			{/* List of Service Requests */}
			<div className="space-y-4">
				{serviceRequests.map((request) => (
					<div key={request._id} className="bg-white p-4 shadow-md rounded-lg flex justify-between items-center">
						{/* Service Info */}
						<div>
							<h2 className="text-lg font-semibold">{request.service.title}</h2>
							<p className="text-gray-500">Requested by {request.requester.name}</p>
						</div>

						{/* Status */}
						<span
							className={`px-3 py-1 rounded-lg text-sm font-medium ${
								request.status === "pending"
									? "bg-yellow-100 text-yellow-700"
									: request.status === "in progress"
									? "bg-blue-100 text-blue-700"
									: request.status === "completed"
									? "bg-green-100 text-green-700"
									: "bg-red-100 text-red-700"
							}`}
						>
							{request.status}
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default ManageRequestsPage;
