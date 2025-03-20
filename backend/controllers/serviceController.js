const asyncHandler = require("express-async-handler");
const Service = require("../models/serviceModel");

const createService = asyncHandler(async (req, res) => {
	console.log(req.body);
	console.log(req.files);
	const {
		title,
		category,
		searchTags,
		price,
		duration,
		servicesIncluded,
		description,
		questionPrompt,
		additionalServices,
	} = req.body;

	const service = await Service.create({
		title,
		category,
		searchTags,
		price,
		duration,
		servicesIncluded,
		description,
		questionPrompt,
		additionalServices,
		images: req.files ? req.files.map((file) => file.path.replace("backend/public", "")) : [],
		User: req.user._id,
	});

	if (service) {
		res.status(200).json({
			_id: service._id,
			message: "Service created",
		});
	} else {
		res.status(400);
		throw new Error("Invalid service data");
	}
});

const updateService = asyncHandler(async (req, res) => {
	const {
		title,
		category,
		searchTags,
		price,
		duration,
		servicesIncluded,
		description,
		questionPrompt,
		additionalServices,
	} = req.body;

	const service = await Service.findById(req.params.id);

	if (service && service.User.toString() === req.user._id.toString()) {
		service.title = title || service.title;
		service.category = category || service.category;
		service.searchTags = searchTags || service.searchTags;
		service.price = price || service.price;
		service.duration = duration || service.duration;
		service.servicesIncluded = servicesIncluded || service.servicesIncluded;
		service.additionalServices = additionalServices || service.additionalServices;
		service.description = description || service.description;
		service.questionPrompt = questionPrompt || service.questionPrompt;

		service.images = req.files
			? req.files.map((file) => file.path.replace("backend/public", ""))
			: [];

		const updatedService = await service.save();

		res.status(200).json({
			_id: updatedService._id,
			message: "Service updated",
		});
	} else {
		res.status(404);
		throw new Error("Service not found");
	}
});

const deleteService = asyncHandler(async (req, res) => {
	const service = await Service.findById(req.params.id);

	if (service && service.User.toString() === req.user._id.toString()) {
		await service.deleteOne();
		res.sendStatus(204);
	} else {
		res.status(404);
		throw new Error("Service not found");
	}
});

const getServiceDetails = asyncHandler(async (req, res) => {
	const service = await Service.findById(req.params.id);

	if (service) {
		res.status(200).json(service);
	} else {
		res.status(404);
		throw new Error("Service not found");
	}
});

const getAllMyServices = asyncHandler(async (req, res) => {
	const services = await Service.find({ User: req.user._id });

	if (services) {
		res.status(200).json(services);
	} else {
		res.status(404);
		throw new Error("No services found");
	}
});

const getServices = asyncHandler(async (req, res) => {
	const services = await Service.find({});

	if (services) {
		res.status(200).json(services);
	} else {
		res.status(404);
		throw new Error("No services found");
	}
});

// request for a service 
const requestService = asyncHandler(async (req, res) => {
    const { message, additionalRequests } = req.body;
    const { id } = req.params; // Service ID from URL

    const service = await Service.findById(id);
    if (!service) {
        res.status(404);
        throw new Error("Service not found");
    }

    const serviceRequest = new ServiceRequest({
        service: id, // Service being requested
        provider: service.User, // Freelancer ID from the service
        requester: req.user._id, // Logged-in user making the request
        message,
        additionalRequests,
        status: "pending",
    });

    const createdRequest = await serviceRequest.save();
    res.status(201).json(createdRequest);
});

module.exports = {
	createService,
	updateService,
	deleteService,
	getServiceDetails,
	getAllMyServices,
	getServices,
	requestService,
};
