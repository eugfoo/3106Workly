const asyncHandler = require("express-async-handler");
const Service = require("../models/serviceModel");
const ServiceRequest = require("../models/serviceRequestModel");

const createService = asyncHandler(async (req, res) => {
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
		images: req.files
			? req.files.map((file) =>
					file.path
						.replace("backend/public", "")
						.replace("backend\\public", ""),
				)
			: [],
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
		service.additionalServices =
			additionalServices || service.additionalServices;
		service.description = description || service.description;
		service.questionPrompt = questionPrompt || service.questionPrompt;

		if (req.files) {
			service.images = req.files.map((file) =>
				file.path.replace("backend/public", "").replace("backend\\public", ""),
			);
		}

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

const createServiceRequest = asyncHandler(async (req, res) => {
  const { serviceId } = req.params;
  const { description, additionalServices } = req.body;

  console.log("Received Service Request:", req.body); // ✅ Debugging Log

  // ✅ Ensure the service exists
  const service = await Service.findById(serviceId);
  if (!service) {
      console.error("Service not found:", serviceId);
      res.status(404);
      throw new Error("Service not found");
  }

  // ✅ Store only selected additional services in the correct format
  const selectedAdditionalServices = additionalServices.map((service) => ({
      name: service.name,
      price: service.price,
      duration: service.duration,
  }));

  console.log("Final Additional Services:", selectedAdditionalServices); // ✅ Debugging Log

  // ✅ Create service request
  const serviceRequest = new ServiceRequest({
      service: serviceId,
      provider: service.User,
      requester: req.user._id,
      description,
      additionalServices: selectedAdditionalServices, // ✅ Correct format
      status: "pending",
  });

  const createdRequest = await serviceRequest.save();
  console.log("Service request created:", createdRequest); // ✅ Debugging Log

  res.status(201).json(createdRequest);
});



module.exports = {
	createService,
	updateService,
	deleteService,
	getServiceDetails,
	getAllMyServices,
	getServices,
	createServiceRequest,
};
