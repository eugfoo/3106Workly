import React from "react";
import { Link, useLocation } from "react-router-dom";

const FreelancerSidebar = () => {
	const location = useLocation();

	const isActive = (path) => {
		return location.pathname === path;
	};

	const menuItems = [
		{
			path: "/services/manage",
			icon: "fas fa-briefcase",
			label: "My Services",
		},
		{
			path: "/projects/manage",
			icon: "fas fa-tasks",
			label: "My Projects",
		},
		{
			path: "/services/manage-requests",
			icon: "fas fa-list-alt",
			label: "Manage Requests",
		},
	];

	return (
		<div className="w-64 bg-white fixed left-4 top-24 bottom-4 rounded-lg shadow-lg overflow-hidden">
			<nav className="h-full py-4">
				{menuItems.map((item) => (
					<Link
						key={item.path}
						to={item.path}
						className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 transition-colors ${
							isActive(item.path)
								? "bg-blue-50 border-r-4 border-blue-600 text-blue-600"
								: ""
						}`}
					>
						<i className={`${item.icon} w-5 h-5 mr-3`}></i>
						<span className="font-medium">{item.label}</span>
					</Link>
				))}
			</nav>
		</div>
	);
};

export default FreelancerSidebar;
