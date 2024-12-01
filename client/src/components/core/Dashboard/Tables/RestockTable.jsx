import React from "react";

const RestockTable = ({ restockAlerts }) => {
  return (
    <div className="w-full max-w-[900px] mx-auto p-[6px] border-[1px] border-blue-800 rounded-lg shadow-sm shadow-llblue">
      <h2 className="text-xl font-medium text-center text-richblue-500 mb-2">Urgent Restock Alerts</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-blu text-white text-xs font-medium">
            <th className="py-1 px-4 border-b-2 border-blue-500">Product Name</th>
            <th className="py-2 px-4 border-b-2 border-blue-500">Current Stock</th>
            <th className="py-2 px-4 border-b-2 border-blue-500">Reorder Threshold</th>
            <th className="py-2 px-4 border-b-2 border-blue-500">Category</th>
          </tr>
        </thead>
        <tbody>
          {restockAlerts.length > 0 ? (
            restockAlerts.map((alert, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "bg-[#dcecff]" : "bg-white"} text-richblue-600 text-xs font-inter`}
              >
                <td className="py-2 px-2 border-b text-center border-blue-300">{alert.productName}</td>
                <td className="py-2 px-2 border-b text-center border-blue-300">{alert.currentStock}</td>
                <td className="py-2 px-2 border-b text-center border-blue-300">{alert.reorderThreshold}</td>
                <td className="py-2 px-2 border-b text-center border-blue-300">{alert.productCategory}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="py-4 text-center text-gray-500">
                No restock alerts.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RestockTable;
