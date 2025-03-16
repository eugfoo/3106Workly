import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import ServicesList from "../components/ServicesList";


const Home = () => {
	const [services, setServices] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchServices = async () => {
			try {
				const { data } = await axios.get("/api/services");
				setServices(data);
			} catch (error) {
				console.error("Error fetching services:", error);
				setError("Error fetching services. Please try again later.");
			} finally {
				setLoading(false);
			}
		};
		fetchServices();
	}, []);

	const location = useLocation();
	const toastId = "error-toast";
	const message = location.state?.message;
	useEffect(() => {
		if (message) {
			if (!toast.isActive(toastId)) {
				toast.error(message, { toastId });
			}
		}
	}, [message]);

	return (
		<>
			<div className="flex items-center justify-between mt-8 p-4">
				<h1 className="text-4xl font-bold text-gray-800">View Services</h1>
			</div>
			<ServicesList services={services} />
		</>
	);
};

export default Home;
