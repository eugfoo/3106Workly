const express = require("express");
const multer = require("multer");
const Service = require("../models/Service");

const router = express.Router();
const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

router.post("/", upload.array('images'), async (req, res) => {
    try {
        console.log("Received data:", req.body);
        const images = req.files ? req.files.map(file => `uploads/${file.filename}`) : [];

        const {
            title,
            preferredDetails,
            tags,
            pricing,
            description,
            services,
            timeframe,
        } = req.body;

        const serviceData = {
            title,
            preferredDetails: typeof preferredDetails === 'string'
                ? preferredDetails.split(',').map(s => s.trim())
                : [],
            tags: typeof tags === 'string'
                ? tags.split(',').map(s => s.trim())
                : [],
            pricing,
            description,
            services: typeof services === 'string'
                ? services.split(',').map(s => s.trim())
                : [],
            timeframe,
            images,
            isDraft: false
        };

        const newService = new Service(serviceData);
        await newService.save();
        res.status(201).json(newService);
    } catch (error) {
        console.error("Error in /services route:", error);
        res.status(500).json({ error: "Failed to create service" });
    }
});

router.post("/draft", upload.array('images'), async (req, res) => {
    try {
        console.log("Received draft data:", req.body);
        const images = req.files ? req.files.map(file => file.path) : [];

        const {
            title,
            preferredDetails,
            tags,
            pricing,
            description,
            services,
            timeframe,
        } = req.body;

        const draftData = {
            title,
            preferredDetails: typeof preferredDetails === 'string'
                ? preferredDetails.split(',').map(s => s.trim())
                : [],
            tags: typeof tags === 'string'
                ? tags.split(',').map(s => s.trim())
                : [],
            pricing,
            description,
            services: typeof services === 'string'
                ? services.split(',').map(s => s.trim())
                : [],
            timeframe,
            images,
            isDraft: true
        };

        const newDraft = new Service(draftData);
        await newDraft.save();
        res.status(201).json(newDraft);
    } catch (error) {
        console.error("Error in /services/draft route:", error);
        res.status(500).json({ error: "Failed to save draft" });
    }
});

router.get("/", async (req, res) => {
    try {
        const services = await Service.find({});
        res.json(services);
    } catch (error) {
        console.error("Error fetching services:", error);
        res.status(500).json({ error: "Failed to fetch services" });
    }
});

module.exports = router;
