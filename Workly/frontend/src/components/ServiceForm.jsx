import React, { useState } from 'react';

const ServiceForm = ({ onClose }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        title: '',
        preferredDetails: '',
        tags: '',
        pricing: '',
        description: '',
        services: '',
        timeframe: '',
        images: null,
    });
    const [showDraftConfirm, setShowDraftConfirm] = useState(false);

    const steps = ['Basic Info', 'Details', 'Pricing & Timeframe', 'Images'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, images: e.target.files }));
    };

    const nextStep = () => {
        setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    };

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 0));
    };

    // Helper to build FormData from formData state
    const createFormData = () => {
        const data = new FormData();
        data.append('title', formData.title);
        data.append('preferredDetails', formData.preferredDetails);
        data.append('tags', formData.tags);
        data.append('pricing', formData.pricing);
        data.append('description', formData.description);
        data.append('services', formData.services);
        data.append('timeframe', formData.timeframe);

        if (formData.images) {
            for (let i = 0; i < formData.images.length; i++) {
                data.append('images', formData.images[i]);
            }
        }
        return data;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = createFormData();
        try {
            const response = await fetch('http://localhost:3000/services', {
                method: 'POST',
                body: data,
            });
            const result = await response.json();
            console.log('Service created:', result);
            onClose();
        } catch (error) {
            console.error('Error creating service:', error);
        }
    };

    const saveDraft = async () => {
        const data = createFormData();
        try {
            const response = await fetch('http://localhost:3000/services/draft', {
                method: 'POST',
                body: data,
            });
            const result = await response.json();
            console.log('Draft saved:', result);
            setShowDraftConfirm(false);
            onClose();
        } catch (error) {
            console.error('Error saving draft:', error);
        }
    };

    const discardDraft = () => {
        setShowDraftConfirm(false);
        onClose();
    };

    const isFormEmpty = () => {
        return (
            formData.title.trim() === '' &&
            formData.preferredDetails.trim() === '' &&
            formData.tags.trim() === '' &&
            formData.pricing.toString().trim() === '' &&
            formData.description.trim() === '' &&
            formData.services.trim() === '' &&
            formData.timeframe.trim() === '' &&
            (!formData.images || formData.images.length === 0)
        );
    };

    const handleExit = () => {
        if (isFormEmpty()) {
            onClose();
        } else {
            setShowDraftConfirm(true);
        }
    };

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="absolute inset-0 bg-black opacity-50" onClick={handleExit}></div>
                <div className="relative bg-white max-w-2xl w-full p-6 rounded shadow-lg z-10">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">Create Service</h2>
                        <button onClick={handleExit} className="text-gray-500 hover:text-gray-700 text-3xl">
                            &times;
                        </button>
                    </div>
                    <div className="flex justify-between mb-4">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className={`flex-1 text-center py-2 border-b-4 ${index === currentStep ? 'border-blue-600 font-bold' : 'border-gray-300'
                                    }`}
                            >
                                {step}
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleSubmit}>
                        {currentStep === 0 && (
                            <div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Tags (comma separated)</label>
                                    <input
                                        type="text"
                                        name="tags"
                                        value={formData.tags}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    />
                                </div>
                            </div>
                        )}
                        {currentStep === 1 && (
                            <div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">
                                        Preferred Details (comma separated keywords)
                                    </label>
                                    <input
                                        type="text"
                                        name="preferredDetails"
                                        value={formData.preferredDetails}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Services (comma separated)</label>
                                    <input
                                        type="text"
                                        name="services"
                                        value={formData.services}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    />
                                </div>
                            </div>
                        )}
                        {currentStep === 2 && (
                            <div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Pricing</label>
                                    <input
                                        type="number"
                                        name="pricing"
                                        value={formData.pricing}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Timeframe of Service</label>
                                    <input
                                        type="text"
                                        name="timeframe"
                                        value={formData.timeframe}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    />
                                </div>
                            </div>
                        )}
                        {currentStep === 3 && (
                            <div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Images</label>
                                    <input
                                        type="file"
                                        name="images"
                                        onChange={handleFileChange}
                                        className="mt-1 block w-full"
                                        multiple
                                    />
                                </div>
                            </div>
                        )}
                        {/* Navigation Buttons */}
                        <div className="flex justify-between mt-4">
                            {currentStep > 0 && (
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                >
                                    Previous
                                </button>
                            )}
                            {currentStep < steps.length - 1 && (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ml-auto"
                                >
                                    Next
                                </button>
                            )}
                            {currentStep === steps.length - 1 && (
                                <button
                                    type="submit"
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ml-auto"
                                >
                                    Submit
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>

            {showDraftConfirm && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="relative bg-white max-w-md w-full p-6 rounded shadow-lg z-10">
                        <h3 className="text-xl font-bold mb-4">Save as Draft?</h3>
                        <p className="mb-4">Do you want to save your progress as a draft before exiting?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={discardDraft}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                            >
                                No, Discard
                            </button>
                            <button
                                onClick={saveDraft}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Yes, Save Draft
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ServiceForm;
