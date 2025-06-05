import React, { useState } from 'react';

const pastDeliveries = [
    { id: 'DEL-1001', date: '2024-09-25', supplier: 'Saksham Pvt Ltd', destination: 'Bharat Logistics, Gurgaon', items: 50, status: 'Delivered', totalValue: '₹1,50,000' },
    { id: 'DEL-1002', date: '2024-09-22', supplier: 'Akash Electronics', destination: 'Bharat Logistics, Gurgaon', items: 75, status: 'Delivered', totalValue: '₹2,00,000' },
    { id: 'DEL-1003', date: '2024-09-18', supplier: 'TechSupplies Ltd', destination: 'Bharat Logistics, Gurgaon', items: 100, status: 'Delivered', totalValue: '₹3,25,000' },
    { id: 'DEL-1004', date: '2024-09-15', supplier: 'Digital World', destination: 'Bharat Logistics, Gurgaon', items: 60, status: 'Delivered', totalValue: '₹1,80,000' },
    { id: 'DEL-1005', date: '2024-09-10', supplier: 'TechPoint Inc.', destination: 'Bharat Logistics, Gurgaon', items: 85, status: 'Delivered', totalValue: '₹2,50,000' },
  
    { id: 'DEL-1006', date: '2024-09-28', supplier: 'Nice FMCG', destination: 'Bharat Logistics, Gurgaon', items: 90, status: 'Delivered', totalValue: '₹1,75,000' },
    { id: 'DEL-1007', date: '2024-09-30', supplier: 'Hera Ltd', destination: 'Bharat Logistics, Gurgaon', items: 65, status: 'Delivered', totalValue: '₹1,20,000' },
    { id: 'DEL-1008', date: '2024-09-12', supplier: 'Saksham Pvt Ltd', destination: 'Bharat Logistics, Gurgaon', items: 110, status: 'Delivered', totalValue: '₹3,50,000' },
    { id: 'DEL-1009', date: '2024-09-08', supplier: 'Adhya FMCG', destination: 'Bharat Logistics, Gurgaon', items: 95, status: 'Delivered', totalValue: '₹2,30,000' },
    { id: 'DEL-1010', date: '2024-09-03', supplier: 'Nice FMCG', destination: 'Bharat Logistics, Gurgaon', items: 100, status: 'Delivered', totalValue: '₹2,10,000' },
  
    { id: 'DEL-1011', date: '2024-08-30', supplier: 'Hera Ltd', destination: 'Bharat Logistics, Gurgaon', items: 120, status: 'Delivered', totalValue: '₹3,00,000' },
    { id: 'DEL-1012', date: '2024-08-25', supplier: 'Saksham Pvt Ltd', destination: 'Bharat Logistics, Gurgaon', items: 55, status: 'Delivered', totalValue: '₹1,10,000' },
    { id: 'DEL-1013', date: '2024-08-22', supplier: 'Adhya FMCG', destination: 'Bharat Logistics, Gurgaon', items: 85, status: 'Delivered', totalValue: '₹2,60,000' },
    { id: 'DEL-1014', date: '2024-08-18', supplier: 'Nice FMCG', destination: 'Bharat Logistics, Gurgaon', items: 95, status: 'Delivered', totalValue: '₹2,40,000' },
    { id: 'DEL-1015', date: '2024-08-15', supplier: 'Hera Ltd', destination: 'Bharat Logistics, Gurgaon', items: 105, status: 'Delivered', totalValue: '₹2,75,000' },
  
    { id: 'DEL-1016', date: '2024-08-12', supplier: 'Saksham Pvt Ltd', destination: 'Bharat Logistics, Gurgaon', items: 70, status: 'Delivered', totalValue: '₹1,90,000' },
    { id: 'DEL-1017', date: '2024-08-09', supplier: 'Adhya FMCG', destination: 'Bharat Logistics, Gurgaon', items: 120, status: 'Delivered', totalValue: '₹3,20,000' },
    { id: 'DEL-1018', date: '2024-08-05', supplier: 'Nice FMCG', destination: 'Bharat Logistics, Gurgaon', items: 80, status: 'Delivered', totalValue: '₹2,00,000' },
    { id: 'DEL-1019', date: '2024-08-01', supplier: 'Hera Ltd', destination: 'Bharat Logistics, Gurgaon', items: 90, status: 'Delivered', totalValue: '₹2,50,000' },
    { id: 'DEL-1020', date: '2024-07-28', supplier: 'Saksham Pvt Ltd', destination: 'Bharat Logistics, Gurgaon', items: 110, status: 'Delivered', totalValue: '₹3,75,000' },
  ];
  

const PastDeliveryTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate total pages
  const totalPages = Math.ceil(pastDeliveries.length / itemsPerPage);

  // Get deliveries for current page
  const currentDeliveries = pastDeliveries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl w-full font-bold mb-4">Past Deliveries</h1>

      {/* Table */}
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="py-2 px-4 border-b border-gray-200">Delivery ID</th>
            <th className="py-2 px-4 border-b border-gray-200">Date</th>
            <th className="py-2 px-4 border-b border-gray-200">Manufacturer</th>
            <th className="py-2 px-4 border-b border-gray-200">Destination</th>
            <th className="py-2 px-4 border-b border-gray-200">Items</th>
            <th className="py-2 px-4 border-b border-gray-200">Status</th>
            <th className="py-2 px-4 border-b border-gray-200">Total Value</th>
          </tr>
        </thead>
        <tbody>
          {currentDeliveries.map((delivery, index) => (
            <tr
              key={delivery.id}
              className={`${
                index % 2 === 0 ? "bg-[#f7faff]" : "bg-blue-5"
              } text-richblue-600 text-xs font-inter`}
            >
              <td className="py-2 px-4 border-b text-center">{delivery.id}</td>
              <td className="py-2 px-4 border-b text-center">{delivery.date}</td>
              <td className="py-2 px-4 border-b text-center">{delivery.supplier}</td>
              <td className="py-2 px-4 border-b text-center">{delivery.destination}</td>
              <td className="py-2 px-4 border-b text-center">{delivery.items}</td>
              <td className="py-2 px-4 border-b text-center">{delivery.status}</td>
              <td className="py-2 px-4 border-b text-center">{delivery.totalValue}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${
            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${
            currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PastDeliveryTable;
