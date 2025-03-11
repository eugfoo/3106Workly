import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ServiceForm from './ServiceForm';
import ServicesList from './ServicesList';

const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="p-4">
      {userInfo && (
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create Service
          </button>
        </div>
      )}
      {showForm && <ServiceForm onClose={() => setShowForm(false)} />}
      <ServicesList />
    </div>
  );
};

export default Home;
