import React, { useState } from 'react';
import truckImage from '../../../assets/Images/Truck.jpg'; // Truck image path

const TruckCard = ({ truck, truckType }) => {
  const [showProducts, setShowProducts] = useState(false);

  return (
    <div className="p-4 bg-white shadow-lg border rounded-lg">
      <div className="flex">
        <div className="ml-10 flex-1 pr-4">
          <div className="flex justify-between ">
            <div className='flex flex-col gap-y-2 justify-evenly'>
              <h3 className="text-xl font-semibold text-blue-700">
                {truck.id}
              </h3>
              <p className="text-md text-richblue-600">Model: {truck.truckModel}</p>
              <p className="text-md text-gray-600 text-richblue-600">Driver: {truck.driverName}</p>
              <p className="text-md text-gray-600 text-richblue-600">Arrival: {truck.arrivalTime}</p>
            </div>
            <div className='flex flex-col gap-y-2 justify-between mr-12'>
              <p className="text-md text-richblue-600">Dock: {truck.dock}</p>
              <p className="text-md text-richblue-600">Contact: {truck.driverContact}</p>
              <p className="text-md text-richblue-600">Purpose: {truck.status}</p>
              <button
                className="px-4 py-2 bg-blu text-white font-semibold rounded-lg mt-2"
              >
                Mark as Departed
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={() => setShowProducts(!showProducts)}
          className="underline text-ddblue"
        >
          {showProducts ? 'Hide' : 'Show'} Products List
        </button>
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
                {truck.productList.map((product,index) => (
                  <tr key={product.id}
                  className={`${
                    index % 2 === 0 ? "bg-[#dcecff]" : "bg-blue-5"
                  } text-richblue-600 text-xs font-inter`}>
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
