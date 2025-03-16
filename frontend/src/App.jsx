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
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
	return (
		<>
			<Routes>
        <Route element={<MainLayout />} >
          {/* General routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          {/* Client routes */}
          <Route path="client" element={<ProtectedRoute requiredUserType="client" />}>
            <Route path="home" element={<Home />} />
          </Route>
          {/* Freelancer routes */}
          <Route path="freelancer" element={<ProtectedRoute requiredUserType="freelancer" />}>
            <Route path="home" element={<FreelancerServicePage />} />
            <Route path="create-service" element={<ServiceFormPage />} />
          </Route>
          {/* Admin routes */}
          <Route path="admin" element={<ProtectedRoute requiredUserType="admin" />}>
            <Route path="home" element={<Home />} />
          </Route>
        </Route>
			</Routes>
      <ToastContainer />
		</>
	);
}

export default App;
