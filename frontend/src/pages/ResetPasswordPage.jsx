import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPasswordPage = () => {
	const { token } = useParams();
	const navigate = useNavigate();
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			toast.error("Passwords do not match.");
			return;
		}
		try {
			await axios.post(`/api/users/reset-password/${token}`, { newPassword: password });
			toast.success("Password reset successfully!");
			navigate("/login");
		} catch (error) {
			toast.error(error.response.data.message);
		}
	};

	return (
		<section className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="container mx-auto px-4">
				<div className="flex flex-wrap">
					<div className="w-full lg:w-1/2 mx-auto mb-8">
						<div className="text-center">
							<h2 className="text-3xl font-bold">Reset Password</h2>
						</div>
					</div>
				</div>
				<div className="flex justify-center">
					<div className="w-full max-w-md">
						<form onSubmit={handleSubmit}>
							<div className="bg-white p-8 shadow-md rounded-lg">
								<div className="mb-4">
									<h4 className="text-xl font-semibold">Enter New Password</h4>
									<p className="mt-2 text-gray-600">
										Please enter your new password to reset your account.
									</p>
								</div>
								<div className="mb-5">
									<label className="block text-sm font-semibold text-gray-700">New Password</label>
									<input
										type="password"
										className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
										placeholder="Enter new password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
									/>
								</div>
								<div className="mb-5">
									<label className="block text-sm font-semibold text-gray-700">
										Confirm Password
									</label>
									<input
										type="password"
										className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
										placeholder="Confirm password"
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
										required
									/>
								</div>
								<div className="mb-5">
									<button
										className="w-full dark:bg-blue-700 hover:dark:bg-blue-800 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
										type="submit"
									>
										Reset Password
									</button>
								</div>
								<div className="flex flex-col sm:flex-row items-center justify-between mb-5">
									<Link to="/login" className="text-sm text-blue-500 hover:underline">
										Back to Login
									</Link>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ResetPasswordPage;
