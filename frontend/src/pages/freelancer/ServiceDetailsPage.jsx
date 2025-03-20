import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

const ServiceDetailsPage = () => {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const { serviceId } = useParams();

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
            <img
              src="/images/placeholder.png"
              alt="Placeholder"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Service Details */}
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-gray-900">
              {service.title}
            </h1>
            <div className="text-2xl font-bold text-blue-600">
              ${service.price}
            </div>
          </div>

          {/* Category and Duration */}
          <div className="mt-4 flex items-center gap-4">
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded">
              {service.category.capitalize()}
            </span>
            <span className="text-gray-600">
              <i className="fas fa-clock mr-2"></i>
              {service.duration} days
            </span>
          </div>

          {/* Description */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Description
            </h2>
            <p className="text-gray-600">{service.description}</p>
          </div>

          {/* Services Included */}
          {service.servicesIncluded && service.servicesIncluded.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Services Included
              </h2>
              <ul className="list-disc list-inside text-gray-600">
                {service.servicesIncluded.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Additional Services */}
          {service.additionalServices &&
            service.additionalServices.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Additional Services
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.additionalServices.map((item, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h3 className="font-semibold">{item.name}</h3>
                      <div className="flex justify-between mt-2">
                        <span className="text-gray-600">${item.price}</span>
                        <span className="text-gray-600">
                          {item.duration} days
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Search Tags */}
          {service.searchTags && service.searchTags.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {service.searchTags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded"
                  >
                    {tag.capitalize()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsPage;
