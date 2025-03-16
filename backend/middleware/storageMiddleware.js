const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
	destination: "./backend/public/uploads",
	filename: (req, file, cb) => {
		cb(null, Date.now() + "_" + uuidv4() + path.extname(file.originalname));
	},
});

const fileFilter = (req, file, cb) => {
	if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
		req.fileValidationError = "Please upload an image file";
		return cb(null, false);
	}
	cb(null, true);
};

const upload = multer({
	storage: storage,
	limits: { fileSize: 1000000 },
	fileFilter,
});

const uploadImages = (fieldName, fileCount = 1) => (req, res, next) => {
	upload.array(fieldName, fileCount)(req, res, (err) => {
		if (req.fileValidationError) {
			res.status(400).json({ message: req.fileValidationError });
		} else if (err instanceof multer.MulterError) {
			res.status(400).json({ message: err.message });
		} else if (err) {
			res.status(400).json({ message: "An unknown error occurred during file upload." });
		}
		next();
	});
};

module.exports = uploadImages;
