import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ServicesList from "../../components/ServicesList";

const ManageServicePage = () => {
	const [services, setServices] = useState([]);

	useEffect(() => {
		const fetchServices = async () => {
			const { data } = await axios.get("/api/services/my-services");
			setServices(data);
		};
		fetchServices();
	}, []);

	return (
		<>
			<div className="flex items-center justify-between mt-8 p-4">
				<h1 className="text-4xl font-bold text-gray-800">My Services</h1>
				<Link
					to="/services/create"
					className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 flex items-center space-x-2"
				>
					<i className="fas fa-plus"></i>
					<span>Create Service</span>
				</Link>
			</div>
			<ServicesList services={services} />
		</>
	);
};

export default ManageServicePage;
