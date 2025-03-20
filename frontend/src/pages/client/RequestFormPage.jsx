import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const RequestFormPage = () => {
	const { serviceId } = useParams(); // ✅ Get serviceId from URL
	const navigate = useNavigate();
	const [serviceDetails, setServiceDetails] = useState(null);
	const [loading, setLoading] = useState(true); // ✅ Track loading state
	const [error, setError] = useState(null); // ✅ Track errors

	const [formData, setFormData] = useState({
		description: "",
		additionalServices: {},
	});

	// ✅ Fetch service details (Added Debugging)
	useEffect(() => {
		const fetchServiceDetails = async () => {
			try {
				console.log("Fetching service details for serviceId:", serviceId); // 🛠 Debug Log

				const response = await axios.get(`/api/services/${serviceId}`);
				const serviceData = response.data;

				console.log("Service data received:", serviceData); // 🛠 Debug Log

				// ✅ Validate API response
				if (!serviceData || !serviceData.additionalServices) {
					throw new Error("Invalid service data received");
				}

				setServiceDetails(serviceData);
				setLoading(false); // ✅ Stop loading when data is set

				// ✅ Initialize additional services as unchecked
				const servicesMap = {};
				serviceData.additionalServices.forEach((service) => {
					servicesMap[service] = false;
				});

				setFormData((prev) => ({
					...prev,
					additionalServices: servicesMap,
				}));
			} catch (error) {
				console.error("Error fetching service details:", error); // 🛠 Debug Log
				setError(error.message);
				setLoading(false);
			}
		};

		fetchServiceDetails();
	}, [serviceId]); // ✅ Runs only when serviceId changes

	const handleChange = (e) => {
        const { name, type, checked } = e.target;
    
        if (type === "checkbox") {
            setFormData((prev) => ({
                ...prev,
                additionalServices: {
                    ...prev.additionalServices,
                    [name]: checked, // ✅ Use service name as the key
                },
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: e.target.value }));
        }
    };
    

	const handleSubmit = async (e) => {
        e.preventDefault();
    
        // ✅ Filter only selected additional services
        const selectedAdditionalServices = serviceDetails.additionalServices
            .filter((service) => formData.additionalServices[service.name] === true)
            .map((service) => ({
                name: service.name, // ✅ Store name
                price: service.price, // ✅ Store price
                duration: service.duration, // ✅ Store duration
            }));
    
        const requestData = {
            description: formData.description,
            additionalServices: selectedAdditionalServices, // ✅ Correct format
        };
    
        console.log("Submitting Request:", requestData); // ✅ Debugging Log
    
        try {
            const response = await axios.post(`/api/services/${serviceId}/request`, requestData);
            console.log("Response from server:", response.data); // ✅ Debugging Log
            navigate("/client/home");
        } catch (error) {
            console.error("Error submitting request:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Failed to create request");
        }
    };
    

	// ✅ Handle Loading & Errors
	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="text-center text-red-600 p-6">
				<h2 className="text-2xl font-semibold">Error Loading Page</h2>
				<p>{error}</p>
			</div>
		);
	}

	// ✅ Ensure `serviceDetails` is always defined before rendering
	if (!serviceDetails) {
		return (
			<div className="text-center text-gray-600 p-6">
				<h2 className="text-2xl font-semibold">No Service Details Found</h2>
				<p>Please try again later.</p>
			</div>
		);
	}

	return (
		<div className="bg-gray-50 min-h-screen">
			<div className="bg-white p-6 rounded-md shadow">
				<h2 className="text-2xl font-semibold mb-4">Request Service</h2>
				<form onSubmit={handleSubmit}>
					{/* Project Description */}
					<div>
						<label className="block text-sm font-medium text-gray-700">Project Description</label>
						<textarea
							name="description"
							value={formData.description}
							onChange={handleChange}
							className="w-full p-2 border border-gray-300 rounded-md"
							placeholder="Provide details about your project..."
						/>
					</div>

					{/* ✅ Additional Services (Fixed Rendering Issue) */}
<div>
    <label className="block text-sm font-medium text-gray-700">Additional Services</label>
    {serviceDetails.additionalServices.length > 0 ? (
        <div className="space-y-2">
            {serviceDetails.additionalServices.map((service) => (
                <label key={service._id} className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        name={service.name} // ✅ Use service.name, not full object
                        checked={formData.additionalServices[service.name] || false}
                        onChange={handleChange}
                    />
                    <span>{service.name} - ${service.price} ({service.duration} days)</span> {/* ✅ Show name, price, duration */}
                </label>
            ))}
        </div>
    ) : (
        <p className="text-gray-500 italic">No additional services available</p>
    )}
</div>


					<button type="submit" className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
						Submit Request
					</button>
				</form>
			</div>
		</div>
	);
};

export default RequestFormPage;
