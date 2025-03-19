import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../slices/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";

export default function RegisterPage() {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
	});
	const [isFreelancer, setIsFreelancer] = useState(false);

	const navigate = useNavigate();
	const [register, { isLoading }] = useRegisterMutation();
	const dispatch = useDispatch();

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			const userType = isFreelancer ? "freelancer" : "client";
			const res = await register({ ...formData, userType }).unwrap();
			dispatch(setCredentials({ ...res }));
			navigate(`/${userInfo.userType}/home`);
		} catch (err) {
			toast.error(err?.data.message || err.error);
		}
	};

	const { userInfo } = useSelector((state) => state.auth);

	useEffect(() => {
		if (userInfo) {
			navigate(`/${userInfo.userType}/home`);
		}
	}, [userInfo, navigate]);

	return (
		<section className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="w-full max-w-lg p-4">
				<div className="text-center mb-8">
					<h2 className="text-3xl font-bold">{isFreelancer ? "Freelancer" : "Client"} Registration</h2>
				</div>
				<div className="bg-white shadow-md rounded-lg p-8">
					<div className="mb-4 text-center">
						<h4 className="text-xl font-semibold">Let's create your account!</h4>
						<p className="text-gray-600">
							Already have an account?{" "}
							<Link to="/login" className="text-blue-500 hover:underline">
								Login
							</Link>
						</p>
						<div className="flex justify-center mt-4">
							<button
								onClick={() => setIsFreelancer(false)}
								className={`px-3 py-1 rounded-l-lg ${
									!isFreelancer ? "bg-blue-700 text-white" : "bg-gray-200 text-gray-700"
								}`}
							>
								Client
							</button>
							<button
								onClick={() => setIsFreelancer(true)}
								className={`px-3 py-1 rounded-r-lg ${
									isFreelancer ? "bg-blue-700 text-white" : "bg-gray-200 text-gray-700"
								}`}
							>
								Freelancer
							</button>
						</div>
						<p className="text-gray-600">
							{isFreelancer
								? "Offer services to clients to earn cash"
								: "Find freelancers to complete projects"}
						</p>
					</div>

					<form onSubmit={submitHandler}>
						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700">Username</label>
							<input
								type="text"
								className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								placeholder="Enter username"
								value={formData.username}
								onChange={(e) => setFormData({ ...formData, username: e.target.value })}
								required
							/>
						</div>

						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700">Email</label>
							<input
								type="email"
								className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								placeholder="Enter email"
								value={formData.email}
								onChange={(e) => setFormData({ ...formData, email: e.target.value })}
								required
							/>
						</div>

						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700">Password</label>
							<input
								type="password"
								className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								placeholder="Enter password"
								value={formData.password}
								onChange={(e) => setFormData({ ...formData, password: e.target.value })}
								required
							/>
						</div>

						<button
							type="submit"
							disabled={isLoading}
							className={`w-full ${
								isLoading ? "bg-gray-400" : "bg-blue-700 hover:bg-blue-800"
							} text-white font-bold py-2 px-4 rounded flex items-center justify-center`}
						>
							{isLoading ? (
								<i className="fas fa-spinner fa-spin"></i>
							) : (
								<>
									Create Account
								</>
							)}
						</button>

						<div className="flex items-center my-3">
							<hr className="flex-grow border-t border-gray-300" />
							<span className="mx-4 text-gray-500">or</span>
							<hr className="flex-grow border-t border-gray-300" />
						</div>

						<div className="flex flex-col md:flex-row gap-2">
							<button
								type="button"
								className="flex-1 bg-blue-800 hover:bg-blue-900 text-white text-sm font-normal py-2 px-4 rounded flex items-center justify-center"
							>
								<i className="fab fa-facebook-f mr-2" /> Continue with Facebook
							</button>
							<button
								type="button"
								className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm font-normal py-2 px-4 rounded flex items-center justify-center"
							>
								<i className="fab fa-google mr-2" /> Continue with Google
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
}
