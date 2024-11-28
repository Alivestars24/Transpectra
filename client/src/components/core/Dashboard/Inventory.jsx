import React, { useState } from "react";
import { HiSparkles } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../Common/IconBtn";
import { RiEditBoxLine } from "react-icons/ri";

function Inventory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  // Simulated inventory data with individual thresholds and categories
  const inventory = [
    { id: "P1001", productName: "Laptop - Dell Inspiron", quantity: 60, stockStatus: "In Stock", category: "Electronics", threshold: 50 },
    { id: "P1002", productName: "Smartphone - iPhone 14", quantity: 80, stockStatus: "Limited Stock", category: "Electronics", threshold: 70 },
    { id: "P1003", productName: "Headphones - Sony WH-1000XM4", quantity: 25, stockStatus: "Low Stock", category: "Accessories", threshold: 20 },
    { id: "P1004", productName: "Gaming Console - PS5", quantity: 35, stockStatus: "In Stock", category: "Gaming", threshold: 30 },
    { id: "P1005", productName: "Wireless Mouse - Logitech MX Master 3", quantity: 50, stockStatus: "In Stock", category: "Accessories", threshold: 40 },
    { id: "P1006", productName: "Mechanical Keyboard - Keychron K2", quantity: 30, stockStatus: "In Stock", category: "Accessories", threshold: 25 },
    { id: "P1007", productName: "External SSD - Samsung T7", quantity: 10, stockStatus: "Low Stock", category: "Components", threshold: 15 },
    { id: "P1008", productName: "Smartwatch - Apple Watch Series 8", quantity: 35, stockStatus: "Limited Stock", category: "Electronics", threshold: 40 },
    { id: "P1009", productName: "Graphics Card - NVIDIA RTX 4080", quantity: 20, stockStatus: "Low Stock", category: "Components", threshold: 25 },
    { id: "P1010", productName: "Monitor - LG UltraGear 27'", quantity: 45, stockStatus: "In Stock", category: "Electronics", threshold: 50 },
    { id: "P1011", productName: "Printer - HP LaserJet Pro", quantity: 70, stockStatus: "In Stock", category: "Electronics", threshold: 60 },
    { id: "P1012", productName: "Tablet - Samsung Galaxy Tab S8", quantity: 30, stockStatus: "Limited Stock", category: "Electronics", threshold: 35 },
    { id: "P1013", productName: "Gaming Chair - Razer Iskur", quantity: 25, stockStatus: "In Stock", category: "Gaming", threshold: 20 },
    { id: "P1014", productName: "Networking Switch - Cisco SG350", quantity: 35, stockStatus: "Low Stock", category: "Networking", threshold: 25 },
    { id: "P1015", productName: "Power Supply - Corsair RM850x", quantity: 12, stockStatus: "Low Stock", category: "Components", threshold: 15 },
    { id: "P1016", productName: "VR Headset - Oculus Quest 2", quantity: 40, stockStatus: "Limited Stock", category: "Gaming", threshold: 35 },
    { id: "P1017", productName: "Motherboard - ASUS ROG Strix B550", quantity: 20, stockStatus: "Low Stock", category: "Components", threshold: 25 },
    { id: "P1018", productName: "Portable Projector - Anker Nebula", quantity: 18, stockStatus: "Low Stock", category: "Electronics", threshold: 20 },
    { id: "P1019", productName: "Smart Thermostat - Google Nest", quantity: 50, stockStatus: "In Stock", category: "Electronics", threshold: 45 },
    { id: "P1020", productName: "Router - Netgear Nighthawk", quantity: 20, stockStatus: "Low Stock", category: "Networking", threshold: 15 },
  ];
  
  const navigate = useNavigate();

  // Filter products by search term and category
  const filteredInventory = inventory.filter(
    (item) =>
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category === "All" || item.category === category)
  );

  const getRestockDetails = () => {
    const restockInfo = {};
    inventory.forEach((item) => {
      if (item.quantity < item.threshold) {
        if (!restockInfo[item.category]) {
          restockInfo[item.category] = [];
        }
        restockInfo[item.category].push(item);
      }
    });
    return restockInfo;
  };

  const restockInfo = getRestockDetails();

  const handleOrder = (category) => {
    const productsToOrder = restockInfo[category];
    console.log(JSON.stringify(productsToOrder, null, 2));
    navigate("/dashboard/inventory-select", { state: { restockProducts: productsToOrder } });
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-2 rounded-lg shadow-sm shadow-llblue">
      {/* Display notifications for categories needing restock */}
      {Object.keys(restockInfo).map((cat) => (
        <div key={cat} className="mb-4 flex items-center justify-between">
          <div className="flex items-center bg-blue-5 text-richblue-900 rounded-lg p-[6px] w-4/5 shadow-lg">
            <HiSparkles className="text-richblue-900" />
            <span className="text-lg pl-3 font-semibold">
              Urgent Restock required for the {cat} category
            </span>
          </div>
          <IconBtn
            text={`Make an Order `}
            onclick={() => handleOrder(cat)}
          />
        </div>
      ))}


      {/* Heading and subheading */}
      <div className="flex mt-6 justify-between items-center">
        <div>
          <h1 className="text-[26px] font-bold text-blue-900">Inventory present in Warehouse</h1>
          <h2 className="text-[16px] -ml-7 font-semibold opacity-70 text-blue-800">Real-Time Overview of Inventory in {category} Category
          </h2>
        </div>

        {/* Dropdown (Select Button) for Category */}
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
                  className={`${
                    index % 2 === 0 ? "bg-[#edf5ffd0]" : "bg-white"
                  } text-richblue-600 text-xs font-inter`}
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
