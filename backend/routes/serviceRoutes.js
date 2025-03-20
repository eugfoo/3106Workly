const express = require("express");
const {
	createService,
	updateService,
	deleteService,
	getServiceDetails,
	getAllMyServices,
	getServices,
	createServiceRequest,
} = require("../controllers/serviceController");
const { protect } = require("../middleware/authMiddleware");
const uploadImages = require("../middleware/storageMiddleware");

const router = express.Router();

router.route("/").get(getServices).post(protect, uploadImages("images", 5), createService)
router.post("/:serviceId/request", protect, createServiceRequest);

router.get("/my-services", protect, getAllMyServices);
router
	.route("/:id")
	.get(protect, getServiceDetails)
	.put(protect, uploadImages("images"), updateService)
	.delete(protect, deleteService);
	


module.exports = router;
