import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectRoute";
import MainLayout from "./layouts/MainLayout";
import FreelancerServicePage from "./pages/freelancer/ManageServicePage";
import ServiceFormPage from "./pages/freelancer/ServiceFormPage";
import Home from "./pages/HomePage";
import Login from "./pages/LoginPage";
import Register from "./pages/RegistrationPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ServiceDetailsPage from "./pages/freelancer/ServiceDetailsPage";
import ServiceEditPage from "./pages/freelancer/ServiceEditPage";
import FreelancerLayout from "./layouts/FreelancerLayout";

function App() {
	return (
		<>
			<Routes>
				<Route element={<MainLayout />}>
					{/* General routes */}
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/forgot-password" element={<ForgotPasswordPage />} />
					<Route
						path="/reset-password/:token"
						element={<ResetPasswordPage />}
					/>

					<Route path="/services">
						<Route path=":serviceId" element={<ServiceDetailsPage />} />
						<Route element={<ProtectedRoute requiredUserType="user" />}>
							<Route element={<FreelancerLayout />}>
								<Route path="manage" element={<FreelancerServicePage />} />
							</Route>
							<Route path="create" element={<ServiceFormPage />} />
							<Route path=":serviceId/edit" element={<ServiceEditPage />} />
						</Route>
					</Route>

					<Route
						path="admin"
						element={<ProtectedRoute requiredUserType="admin" />}
					>
						<Route path="home" element={<Home />} />
					</Route>
				</Route>
			</Routes>
			<ToastContainer />
		</>
	);
}

export default App;
