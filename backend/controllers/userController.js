const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const crypto = require("crypto");
const emailjs = require("@emailjs/nodejs");

const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		generateToken(res, user._id);
		res.status(200).json({
			_id: user._id,
			username: user.username,
			email: user.email,
			userType: user.userType,
			profilePicture: user.profilePicture,
		});
	} else {
		res.status(401);
		throw new Error("Invalid user credentials");
	}
});

const registerUser = asyncHandler(async (req, res) => {
	const { username, email, password, userType } = req.body;
	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error("Account already exists");
	}

	const user = await User.create({
		username,
		email,
		password,
		userType,
	});

	if (user) {
		generateToken(res, user._id);
		res.status(201).json({
			_id: user._id,
			username: user.username,
			email: user.email,
			userType: user.userType,
			profilePicture: user.profilePicture,
		});
	} else {
		res.status(400);
		throw new Error("Invalid user data");
	}
});

const logoutUser = asyncHandler(async (req, res) => {
	res.cookie("token", "", {
		httpOnly: true,
		expires: new Date(0),
	});
	res.status(200).json({ message: "User logged out" });
});

const getUserProfile = asyncHandler(async (req, res) => {
	const user = {
		_id: req.user._id,
		username: req.user.username,
		email: req.user.email,
	};
	res.status(200).json(user);
});

const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);
	if (user) {
		user.username = req.body.username || user.username;
		user.email = req.body.email || user.email;
		if (req.body.password) {
			user.password = req.body.password;
		}
		const updatedUser = await user.save();
		res.status(201).json({
			_id: updatedUser._id,
			username: updatedUser.username,
			email: updatedUser.email,
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

const forgotPassword = asyncHandler(async (req, res) => {
	const { email } = req.body;
	const user = await User.findOne({ email });

	if (!user) {
		res.status(404).json({ message: "User not found" });
	}

	// Generate reset token
	const token = crypto.randomBytes(32).toString("hex");
	user.resetToken = token;
	user.tokenExpiration = Date.now() + 3600000; // 1-hour validity
	await user.save();

	// Password reset link
	// ! Change this to frontend URL when deploying
	const resetLink = `http://localhost:5000/reset-password/${token}`;

	emailjs.init({
		publicKey: process.env.EMAILJS_PUBLIC_KEY,
		privateKey: process.env.EMAILJS_PRIVATE_KEY,
	});

	const templateParams = {
		to_email: email, // Ensure this is a valid email address
		to_name: user.name,
		from_name: "Workly Support Team",
		reset_link: resetLink,
	};

	const result = await emailjs.send(
		process.env.EMAILJS_SERVICE_ID,
		process.env.EMAILJS_TEMPLATE_ID,
		templateParams,
		{
			publicKey: process.env.EMAILJS_PUBLIC_KEY,
			privateKey: process.env.EMAILJS_PRIVATE_KEY,
			headers: {
				origin: "http://localhost",
			},
		},
	);

	if (result.status !== 200) {
		res.status(500).json({ message: "Error sending email" });
	} else {
		res.status(200).json({ message: "Password reset link sent to email" });
	}
});

const resetPassword = asyncHandler(async (req, res) => {
	const { token } = req.params;
	const { newPassword } = req.body;

	const user = await User.findOne({
		resetToken: token,
		tokenExpiration: { $gt: Date.now() },
	});

	if (!user) {
		return res.status(400).json({ message: "Invalid or expired token" });
	}

	user.password = newPassword;
	user.resetToken = null;
	user.tokenExpiration = null;
	await user.save();

	res.status(200).json({ message: "Password reset successfully" });
});

module.exports = {
	authUser,
	registerUser,
	logoutUser,
	getUserProfile,
	updateUserProfile,
	forgotPassword,
	resetPassword,
};
