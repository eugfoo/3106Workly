import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const RequestFormPage = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);

    const [formData, setFormData] = useState({
        description: "",
        keyDeliverables: "",
        additionalServices: {
            seo: false,
            cmsSetup: false,
            hosting: false,
        },
        finalDeadline: "",
        legalDocuments: {
            nda: false,
            ipRights: false,
        },
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            // Handle checkboxes for additional services & legal documents
            if (name in formData.additionalServices) {
                setFormData((prev) => ({
                    ...prev,
                    additionalServices: {
                        ...prev.additionalServices,
                        [name]: checked,
                    },
                }));
            } else {
                setFormData((prev) => ({
                    ...prev,
                    legalDocuments: {
                        ...prev.legalDocuments,
                        [name]: checked,
                    },
                }));
            }
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/requests", formData);
            navigate("/client/home");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const nextStep = () => setCurrentStep(2);
    const prevStep = () => setCurrentStep(1);

    return (
        <div className="bg-gray-50 min-h-screen">




            {/* Step Navigation */}
            <div className="bg-gray-200 sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex overflow-x-auto pb-2 hide-scrollbar">
                        {/* Step 1: Project Info & Additional Services */}
                        <div className={`flex items-center whitespace-nowrap mr-4 ${currentStep === 1 ? "text-blue-600" : "text-gray-500"}`}>
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${currentStep === 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
                                1
                            </div>
                            <span className="text-sm md:text-base">Project Info & Services</span>
                        </div>

                        {/* Step 2: Final Details & Submit */}
                        <div className={`flex items-center whitespace-nowrap mr-4 ${currentStep === 2 ? "text-blue-600" : "text-gray-500"}`}>
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${currentStep === 2 ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
                                2
                            </div>
                            <span className="text-sm md:text-base">Final Details & Submit</span>
                        </div>
                    </div>
                </div>
            </div>



            {/* Multi-Step Form */}
            <div className="bg-white p-6 rounded-md shadow">
                <form onSubmit={handleSubmit}>
                    {/* 🟢 Step 1: Project Info + Additional Services */}
                    {currentStep === 1 && (
                        <div className="space-y-6">
                            {/* Project Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Project Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="Provide details about your project..."
                                />
                            </div>

                            {/* Key Deliverables */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Key Deliverables</label>
                                <textarea
                                    name="keyDeliverables"
                                    value={formData.keyDeliverables}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="What do you expect as key outcomes?"
                                />
                            </div>

                            {/* Additional Services */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Additional Services</label>
                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2">
                                        <input type="checkbox" name="seo" checked={formData.additionalServices.seo} onChange={handleChange} />
                                        <span>SEO Optimization - SGD 50</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input type="checkbox" name="cmsSetup" checked={formData.additionalServices.cmsSetup} onChange={handleChange} />
                                        <span>CMS Setup & Training - SGD 50</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input type="checkbox" name="hosting" checked={formData.additionalServices.hosting} onChange={handleChange} />
                                        <span>Hosting & Domain Management - SGD 50</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 🟢 Step 2: Final Deadline + Legal Documents */}
                    {currentStep === 2 && (
                        <div className="space-y-6">
                            {/* Final Deadline */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Final Deadline</label>
                                <input
                                    type="date"
                                    name="finalDeadline"
                                    value={formData.finalDeadline}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            {/* Legal Documents */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Legal Documents</label>
                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2">
                                        <input type="checkbox" name="nda" checked={formData.legalDocuments.nda} onChange={handleChange} />
                                        <span>Require NDA?</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input type="checkbox" name="ipRights" checked={formData.legalDocuments.ipRights} onChange={handleChange} />
                                        <span>Require Intellectual Property Rights?</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="mt-6 flex justify-between">
                        {currentStep === 2 ? (
                            <button type="button" onClick={prevStep} className="px-4 py-2 border border-gray-300 rounded-md">
                                Back
                            </button>
                        ) : (
                            <div></div>
                        )}
                        {currentStep === 1 ? (
                            <button type="button" onClick={nextStep} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                Next
                            </button>
                        ) : (
                            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                                Submit Request
                            </button>
                        )}
                    </div>
                </form>
            </div>

        </div>
    );
};

export default RequestFormPage;
