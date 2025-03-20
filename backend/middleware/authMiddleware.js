const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// Middleware to protect routes by verifying JWT token
const protect = asyncHandler(async (req, res, next) => {
	let token = req.cookies.token;

	if (token) {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			req.user = await User.findById(decoded.userId).select("-password");
			next();
		} catch (error) {
			res.status(401);
			throw new Error("Not authorized, token failed");
		}
	} else {
		res.status(401);
		throw new Error("Not authorized, no token");
	}
});

// Middleware to allow access only to admins
const admin = asyncHandler(async (req, res, next) => {
	if (req.user && req.user.userType === "admin") {
		next();
	} else {
		res.status(403);
		throw new Error("Access denied, admin only");
	}
});

module.exports = { protect, admin };
