// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom"; 
// import { Link } from "react-router-dom";
// import axios from "axios";
// import ServicesList from "../../components/ServicesList";

// const ManageRequestsPage = () => {
//   const [services, setServices] = useState([]);

//   useEffect(() => {
//     const fetchServices = async () => {
//       const { data } = await axios.get("/api/services/my-services");
//       setServices(data);
//     };
//     fetchServices();
//   }, []);

  
  
//   const ManageRequestsPage = () => {
//         const navigate = useNavigate(); // ✅ Define navigate
    
//         const goToRequestForm = () => {
//         navigate("/client/create-request");
//         };
//     };

//   return (
//     <>
//       <div className="flex items-center justify-between mt-8 p-4">
//         <h1 className="text-4xl font-bold text-gray-800">My Services</h1>
        
//         <div className="flex space-x-4">
        
//           {/* New Create Random Request Button */}
//           <button 
//             onClick={handleCreateRequest} 
//             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//           >
//             Create Random Request
//           </button>
//         </div>
//       </div>

//       <ServicesList services={services} />
//     </>
//   );
// };

// export default ManageRequestsPage;
