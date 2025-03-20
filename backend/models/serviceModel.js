const mongoose = require("mongoose");

const additionalServiceSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	duration: {
		type: Number,
		required: true,
	},
});

const serviceSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		searchTags: {
			type: [String],
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		duration: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
		},
		images: {
			type: [String],
		},
		questionPrompt: {
			type: String,
		},
		additionalServices: [additionalServiceSchema],
		User: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
	},
	{
		timestamps: true,
	},
);

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
