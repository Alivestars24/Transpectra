import React, { useState } from "react";

const TruckCard = ({ truck, isAlternate }) => {
  const [showProducts, setShowProducts] = useState(false);

  return (
    <div
      className={`p-4 shadow-lg border rounded-lg ${
        isAlternate ? "bg-[#f0f8ff]" : "bg-white"
      }`}
    >
      <div className="flex">
        {/* Truck Details */}
        <div className="flex-1 pr-4">
          <div className="flex justify-between">
            {/* Left Section */}
            <div className="flex flex-col gap-y-2 ml-6">
              <h3 className="text-2xl font-semibold text-blue-700">{truck.id}</h3>
              <p className="text-md text-gray-600 text-richblue-600">
                Driver: {truck.driverName}
              </p>
              <p className="text-md text-gray-600 text-richblue-600">
                Arrival: {truck.arrivalTime}
              </p>
            </div>

            {/* Right Section */}
            <div className="flex flex-col gap-y-2 items-start  ">
              <p className="text-md text-richblue-600">
                Contact: {truck.driverContact}
              </p>
              <p className="text-md text-richblue-600 flex flex-row gap-x-2 items-center"><p>Purpose: </p> 
                <div className={`rounded-lg px-12 ml-3 py-1 z-2 bg-caribbeangreen-50`}><p>{truck.status}</p></div>
              </p>
              <button
                onClick={() => setShowProducts(!showProducts)}
                className="px-16 py-2 bg-blu text-white font-semibold rounded-lg mt-2"
              >
                {showProducts ? "Hide Products" : "Show Products"}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Product List Toggle */}
      <div className="mt-2">
        {showProducts && (
          <div className="mt-2 border-t pt-2">
            <table className="w-full text-sm text-left">
              <thead>
                <tr>
                  <th className="border px-2 py-1">Product ID</th>
                  <th className="border px-2 py-1">Name</th>
                  <th className="border px-2 py-1">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {truck.productList.map((product, index) => (
                  <tr
                    key={product.id}
                    className={`${
                      index % 2 === 0 ? "bg-[#dcecff]" : "bg-blue-5"
                    } text-richblue-600`}
                  >
                    <td className="border px-2 py-1">{product.id}</td>
                    <td className="border px-2 py-1">{product.name}</td>
                    <td className="border px-2 py-1">{product.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TruckCard;
