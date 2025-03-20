import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ServiceForm from "./ServiceFormPage";

const ServiceEditPage = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(`/api/services/${serviceId}`);
        setService(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch service details");
        navigate("/freelancer/home");
      }
    };

    fetchService();
  }, [serviceId, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <ServiceForm isEditing={true} initialData={service} serviceId={serviceId} />
  );
};

export default ServiceEditPage;
