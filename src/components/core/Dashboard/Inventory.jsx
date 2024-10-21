import React, { useState } from "react";
import { HiSparkles } from "react-icons/hi2";

function Inventory({ store, onCheckInventory }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  // Simulated inventory data with added 'category' field
  const inventory = [
    { id: "P1001", productName: "Laptop - Dell Inspiron", quantity: "120", stockStatus: "In Stock", category: "Electronics" },
    { id: "P1002", productName: "Smartphone - iPhone 14", quantity: "85", stockStatus: "Limited Stock", category: "Electronics" },
    { id: "P1003", productName: "Tablet - Samsung Galaxy", quantity: "150", stockStatus: "In Stock", category: "Electronics" },
    { id: "P1004", productName: "Headphones - Sony WH-1000XM4", quantity: "95", stockStatus: "In Stock", category: "Accessories" },
    { id: "P1005", productName: "Smartwatch - Apple Watch Series 8", quantity: "60", stockStatus: "Limited Stock", category: "Accessories" },
    { id: "P1006", productName: "Keyboard - Logitech G Pro", quantity: "200", stockStatus: "In Stock", category: "Accessories" },
    { id: "P1007", productName: "Mouse - Razer DeathAdder", quantity: "180", stockStatus: "In Stock", category: "Accessories" },
    { id: "P1008", productName: "Monitor - LG Ultrawide", quantity: "75", stockStatus: "Limited Stock", category: "Electronics" },
    { id: "P1009", productName: "Printer - HP LaserJet", quantity: "50", stockStatus: "Limited Stock", category: "Office Equipment" },
    { id: "P1010", productName: "Camera - Canon EOS R5", quantity: "40", stockStatus: "Out of Stock", category: "Electronics" },
    { id: "P1011", productName: "Tripod - Manfrotto", quantity: "90", stockStatus: "In Stock", category: "Accessories" },
    { id: "P1012", productName: "External HDD - Seagate 1TB", quantity: "300", stockStatus: "In Stock", category: "Storage" },
    { id: "P1013", productName: "USB Drive - Sandisk 64GB", quantity: "450", stockStatus: "In Stock", category: "Storage" },
    { id: "P1014", productName: "Gaming Console - PlayStation 5", quantity: "20", stockStatus: "Limited Stock", category: "Gaming" },
    { id: "P1015", productName: "VR Headset - Oculus Quest 2", quantity: "35", stockStatus: "Out of Stock", category: "Gaming" },
    { id: "P1016", productName: "Smart Speaker - Amazon Echo", quantity: "250", stockStatus: "In Stock", category: "Electronics" },
    { id: "P1017", productName: "Router - Netgear Nighthawk", quantity: "110", stockStatus: "In Stock", category: "Networking" },
    { id: "P1018", productName: "Drone - DJI Mavic Air 2", quantity: "45", stockStatus: "Limited Stock", category: "Electronics" },
    { id: "P1019", productName: "Projector - Epson Home Cinema", quantity: "30", stockStatus: "Out of Stock", category: "Office Equipment" },
    { id: "P1020", productName: "Graphics Card - NVIDIA RTX 3080", quantity: "10", stockStatus: "Out of Stock", category: "Components" },
    { id: "P1021", productName: "Bluetooth Speaker - JBL Flip 5", quantity: "160", stockStatus: "In Stock", category: "Accessories" },
    { id: "P1022", productName: "Smart TV - Samsung 55\"", quantity: "25", stockStatus: "Limited Stock", category: "Electronics" },
    { id: "P1023", productName: "E-reader - Kindle Paperwhite", quantity: "75", stockStatus: "In Stock", category: "Electronics" },
    { id: "P1024", productName: "Gaming Mouse Pad - SteelSeries QcK", quantity: "100", stockStatus: "In Stock", category: "Accessories" },
    { id: "P1025", productName: "Smart Light - Philips Hue", quantity: "80", stockStatus: "In Stock", category: "Home Automation" },
    { id: "P1026", productName: "Laptop Stand - Nulaxy", quantity: "130", stockStatus: "In Stock", category: "Accessories" },
    { id: "P1027", productName: "Action Camera - GoPro Hero 9", quantity: "60", stockStatus: "In Stock", category: "Electronics" },
    { id: "P1028", productName: "Wireless Charger - Anker", quantity: "220", stockStatus: "In Stock", category: "Accessories" },
    { id: "P1029", productName: "Fitness Tracker - Fitbit Charge 5", quantity: "100", stockStatus: "In Stock", category: "Accessories" },
    { id: "P1030", productName: "Portable SSD - Samsung T7", quantity: "140", stockStatus: "In Stock", category: "Storage" },
    { id: "P1031", productName: "Electric Toothbrush - Oral-B", quantity: "50", stockStatus: "Limited Stock", category: "Personal Care" },
    { id: "P1032", productName: "Noise Cancelling Earbuds - Bose", quantity: "40", stockStatus: "Limited Stock", category: "Accessories" },
    { id: "P1033", productName: "Home Security Camera - Ring", quantity: "90", stockStatus: "In Stock", category: "Home Automation" },
    { id: "P1034", productName: "Wi-Fi Range Extender - TP-Link", quantity: "180", stockStatus: "In Stock", category: "Networking" },
    { id: "P1035", productName: "Digital Frame - Nixplay", quantity: "45", stockStatus: "Limited Stock", category: "Accessories" }
  ];
  // Filter products by search term and category
  const filteredInventory = inventory
    .filter((item) => 
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category === "All" || item.category === category)
    );

  return (
    <div className="w-full max-w-6xl mx-auto p-2 rounded-lg shadow-sm shadow-llblue">
      <div className="flex justify-between items-center">
        {/* Urgent Restock Notification */}
        <div className="flex items-center bg-blu text-white rounded-lg p-[11px] w-full md:w-3/5 shadow-lg mr-4">
          <HiSparkles className="text-white"/>
          <span className="text-lg pl-3 font-semibold">
            Urgent Restock required for the Electronics category
          </span>
        </div>

        {/* Generate Restock Request Button */}
        <button className="bg-ddblue text-white rounded-lg px-2 py-3 font-semibold shadow-lg hover:bg-richblue-800 w-full md:w-2/5">
          Generate Restock Request for Electronics
        </button>
      </div>
      {/* Heading and subheading */}
      <div className="flex mt-6 justify-between items-center">
        <div>
          <h1 className="text-[26px] font-bold text-blue-900">Inventory present in Warehouse</h1>
          <h2 className="text-[16px] font-semibold opacity-70 text-blue-800">Real Time Overview of Inventory in {category} Category </h2>
        </div>

        {/* Dropdown (Select Button) for Truck Type */}
        <div className="mt-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="All">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Accessories">Accessories</option>
          <option value="Gaming">Gaming</option>
          <option value="Networking">Networking</option>
          <option value="Components">Components</option>
        </select>
      </div>
      </div>

      {/* Select dropdown for filtering by category */}

      {/* Search bar */}
      <div className="mt-4">
        <input
          type="text"
          placeholder="Search by Product Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table for displaying inventory */}
      <div className="mt-4">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-blu text-white text-xs font-medium">
              <th className="py-2 px-4 border-b-2 border-blue-500">Product Code</th>
              <th className="py-2 px-4 border-b-2 border-blue-500">Product Name</th>
              <th className="py-2 px-4 border-b-2 border-blue-500">Quantity</th>
              <th className="py-2 px-4 border-b-2 border-blue-500">Stock Status</th>
              <th className="py-2 px-4 border-b-2 border-blue-500">Category</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-2 px-4 text-center">
                  No products found.
                </td>
              </tr>
            ) : (
              filteredInventory.map((item, index) => (
                <tr
                  key={item.id}
                  className={`${index % 2 === 0 ? "bg-[#edf5ffd0]" : "bg-white"} text-richblue-600 text-xs font-inter`}
                >
                  <td className="py-2 px-4 border-b text-center border-blue-300">{item.id}</td>
                  <td className="py-2 px-4 border-b text-center border-blue-300">{item.productName}</td>
                  <td className="py-2 px-4 border-b text-center border-blue-300">{item.quantity}</td>
                  <td className="py-2 px-4 border-b text-center border-blue-300">{item.stockStatus}</td>
                  <td className="py-2 px-4 border-b text-center border-blue-300">{item.category}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inventory;
