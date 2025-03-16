import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "/slices/authSlice";
import { Link } from "react-router-dom";

const Navbar = () => {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);

	const handleLogout = () => {
		dispatch(logout());
	};

	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [navbarOpen, setNavbarOpen] = useState(false);
	const dropdownRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setDropdownOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<nav className="bg-white border-gray-200 dark:bg-gray-900">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
				<Link to="/" className="flex items-center space-x-3">
					<img src="/worklyLogo.png" className="h-8" alt="Workly Logo" />
					<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Workly</span>
				</Link>

				<div className="flex items-center md:order-2">
					{auth.userInfo ? (
						<div className="relative mr-2">
							<div
								className="flex items-center cursor-pointer"
								onClick={() => setDropdownOpen(!dropdownOpen)}
							>
								<img
									src={auth.userInfo.profilePicture || "/images/placeholder.png"}
									alt="Profile"
									className="w-10 h-10 rounded-full object-cover border border-gray-300 shadow-sm"
								/>
								<svg
									className="w-4 h-4 ml-1 text-gray-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M19 9l-7 7-7-7"
									></path>
								</svg>
							</div>

							{dropdownOpen && (
								<div
									ref={dropdownRef}
									className="absolute right-0 top-12 w-[150px] bg-white border border-gray-200 rounded-lg shadow-lg z-[1000]"
								>
									<ul className="py-1 text-sm text-gray-700">
										<li>
											<Link
												to="/profile"
												className="block px-4 py-2 hover:bg-gray-100 transition-colors"
											>
												Profile
											</Link>
										</li>
										<li>
											<button
												onClick={handleLogout}
												className="w-full text-left block px-4 py-2 hover:bg-gray-100 transition-colors"
											>
												Logout
											</button>
										</li>
									</ul>
								</div>
							)}
						</div>
					) : (
						<div className="flex space-x-2 mr-2">
							<Link to="/login">
								<button
									type="button"
									className="text-white focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-900"
								>
									Login
								</button>
							</Link>
							<Link to="/register">
								<button
									type="button"
									className="text-white focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-700 dark:hover:bg-green-800 dark:focus:ring-green-900"
								>
									Register
								</button>
							</Link>
						</div>
					)}

					<button
						onClick={() => setNavbarOpen(!navbarOpen)}
						type="button"
						className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
						aria-controls="navbar-cta"
						aria-expanded={navbarOpen}
					>
						<span className="sr-only">Open main menu</span>
						<svg
							className="w-5 h-5"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 17 14"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M1 1h15M1 7h15M1 13h15"
							/>
						</svg>
					</button>
				</div>

				<div
					className={`${navbarOpen ? "block" : "hidden"} w-full md:flex md:w-auto md:order-1`}
					id="navbar-cta"
				>
					<ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
						<li>
							<Link
								to="/"
								className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700"
								aria-current="page"
							>
								Home
							</Link>
						</li>
						<li>
							<Link
								to="/about"
								className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white"
							>
								About
							</Link>
						</li>
						<li>
							<Link
								to="/services"
								className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white"
							>
								Services
							</Link>
						</li>
						<li>
							<Link
								to="/contact"
								className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white"
							>
								Contact
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
