const jwt = require("jsonwebtoken");

const generateToken = (res, userId) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "30d", //! Change for production
	});

	res.cookie("token", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		maxAge: 30 * 24 * 60 * 60 * 1000, //! Change for production
	});
};

module.exports = generateToken;
