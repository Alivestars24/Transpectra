import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDepartedFleetDetails } from "../../../services/oparations/YardAPI";
import TruckCard from "./TruckCard"; // Updated TruckCard import

const FleetOverviewPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile?.user || null);
  const departedFleets = useSelector(
    (state) => state.departedFleet?.departedFleets || []
  );

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchDepartedFleetDetails({ managerId: user._id }));
    }
  }, [dispatch, user]);

  console.log("Data received from departedFleet API is:", departedFleets);

  // Filter fleet data based on the search term
  const filteredData = departedFleets.filter((truck) =>
    truck.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-8 min-h-screen">
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
            <TruckCard
              key={truck.licenseNumber}
              truck={{
                id: truck.licenseNumber,
                driverName: truck.driver,
                arrivalTime: truck.arrivalTime,
                departureTime: truck.departureTime || "N/A",
                status: truck.purpose,
                dock: truck.yard?.dock || "Unknown",
                driverContact: truck.yardManager?.email || "N/A",
                productList: truck.productsLink
                  ? [
                      // Example placeholder products since actual product details might need a secondary API call
                      { id: "P001", name: "Instant Noodles", quantity: 100 },
                      { id: "P002", name: "Stainless Steel Utensils", quantity: 200 },
                    ]
                  : [],
              }}
              isAlternate={index % 2 !== 0}
            />
          ))
        ) : (
          <p className="text-gray-600">No trucks match the search criteria.</p>
        )}
      </div>
    </div>
  );
};

export default FleetOverviewPage;
