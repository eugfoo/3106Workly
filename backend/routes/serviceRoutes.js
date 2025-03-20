const express = require("express");
const {
  createService,
  updateService,
  deleteService,
  getServiceDetails,
  getAllMyServices,
  getServices,
} = require("../controllers/serviceController");
const { protect, freelancer } = require("../middleware/authMiddleware");
const uploadImages = require("../middleware/storageMiddleware");

const router = express.Router();

router
  .route("/")
  .get(getServices)
  .post(protect, freelancer, uploadImages("images", 5), createService);
router.get("/my-services", protect, freelancer, getAllMyServices);
router
  .route("/:id")
  .get(getServiceDetails)
  .put(protect, freelancer, uploadImages("images", 5), updateService)
  .delete(protect, freelancer, deleteService);

module.exports = router;
