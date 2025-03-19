import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";

export default function LoginForm() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { userInfo } = useSelector((state) => state.auth);
	const [login, { isLoading }] = useLoginMutation();

	useEffect(() => {
		if (userInfo) {
			navigate(`/${userInfo.userType}/home`);
		}
	}, [userInfo, navigate]);

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			const res = await login(formData).unwrap();
			dispatch(setCredentials({ ...res }));
			navigate(`/${userInfo.userType}/home`);
		} catch (err) {
			toast.error(err?.data.message || err.error);
		}
	};

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
		<section className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="container mx-auto px-4">
				<div className="flex flex-wrap">
					<div className="w-full lg:w-1/2 mx-auto mb-8">
						<div className="text-center">
							<h2 className="text-3xl font-bold">Login</h2>
						</div>
					</div>
				</div>
				<div className="flex justify-center">
					<div className="w-full max-w-md">
						<form onSubmit={submitHandler}>
							<div className="bg-white p-8 shadow-md rounded-lg">
								<div className="mb-4">
									<h4 className="text-xl font-semibold">We're glad to see you again!</h4>
									<p className="mt-2 text-gray-600">
										Don't have an account?{" "}
										<Link to="/register" className="text-blue-500 hover:underline">
											Register
										</Link>
									</p>
								</div>
								<div className="mb-5">
									<label className="block text-sm font-semibold text-gray-700">Email Address</label>
									<input
										type="email"
										className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
										placeholder="Enter email"
										value={formData.email}
										onChange={(e) => setFormData({ ...formData, email: e.target.value })}
										required
									/>
								</div>
								<div className="mb-4">
									<label className="block text-sm font-semibold text-gray-700">Password</label>
									<input
										type="password"
										className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
										placeholder="Enter password"
										value={formData.password}
										onChange={(e) => setFormData({ ...formData, password: e.target.value })}
										required
									/>
								</div>
								<div className="flex flex-col sm:flex-row items-center justify-between mb-5">
									<a href="/forgot-password" className="text-sm text-blue-500 hover:underline">
										Forgot password?
									</a>
								</div>
								<div className="flex justify-center items-center"></div>
								<div className="mb-5">
									<button
										className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
										type="submit"
										disabled={isLoading}
									>
										{isLoading ? <i className="fas fa-spinner fa-spin"></i> : <>Login</>}
									</button>
								</div>
								<div className="flex items-center my-5">
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
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
