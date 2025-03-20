const mongoose = require("mongoose");

const serviceRequestSchema = mongoose.Schema(
	{
		service: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Service",
			required: true,
		},
		provider: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		requester: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		description: { type: String, required: true },

		// ✅ Store additional services dynamically
		additionalServices: [
			{
				name: { type: String, required: true }, // ✅ Service name (e.g., "Photography")
				price: { type: Number, required: true }, // ✅ Store the price
				duration: { type: Number, required: true }, // ✅ Store the duration
			},
		],

		status: {
			type: String,
			enum: ["pending", "accepted", "rejected", "completed"],
			default: "pending",
		},
	},
	{ timestamps: true }
);

const ServiceRequest = mongoose.model("ServiceRequest", serviceRequestSchema);
module.exports = ServiceRequest;
