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
        keyDeliverables: { type: String },

        additionalServices: {
            seo: { type: Boolean, default: false },
            cmsSetup: { type: Boolean, default: false },
            hosting: { type: Boolean, default: false },
        },

        finalDeadline: { type: Date },

        legalDocuments: {
            nda: { type: Boolean, default: false },
            ipRights: { type: Boolean, default: false },
        },

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
