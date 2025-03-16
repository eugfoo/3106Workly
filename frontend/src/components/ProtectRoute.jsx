import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ requiredUserType }) => {
	const { userInfo } = useSelector((state) => state.auth);

	if (!userInfo) return <Navigate to="/login" />;
	if (requiredUserType && userInfo.userType !== requiredUserType)
		return (
			<Navigate
				to={`/${userInfo.userType}/home`}
				state={{ message: "You are not authorized to access this page." }}
			/>
		);
	return <Outlet />;
};

export default ProtectedRoute;
