import React from "react";
import { Outlet } from "react-router-dom";
import FreelancerSidebar from "../components/FreelancerSidebar";

const FreelancerLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <FreelancerSidebar />
      <div className="ml-72 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default FreelancerLayout;
