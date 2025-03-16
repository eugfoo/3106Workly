const User = require("../models/userModel");

const createAdmin = async() => {
	try {
		const existingAdmin = await User.findOne({ userType: "admin" });
		if (!existingAdmin) {
			const admin = new User({
				username: "admin",
				email: "admin@mail.com",
				password: "password",
				userType: "admin",
			});
			await admin.save();
			console.log("Admin user created successfully.");
		} else {
			console.log("Admin user already exists.");
		}
	} catch (error) {
		console.error("Error creating admin user:", error);
	}
}

module.exports = createAdmin;
