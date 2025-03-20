import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import MDEditor from "@uiw/react-md-editor";

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

const ServiceDetailsPage = () => {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { serviceId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  //   To Do: update relative route for different users if reusing this page
  const getBasePath = () => {
    if (!userInfo) return "/";
    switch (userInfo.userType) {
      case "freelancer":
        return "/freelancer/home";
      case "admin":
        return "/admin/services";
      default:
        return "/";
    }
  };

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await axios.get(`/api/services/${serviceId}`);
        setService(response.data);
        setLoading(false);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch service details"
        );
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [serviceId]);

  const markdownStyles = {
    whiteSpace: "pre-wrap",
    fontSize: "1rem",
    lineHeight: "1.5",
  };

  const markdownContainerStyles = {
    padding: "0",
    background: "transparent",
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/services/${serviceId}`);
      toast.success("Service deleted successfully");
      navigate("/freelancer/home");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete service");
    }
    setShowDeleteModal(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-600">Service not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="flex justify-between items-center mb-8">
        <div className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                to={getBasePath()}
                className="inline-flex items-center text-gray-700 hover:text-blue-600"
              >
                <i className="fas fa-home mr-2"></i>
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <i className="fas fa-chevron-right text-gray-400 mx-2"></i>
                <Link
                  to={getBasePath()}
                  className="text-gray-700 hover:text-blue-600"
                >
                  Services
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <i className="fas fa-chevron-right text-gray-400 mx-2"></i>
                <span className="text-gray-500 truncate max-w-[200px]">
                  {service.title}
                </span>
              </div>
            </li>
          </ol>
        </div>
        {/* Only show edit button if user is logged in, is a freelancer, and created this service */}
        {userInfo?.userType === "freelancer" &&
          userInfo?._id === service?.User && (
            <div className="flex gap-2">
              <Link
                to={`/freelancer/${serviceId}/edit`}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                <i className="fas fa-edit mr-2"></i>
                Edit Service
              </Link>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                <i className="fas fa-trash-alt mr-2"></i>
                Delete Service
              </button>
            </div>
          )}
      </nav>

      {/* Delete Confirmation Modal with backdrop blur */}
      {showDeleteModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Delete Service
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this service? This action cannot
              be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-600 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Sticky */}
        <div className="lg:w-1/2 lg:sticky lg:top-8 lg:self-start">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Image Gallery */}
            <div className="relative h-96">
              {service.images && service.images.length > 0 ? (
                <img
                  src={service.images[0]}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No image available</span>
                </div>
              )}
            </div>

            {/* Basic Information */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-bold text-gray-900">
                  {service.title}
                </h1>
                <div className="text-2xl font-bold text-blue-600">
                  ${service.price}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-4">
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded">
                  {service.category.capitalize()}
                </span>
                <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded">
                  <i className="fas fa-clock mr-2"></i>
                  {service.duration} days
                </span>
              </div>
              <hr className="my-6 border-t border-gray-200" />
              {/* Description/Quick Overview */}
              <div className="mt-4">
                <div
                  data-color-mode="light"
                  className="text-gray-600"
                  style={markdownContainerStyles}
                >
                  <MDEditor.Markdown
                    source={service.description || "No description provided"}
                    style={markdownStyles}
                    className="wmde-markdown wmde-markdown-color"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Scrollable */}
        <div className="lg:w-1/2">
          <div className="space-y-8">
            {/* Questions for Client */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Questions for Client
              </h2>
              <div
                data-color-mode="light"
                className="text-gray-600"
                style={markdownContainerStyles}
              >
                <MDEditor.Markdown
                  source={service.questionPrompt || "No questions specified"}
                  style={markdownStyles}
                  className="wmde-markdown wmde-markdown-color"
                />
              </div>
            </div>

            {/* Services Included */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Services Included
              </h2>
              {service.servicesIncluded &&
              service.servicesIncluded.length > 0 ? (
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  {service.servicesIncluded.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">No services specified</p>
              )}
            </div>

            {/* Additional Services */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Additional Services
              </h2>
              {service.additionalServices &&
              service.additionalServices.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {service.additionalServices.map((item, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <h3 className="font-semibold text-gray-800">
                        {item.name}
                      </h3>
                      <div className="flex justify-between mt-2">
                        <span className="text-blue-600 font-medium">
                          ${item.price}
                        </span>
                        <span className="text-gray-600">
                          <i className="fas fa-clock mr-1"></i>
                          {item.duration} days
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">
                  No additional services available
                </p>
              )}
            </div>

            {/* Search Tags */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Related Tags
              </h2>
              {service.searchTags && service.searchTags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {service.searchTags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded hover:bg-gray-200 transition-colors"
                    >
                      {tag.capitalize()}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No tags available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsPage;
