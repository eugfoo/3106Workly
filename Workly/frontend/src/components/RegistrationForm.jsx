import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRegisterMutation } from "/slices/usersApiSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const [register, { isLoading }] = useRegisterMutation();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await register(formData).unwrap();
            toast.success("Registration successful. You can now log in.");
            navigate("/login");
        } catch (err) {
            const errorMessage =
                (err && err.data && err.data.message) ||
                (err && err.error) ||
                "Registration failed. Please try again.";
            toast.error(errorMessage);
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-lg p-4">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold">Register</h2>
                    <p className="mt-2 text-gray-600">
                        Give your visitor a smooth online experience with a solid UX design
                    </p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-8">
                    <div className="mb-6">
                        <h4 className="text-xl font-semibold">Let's create your account!</h4>
                        <p className="mt-2 text-gray-600">
                            Already have an account?{" "}
                            <Link to="/login" className="text-blue-500 hover:underline">
                                Log In!
                            </Link>
                        </p>
                    </div>
                    <form onSubmit={submitHandler}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <input
                                type="text"
                                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter username"
                                name="name"
                                value={formData.username}
                                onChange={(e) =>
                                    setFormData({ ...formData, username: e.target.value })
                                }
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter email"
                                name="email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter password"
                                name="password"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({ ...formData, password: e.target.value })
                                }
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
                        >
                            Create Account <i className="fal fa-arrow-right-long ml-2" />
                        </button>
                        <div className="flex items-center my-6">
                            <hr className="flex-grow border-t border-gray-300" />
                            <span className="mx-4 text-gray-500">OR</span>
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
