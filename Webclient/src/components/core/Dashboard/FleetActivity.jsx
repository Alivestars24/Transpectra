import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFleetDetails,markAsDeparted } from '../../../services/oparations/YardAPI';


const FleetActivity = () => {
  const [truckType, setTruckType] = useState('all'); // Default value includes 'All'
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedTruck, setExpandedTruck] = useState(null); // Track expanded truck for product view

  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile?.user || null); // Get user details
  const fleetData = useSelector((state) => state.fleet?.fleet || []); // Get fleet data from Redux

  useEffect(() => {
    if (user?._id) {
      console.log("Fetching Details for outgoing fleet for userID", user._id);
      dispatch(fetchFleetDetails({ yardManagerId: user._id }));
    }
  }, [user?._id, dispatch]);

  const handleTruckTypeChange = (e) => {
    setTruckType(e.target.value); 
  };

  const toggleProductView = (truckId) => {
    // Toggle expanded view for a truck
    setExpandedTruck((prev) => (prev === truckId ? null : truckId));
  };

  const markTruckAsDeparted=(truckId) =>{
    dispatch(markAsDeparted(truckId,dispatch));
  }
  // Filter trucks based on truckType and search term
  const filteredFleetData = fleetData.filter(
    (truck) =>
      (truckType === 'all' || truck.purpose === truckType) &&
      truck.vehicleLicensePlate.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !truck.departed
  );

  return (
    <div className="pb-4 pt-1 px-4">
      {/* Heading and Select Button */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[26px] font-bold text-blue-900">Fleet Activity</h1>
          <h2 className="text-[16px] font-semibold opacity-70 text-blue-800">
            Real-Time Overview of Trucks for {truckType === 'all' ? 'All' : truckType.charAt(0).toUpperCase() + truckType.slice(1)}
          </h2>
        </div>

        {/* Dropdown (Select Button) for Truck Type */}
        <select
          value={truckType}
          onChange={handleTruckTypeChange}
          className="pl-4 pr-2 py-2 bg-blue-5 border border-blue-500 text-richblue-800 font-semibold rounded-lg"
        >
          <option value="all">All Trucks</option>
          <option value="unloading">Trucks for Unloading</option>
          <option value="loading">Trucks for Loading</option>
        </select>
      </div>

      {/* Search Input */}
      <div className="mt-2">
        <input
          type="text"
          placeholder="Search by License Plate Number"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Cards Display */}
      <div className="mt-4 px-2 w-full flex flex-col gap-y-3 justify-center">
        {filteredFleetData.length > 0 ? (
          filteredFleetData.map((truck) => (
            <div
              key={truck._id}
              className="border p-4 rounded-lg shadow-md flex flex-col gap-2 bg-white"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-blue-900">
                    {truck.vehicleLicensePlate}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Driver: {truck.driverName}
                  </p>
                </div>
                <div>
                  <span
                    className={`px-6 py-2 rounded-full text-sm font-semibold ${
                      truck.purpose === 'loading'
                        ? 'bg-caribbeangreen-100 text-richblue-900'
                        : 'bg-yellow-25 text-black'
                    }`}
                  >
                    {truck.purpose.charAt(0).toUpperCase() + truck.purpose.slice(1)}
                  </span>
                </div>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex flex-col items-start gap-y-1'>
                <p className="text-sm text-gray-500">Dock: {truck.allocatedDock}</p>
                <p className="text-sm text-gray-500">
                  Arrival Time: {convertToIST(truck.timeOfArrival)}
                </p>
                <p className="text-sm text-gray-500">
                   Date of Arrival: {formatDate(truck.dateOfArrival)}
                </p>

                </div>


                <div className="mt-2 flex gap-y-1 flex-col justify-between items-center">
                <button
                  onClick={() => toggleProductView(truck._id)}
                  className="px-9 py-2 text-sm text-white bg-blue-800 rounded-lg hover:bg-blue-700"
                >
                  {expandedTruck === truck._id ? 'Hide Products' : 'View Products'}
                </button>
                <button
                  onClick={() => markTruckAsDeparted(truck._id)}
                  className="px-6 py-2 text-sm text-white bg-blu rounded-lg hover:bg-red-500"
                >
                  Mark as Departed
                </button>
              </div>
              </div>


              {expandedTruck === truck._id && (
                <div className="mt-2 bg-gray-100 p-3 rounded-lg">
                  <p className="text-sm font-semibold text-blue-900">Products:</p>
                  <ul className="mt-1">
                    {truck.productList?.length > 0 ? (
                      truck.productList.map((product, idx) => (
                        <li key={idx} className="text-sm text-gray-600">
                          {product.name} - {product.quantity}
                        </li>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No products associated</p>
                    )}
                  </ul>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center">
            No trucks found for the selected type or search criteria.
          </p>
        )}
      </div>
    </div>
  );
};


const convertToIST = (utcTime) => {
  try {
    // Parse the UTC time string (HH:MM:SS)
    const [hours, minutes, seconds] = utcTime.split(":").map(Number);
    if (
      isNaN(hours) || isNaN(minutes) || isNaN(seconds) ||
      hours < 0 || hours > 23 || minutes < 0 || minutes > 59 || seconds < 0 || seconds > 59
    ) {
      throw new Error("Invalid Time Format");
    }
    const utcDate = new Date(Date.UTC(1970, 0, 1, hours, minutes, seconds));
    const istOffsetMilliseconds = 5 * 60 * 60 * 1000 + 30 * 60 * 1000;
    const istDate = new Date(utcDate.getTime() + istOffsetMilliseconds);

    // Format IST time as HH:MM:SS
    const istHours = String(istDate.getUTCHours()).padStart(2, "0"); 
    const istMinutes = String(istDate.getUTCMinutes()).padStart(2, "0");
    const istSeconds = String(istDate.getUTCSeconds()).padStart(2, "0");

    return `${istHours}:${istMinutes}:${istSeconds}`;
  } catch (error) {
    console.error("Error converting UTC to IST:", error.message);
    return "Invalid Time";
  }
};

const formatDate = (utcDate) => {
  const date = new Date(utcDate);
  return date.toISOString().split('T')[0]; 
};

export default FleetActivity;
