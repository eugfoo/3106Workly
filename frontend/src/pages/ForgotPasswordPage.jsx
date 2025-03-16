import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPasswordPage = () => {
	const [email, setEmail] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post("/api/users/forgot-password", { email });
			toast.success("Password reset link sent to your email.");
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
							<h2 className="text-3xl font-bold">Forgot Password</h2>
						</div>
					</div>
				</div>
				<div className="flex justify-center">
					<div className="w-full max-w-md">
						<form onSubmit={handleSubmit}>
							<div className="bg-white p-8 shadow-md rounded-lg">
								<div className="mb-4">
									<h4 className="text-xl font-semibold">Reset Your Password</h4>
									<p className="mt-2 text-gray-600">
										Enter your email to receive a password reset link.
									</p>
								</div>
								<div className="mb-5">
									<label className="block text-sm font-semibold text-gray-700">Email Address</label>
									<input
										type="email"
										className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
										placeholder="Enter email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
									/>
								</div>
								<div className="mb-5">
									<button
										className="w-full dark:bg-blue-700 hover:dark:bg-blue-800 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
										type="submit"
									>
										Send Reset Link
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

export default ForgotPasswordPage;
