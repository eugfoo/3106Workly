const express = require("express");
const {
	createService,
	updateService,
	deleteService,
	getServiceDetails,
	getAllMyServices,
	getServices,
	requestService,
} = require("../controllers/serviceController");
const { protect, freelancer } = require("../middleware/authMiddleware");
const uploadImages = require("../middleware/storageMiddleware");

const router = express.Router();

router.route("/").get(getServices).post(protect, freelancer, uploadImages("images", 5), createService);
router.get("/my-services", protect, freelancer, getAllMyServices);
router
	.route("/:id")
	.get(protect, getServiceDetails)
	.put(protect, freelancer, uploadImages("images"), updateService)
	.delete(protect, freelancer, deleteService)
	.post(protect, requestService); 

module.exports = router;
