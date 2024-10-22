import React, { useState } from 'react';
import TruckCard from './TruckCard';
import img1 from '../../../assets/Images/tr1.jpeg';
import img2 from '../../../assets/Images/tr2.jpeg';
import img3 from '../../../assets/Images/tr3.jpeg';
import img4 from '../../../assets/Images/tr4.png';
import img5 from '../../../assets/Images/tr5.jpeg';
import img6 from '../../../assets/Images/tr6.jpeg';

const FleetActivity = () => {
  const [truckType, setTruckType] = useState('Unloading'); // Default value as 'Unloading'
  const [searchTerm, setSearchTerm] = useState('');

  const fleetData = [
    {
      id: 'MH12AB1234',
      truckModel: 'Tata Ace',
      driverName: 'Ajay Sharma',
      supplierName: 'Saksham Pvt',
      arrivalTime: '2024-10-16 09:00 AM',
      departureTime: '2024-10-16 12:00 PM',
      dock: 'Dock #4',
      driverContact: '+91 9876543210',
      priority: 'High',
      status: 'Loading',
      truckImage:img1,
      productList: [
        { id: 'C2453', name: 'Coco Cola Bottle (2L)', quantity: 200 },
        { id: 'C5678', name: 'Water Bottle (Plastic)', quantity: 180 },
      ],
    },
    {
      id: 'MH34CD5678',
      truckModel: 'Mahindra Bolero Maxi',
      driverName: 'Vijay Ghogle',
      supplierName: 'Hera Ltd',
      arrivalTime: '2024-10-16 10:00 AM',
      departureTime: '2024-10-16 01:00 PM',
      dock: 'Dock #2',
      driverContact: '+91 9988776655',
      priority: 'Medium',
      status: 'Unloading',
      truckImage:img2,
      productList: [
        { id: 'C5679', name: 'Tiffin Boxes (Medium)', quantity: 85 },
        { id: 'C6790', name: 'Juice Bottles (1L)', quantity: 120 },
      ],
    },
    // New Truck Entries:
    {
      id: 'MH45EF7890',
      truckModel: 'Ashok Leyland Dost',
      driverName: 'Rajesh Kumar',
      supplierName: 'Fresh Dairy Ltd',
      arrivalTime: '2024-10-16 08:30 AM',
      departureTime: '2024-10-16 11:30 AM',
      dock: 'Dock #3',
      driverContact: '+91 9845123476',
      priority: 'Low',
      status: 'Loading',
      truckImage:img3,
      productList: [
        { id: 'D3456', name: 'Milk (500ml)', quantity: 500 },
        { id: 'D4567', name: 'Butter (200g)', quantity: 150 },
      ],
    },
    {
      id: 'MH67GH4321',
      truckModel: 'Eicher Pro 1055',
      driverName: 'Nikhil Patil',
      supplierName: 'Green Veg Pvt',
      arrivalTime: '2024-10-16 11:00 AM',
      departureTime: '2024-10-16 01:00 PM',
      dock: 'Dock #5',
      driverContact: '+91 9123456789',
      priority: 'Medium',
      status: 'Unloading',
      truckImage:img4,
      productList: [
        { id: 'V1234', name: 'Tomatoes (25kg)', quantity: 100 },
        { id: 'V2345', name: 'Potatoes (30kg)', quantity: 80 },
      ],
    },
    {
      id: 'MH89IJ8765',
      truckModel: 'Force Kargo King',
      driverName: 'Suresh Deshmukh',
      supplierName: 'Spice Traders Pvt',
      arrivalTime: '2024-10-16 07:45 AM',
      departureTime: '2024-10-16 10:15 AM',
      dock: 'Dock #1',
      driverContact: '+91 9876543321',
      priority: 'High',
      status: 'Loading',
      truckImage:img5,
      productList: [
        { id: 'S1234', name: 'Chili Powder (10kg)', quantity: 50 },
        { id: 'S5678', name: 'Turmeric Powder (5kg)', quantity: 40 },
      ],
    },
    {
      id: 'MH21KL6789',
      truckModel: 'Tata Ultra 1412',
      driverName: 'Ganesh Rao',
      supplierName: 'Frozen Foods Ltd',
      arrivalTime: '2024-10-16 12:00 PM',
      departureTime: '2024-10-16 03:00 PM',
      dock: 'Dock #6',
      driverContact: '+91 9567854321',
      priority: 'High',
      status: 'Unloading',
      truckImage:img6,
      productList: [
        { id: 'F3456', name: 'Frozen Peas (1kg)', quantity: 400 },
        { id: 'F7890', name: 'Frozen Sweet Corn (1kg)', quantity: 350 },
      ],
    },
  ];
  

  const handleTruckTypeChange = (e) => {
    setTruckType(e.target.value); // Update truckType based on dropdown selection
  };

  const filteredFleetData = fleetData.filter((truck) =>
    truck.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pb-4 pt-1 px-4">
      {/* Heading and Select Button */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[26px] font-bold text-blue-900">Fleet Activity</h1>
          <h2 className="text-[16px] font-semibold opacity-70 text-blue-800">Real Time Overview of Trucks for {truckType} </h2>
        </div>

        {/* Dropdown (Select Button) for Truck Type */}
        <select
          value={truckType}
          onChange={handleTruckTypeChange}
          className="pl-4 pr-2 py-2 bg-blue-800 text-white font-semibold rounded-lg "
        >
          <option value="Unloading">Trucks for Unloading</option>
          <option value="Loading">Trucks for loading</option>
        </select>
      </div>

      {/* Search Input */}
      <div className="mt-4">
        <input
          type="text"
          placeholder="Search by License Plate Number"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Cards Display */}
      <div className="mt-4 px-2 w-auto flex flex-col gap-y-3 justify-center  ">
        {filteredFleetData
          .filter((truck) => truck.status === truckType) // Filter trucks based on the selected truck type
          .map((truck) => (
            <TruckCard key={truck.id} truck={truck} truckType={truckType} />
          ))}
      </div>
    </div>
  );
};

export default FleetActivity;
