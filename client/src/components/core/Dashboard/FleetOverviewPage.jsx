import React, { useState } from "react";
import { FaRegArrowAltCircleDown } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { fetchDepartedFleetDetails } from "../../../services/oparations/YardAPI";
import { useEffect } from "react";

// Component for a single truck card
const TruckCard = ({ truck, isAlternate }) => {
  const [showProducts, setShowProducts] = useState(false);

  return (
    <div
      className={`p-6 shadow-lg border rounded-lg ${
        isAlternate ? "bg-[#f0f8ff]" : "bg-white"
      }`}
    >
      <div className="flex justify-between items-start">
        {/* Left Section */}
        <div className="flex flex-col gap-y-2">
          <p className="text-lg font-bold text-blue-800">
            License Number: {truck.id}
          </p>
          <p className="text-sm text-richblue-900">Driver: {truck.driverName}</p>
          <p className="text-sm text-richblue-900">
            Arrival Time: {truck.arrivalTime}
          </p>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-end text-right gap-y-2">
          <p className="text-md font-bold text-richblue-900">
            Purpose: {truck.status}
          </p>
          <p className="text-sm text-richblue-900">
            Departure Time: {truck.departureTime || "N/A"}
          </p>
          <button
            className="flex items-center gap-x-2 text-blue-900 underline"
            onClick={() => setShowProducts(!showProducts)}
          >
            {showProducts ? "Hide" : "Show"} Products
            {showProducts ? <FaRegArrowAltCircleUp className="text-blue-900 h-5 w-5"/> :<FaRegArrowAltCircleDown className="text-blue-900 h-5 w-5"/> }
          </button>
        </div>
      </div>

      {/* Product List */}
      {showProducts && (
        <div className="mt-4 border-t pt-2">
          <table className="w-full text-sm text-left">
            <thead>
              <tr>
                <th className="border px-3 py-2">Product ID</th>
                <th className="border px-3 py-2">Name</th>
                <th className="border px-3 py-2">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {truck.productList.map((product, index) => (
                <tr
                  key={product.id}
                  className={`${
                    index % 2 === 0 ? "bg-[#dcecff]" : "bg-blue-50"
                  } text-richblue-600`}
                >
                  <td className="border px-3 py-2">{product.id}</td>
                  <td className="border px-3 py-2">{product.name}</td>
                  <td className="border px-3 py-2">{product.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Main FleetOverviewPage Component
const FleetOverviewPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile?.user || null);
  const departedFleets = useSelector((state) => state.departedFleet?.departedFleets || []);
  
  useEffect(() => {
    if (user?._id) {
      dispatch(fetchDepartedFleetDetails({ managerId: user._id }));
    }
  }, [dispatch, user]);

  console.log("Data received from departedFleet API is :",departedFleets);
  // Dummy fleet data
  const fleetData = [
    {
      id: "MH12AB1234",
      driverName: "Ajay Sharma",
      arrivalTime: "2024-10-16 09:00 AM",
      departureTime: "2024-10-16 03:00 PM",
      status: "Loading",
      productList: [
        { id: "P123", name: "Coca-Cola (2L)", quantity: 200 },
        { id: "P124", name: "Water Bottles", quantity: 150 },
      ],
    },
    {
      id: "MH34CD5678",
      driverName: "Vijay Ghogle",
      arrivalTime: "2024-10-16 10:00 AM",
      departureTime: "2024-10-16 05:00 PM",
      status: "Unloading",
      productList: [
        { id: "P125", name: "Tiffin Boxes", quantity: 85 },
        { id: "P126", name: "Juice Bottles", quantity: 120 },
      ],
    },
  ];

  // Filter data based on search term
  const filteredData = fleetData.filter((truck) =>
    truck.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-8  min-h-screen">
      {/* Heading */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-blue-900">Fleet Overview</h1>
        <p className="text-md text-gray-600">
          Track and manage all yard activities in real time.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by License Number"
          className="w-full px-4 py-3 border rounded-md shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Fleet Cards */}
      <div className="space-y-4">
        {filteredData.length ? (
          filteredData.map((truck, index) => (
            <TruckCard key={truck.id} truck={truck} isAlternate={index % 2 !== 0} />
          ))
        ) : (
          <p className="text-gray-600">No trucks match the search criteria.</p>
        )}
      </div>
    </div>
  );
};

export default FleetOverviewPage;
