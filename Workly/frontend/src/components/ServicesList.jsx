import React, { useState, useEffect } from 'react';

const ServicesList = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        fetch('http://localhost:3000/services')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                setServices(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching services:', err);
                setError(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="p-4">Loading services...</div>;
    if (error) return <div className="p-4 text-red-500">Error loading services.</div>;

    // Pagination logic
    const totalItems = services.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentServices = services.slice(indexOfFirst, indexOfLast);

    const goToPage = (pageNumber) => setCurrentPage(pageNumber);
    const goPrev = () => setCurrentPage(prev => Math.max(prev - 1, 1));
    const goNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">All Services</h2>
            <div className="space-y-4">
                {currentServices.map(service => (
                    <div key={service._id} className="flex border p-4 rounded shadow hover:shadow-lg transition">
                        <div className="w-1/3">
                            {service.images && service.images.length > 0 ? (
                                <img src={`http://localhost:3000/${service.images[0]}`} alt="Service Image"

                                    className="object-cover w-full h-32 rounded"
                                />
                            ) : (
                                <div className="bg-gray-200 w-full h-32 rounded flex items-center justify-center">
                                    No Image
                                </div>
                            )}
                        </div>
                        <div className="w-2/3 pl-4">
                            <h3 className="text-xl font-semibold">{service.title}</h3>
                            <p className="text-gray-700">{service.description}</p>
                            {service.tags && service.tags.length > 0 && (
                                <div className="mt-2 space-x-2">
                                    {service.tags.map((tag, index) => (
                                        <span key={index} className="bg-blue-100 text-blue-700 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-6 space-x-2">
                <button
                    onClick={goPrev}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 border rounded ${currentPage === 1 ? 'text-gray-400 border-gray-300' : 'text-blue-600 border-blue-600 hover:bg-blue-100'}`}
                >
                    Prev
                </button>
                {[...Array(totalPages)].map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => goToPage(idx + 1)}
                        className={`px-3 py-1 border rounded ${currentPage === idx + 1 ? 'bg-blue-600 text-white' : 'text-blue-600 border-blue-600 hover:bg-blue-100'}`}
                    >
                        {idx + 1}
                    </button>
                ))}
                <button
                    onClick={goNext}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 border rounded ${currentPage === totalPages ? 'text-gray-400 border-gray-300' : 'text-blue-600 border-blue-600 hover:bg-blue-100'}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ServicesList;
