import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdditionalServiceItem from "../../components/AdditionalServiceItem";
import axios from "axios";
import { toast } from "react-toastify";
import MDEditor, { commands } from "@uiw/react-md-editor";

const ServiceForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    duration: "",
    searchTags: "",
    questionPrompt: "",
    images: [],
    additionalServices: [],
  });

  const [imagePreviews, setImagePreviews] = useState([]);

  const addAdditionalService = () => {
    setFormData((prev) => ({
      ...prev,
      additionalServices: [...prev.additionalServices, { name: "", price: "" }],
    }));
  };

  const updateAdditionalService = (index, updatedService) => {
    const updatedServices = [...formData.additionalServices];
    updatedServices[index] = updatedService;
    setFormData((prev) => ({
      ...prev,
      additionalServices: updatedServices,
    }));
  };

  const deleteAdditionalService = (index) => {
    const updatedServices = formData.additionalServices.filter(
      (_, i) => i !== index
    );
    setFormData((prev) => ({
      ...prev,
      additionalServices: updatedServices,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, images: Array.from(e.target.files) }));
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        formData.images.forEach((image) => {
          data.append("images", image);
        });
      } else if (key === "searchTags") {
        formData[key]
          .split(",")
          .map((tag) => tag.trim())
          .forEach((tag) => {
            data.append("searchTags[]", tag);
          });
      } else if (key === "additionalServices") {
        formData[key].forEach((service, index) => {
          Object.keys(service).forEach((serviceKey) => {
            data.append(
              `additionalServices[${index}][${serviceKey}]`,
              service[serviceKey]
            );
          });
        });
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      await axios.post("/api/services", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/freelancer/home");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const nextStep = (e) => {
    e.preventDefault();
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = (e) => {
    e.preventDefault();
    setCurrentStep((prev) => prev - 1);
  };

  // Define individual commands in a single row
  const customCommands = [
    commands.title1,
    commands.title2,
    commands.title3,
    commands.divider,
    commands.bold,
    commands.italic,
    commands.strikethrough,
    commands.divider,
    commands.unorderedListCommand,
    commands.orderedListCommand,
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Step Navigation - More responsive with overflow handling */}
      <div className="bg-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex overflow-x-auto pb-2 hide-scrollbar">
            <div
              className={`flex items-center whitespace-nowrap mr-4 ${
                currentStep === 1 ? "text-blue-600" : "text-gray-500"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                  currentStep === 1 ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                1
              </div>
              <span className="text-sm md:text-base">Overview</span>
            </div>
            <div
              className={`flex items-center whitespace-nowrap mr-4 ${
                currentStep === 2 ? "text-blue-600" : "text-gray-500"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                  currentStep === 2 ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                2
              </div>
              <span className="text-sm md:text-base">Additional Services</span>
            </div>
            <div
              className={`flex items-center whitespace-nowrap mr-4 ${
                currentStep === 3 ? "text-blue-600" : "text-gray-500"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                  currentStep === 3 ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                3
              </div>
              <span className="text-sm md:text-base">Other Information</span>
            </div>
            <div
              className={`flex items-center whitespace-nowrap mr-4 ${
                currentStep === 4 ? "text-blue-600" : "text-gray-500"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                  currentStep === 4 ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                4
              </div>
              <span className="text-sm md:text-base">Publish</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto p-3 md:p-6">
        <div className="bg-white p-4 md:p-8 rounded-md shadow-sm">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Overview */}
            {currentStep === 1 && (
              <div className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Service title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select A Category</option>
                      <option value="design">Design</option>
                      <option value="development">Development</option>
                      <option value="marketing">Marketing</option>
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Description
                  </label>
                  <div data-color-mode="light">
                    <MDEditor
                      value={formData.description}
                      onChange={(value) =>
                        setFormData((prev) => ({ ...prev, description: value }))
                      }
                      preview="edit"
                      height={200}
                      commands={customCommands}
                      extraCommands={[]}
                    />
                  </div>
                </div>

                {/* Wrapped category and project duration in a grid container */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Base Price
                    </label>
                    <input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Base price of your service"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Estimated Project Duration (Days)
                    </label>
                    <input
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Estimated number of days"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Search Tags
                    <br />
                    <span className="text-xs text-gray-500">
                      Enter search tags you feel your clients will use when
                      looking for your service
                    </span>
                  </label>
                  <input
                    type="text"
                    name="searchTags"
                    value={formData.searchTags}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter tags separated by commas (e.g. Photography, Editing, Photoshop)"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Pricing */}
            {currentStep === 2 && (
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Additional Services
                  </label>

                  {formData.additionalServices.length > 0 ? (
                    formData.additionalServices.map((service, index) => (
                      <AdditionalServiceItem
                        key={index}
                        service={service}
                        index={index}
                        onUpdate={updateAdditionalService}
                        onDelete={deleteAdditionalService}
                      />
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 mb-3">
                      No additional services added yet.
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={addAdditionalService}
                    className="text-blue-600 text-sm font-medium flex items-center hover:underline"
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Add another service
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Description */}
            {currentStep === 3 && (
              <div className="space-y-4 md:space-y-6">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Questions for Client
                  </label>
                  <div data-color-mode="light">
                    <MDEditor
                      value={formData.questionPrompt}
                      onChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          questionPrompt: value,
                        }))
                      }
                      preview="edit"
                      height={200}
                      commands={customCommands}
                      extraCommands={[]}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Add Images
                    <br />
                    <span className="text-xs text-gray-500">
                      Showcase your services in a gallery
                    </span>
                  </label>
                  <div className="border border-gray-300 rounded-md p-4 text-center">
                    <input
                      type="file"
                      name="images"
                      onChange={handleFileChange}
                      className="hidden"
                      id="images"
                      multiple
                    />
                    <label htmlFor="images" className="cursor-pointer">
                      <div className="flex justify-center">
                        <svg
                          className="w-8 h-8 text-blue-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          ></path>
                        </svg>
                      </div>
                      <p className="text-sm text-gray-500">Drag/Drop a image</p>
                    </label>
                  </div>
                  {imagePreviews.length > 0 && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-auto rounded-md border"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            {formData.images[index]?.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Publish */}
            {currentStep === 4 && (
              <div className="space-y-4 md:space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-bold">
                    Ready to publish your service?
                  </h2>
                  <p className="text-gray-500 mt-2">
                    Review all information before publishing. Once published,
                    your service will be visible to potential clients.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-6 md:mt-8 flex justify-end">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="mr-2 px-3 py-2 md:px-4 border border-gray-300 rounded-md text-gray-700 text-sm md:text-base"
                >
                  Back
                </button>
              )}
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-3 py-2 md:px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm md:text-base"
                >
                  Save & Continue
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-3 py-2 md:px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm md:text-base"
                >
                  Publish Service
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServiceForm;
