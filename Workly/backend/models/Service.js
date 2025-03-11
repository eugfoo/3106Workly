const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    preferredDetails: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    pricing: { type: Number, required: true },
    description: { type: String },
    services: { type: [String], default: [] },
    timeframe: { type: String },
    images: { type: [String], default: [] },
    isDraft: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
