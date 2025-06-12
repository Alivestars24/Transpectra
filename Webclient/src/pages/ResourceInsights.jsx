// import { IoBarChartSharp } from "react-icons/io5";
// import { IoSparklesSharp } from "react-icons/io5";
// import { useState } from "react";

// export default function ResourceInsights() {
//   const [duration, setDuration] = useState("next-day");

//   // Sample predicted values (adjust as needed)
//   const resourcePredictions = {
//     "next-day": { stackers: 2, cranes: 3, lowCrane: 1, forklifts: 4, lowForklift: 2, tractors: 5, trolleys: 8, labor: { skilled: 15, semi: 20, general: 30 } },
//     "next-3-days": { stackers: 5, cranes: 7, lowCrane: 3, forklifts: 10, lowForklift: 5, tractors: 12, trolleys: 20, labor: { skilled: 40, semi: 55, general: 80 } },
//   };
//   const insightsData = [
//     "Schedule the unloading of cargo #699876543 at 10:00 AM, followed by cargo #700123456, which requires specialized equipment. This ensures optimal labor and equipment utilization without delays.",
//     "Assign two parallel unloading zones for bulk shipments arriving at peak hours to minimize wait times and improve efficiency by 20%.",
//     "Prioritize unloading perishable cargo first to reduce spoilage risks and schedule non-urgent cargo for off-peak hours, balancing labor workload effectively."
//   ];

//   const selectedResources = resourcePredictions[duration];

//   return (
//     <div className="w-full max-w-5xl mx-auto px-6 py-3">
//       {/* Header Section */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-semibold text-gray-800">Predicted Resource Values</h2>
//         <select
//           className="border border-gray-300 rounded-md p-2 text-gray-700"
//           value={duration}
//           onChange={(e) => setDuration(e.target.value)}
//         >
//           <option value="next-day">Next Day</option>
//           <option value="next-3-days">Next 2 Days</option>
//         </select>
//       </div>

//       {/* Equipment Prediction Grid */}
//       <div className="border rounded-lg p-6 bg-gray-50">
//         <h3 className="text-xl font-semibold text-gray-700 mb-4">Equipment Requirements</h3>
//         <div className="grid grid-cols-2 gap-x-24 gap-y-6">
//           <ul className="space-y-2">
//             <li className="flex justify-between"><span>Reach Stackers:</span> <span>{selectedResources.stackers}</span></li>
//             <li className="flex justify-between"><span>Heavy Duty Hydraulic Mobile Cranes:</span> <span>{selectedResources.cranes}</span></li>
//             <li className="flex justify-between"><span>Low Mast Crane:</span> <span>{selectedResources.lowCrane}</span></li>
//             <li className="flex justify-between"><span>Forklifts:</span> <span>{selectedResources.forklifts}</span></li>
//           </ul>
//           <ul className="space-y-2">
//             <li className="flex justify-between"><span>Low Mast Forklift:</span> <span>{selectedResources.lowForklift}</span></li>
//             <li className="flex justify-between"><span>Tractor Trailers:</span> <span>{selectedResources.tractors}</span></li>
//             <li className="flex justify-between"><span>Hand Trollies:</span> <span>{selectedResources.trolleys}</span></li>
//           </ul>
//         </div>
//       </div>

//       {/* Labor Prediction Section */}
//       <div className="border rounded-lg p-6 bg-gray-50 mt-6">
//         <h3 className="text-xl font-semibold text-gray-700 mb-4">Labor Requirements</h3>
//         <ul className="space-y-2">
//           <li className="flex justify-between"><span>Skilled Labor:</span> <span>{selectedResources.labor.skilled}</span></li>
//           <li className="flex justify-between"><span>Semi-Skilled Labor:</span> <span>{selectedResources.labor.semi}</span></li>
//           <li className="flex justify-between"><span>General Labor:</span> <span>{selectedResources.labor.general}</span></li>
//         </ul>
//       </div>

//       {/* Insights Section */}
//       <div className="w-full mt-6  mx-auto rounded-lg border border-blue-300 bg-white p-6 shadow-lg">
//         {/* Header with BarChart Icon */}
//         <div className="flex items-center gap-2 text-blue-600">
//           <IoBarChartSharp className="w-8 h-8" />
//           <h2 className="text-xl font-semibold">Resource Management Insights</h2>
//         </div>

//         {/* Insights Section */}
//         <div className="mt-4 space-y-3">
//           {insightsData?.length > 0 ? (
//             insightsData.map((insight, index) => (
//               <div
//                 key={index}
//                 className="flex items-center gap-2 rounded-md border-l-4 border-blue-600 bg-blue-5 py-3 px-2"
//               >
//                 <IoSparklesSharp className="w-6 h-6 text-blue-600" />
//                 <p className="text-sm text-left ml-2 text-gray-800">{insight}</p>
//               </div>
//             ))
//           ) : (
//             <p className="text-left text-gray-500">No insights available</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import { IoBarChartSharp } from "react-icons/io5";
import { IoSparklesSharp } from "react-icons/io5";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast"



export default function ResourceInsights() {
  const [duration, setDuration] = useState("next-day");
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);

  // Sample predicted values (adjust as needed)
  const resourcePredictions = {
    "next-day": {
      stackers: 2,
      cranes: 3,
      lowCrane: 1,
      forklifts: 4,
      lowForklift: 2,
      tractors: 5,
      trolleys: 8,
      labor: { skilled: 15, semi: 20, general: 30 },
    },
    "next-3-days": {
      stackers: 5,
      cranes: 7,
      lowCrane: 3,
      forklifts: 10,
      lowForklift: 5,
      tractors: 12,
      trolleys: 20,
      labor: { skilled: 40, semi: 55, general: 80 },
    },
  };



  // Fetch resource optimization data
  const fetchResourceData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8000/resource_optimizer", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setApiData(result);
      toast.success("Resource prediction completed successfully!");
    } catch (err) {
      setError(err.message);
      toast.error(`Failed to fetch resource data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchResourceData();
  }, []);

  const insightsData = [
    "Schedule the unloading of cargo #699876543 at 10:00 AM, followed by cargo #700123456, which requires specialized equipment. This ensures optimal labor and equipment utilization without delays.",
    "Assign two parallel unloading zones for bulk shipments arriving at peak hours to minimize wait times and improve efficiency by 20%.",
    "Prioritize unloading perishable cargo first to reduce spoilage risks and schedule non-urgent cargo for off-peak hours, balancing labor workload effectively.",
  ];

  const selectedResources = resourcePredictions[duration];

  // Merge API data with selected resources if available
  const displayResources = apiData
    ? {
        ...selectedResources,
        forklifts: apiData.forklifts || selectedResources.forklifts,
        tractors: apiData.trucks || selectedResources.tractors,
        labor: {
          ...selectedResources.labor,
          total:
            apiData.labour ||
            selectedResources.labor.skilled +
              selectedResources.labor.semi +
              selectedResources.labor.general,
        },
      }
    : selectedResources;

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-3">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Predicted Resource Values
          </h2>
          {loading && (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              <span className="text-sm text-gray-600">
                Loading predictions...
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={fetchResourceData}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Refreshing..." : "Refresh Data"}
          </button>
          <select
            className="border border-gray-300 rounded-md p-2 text-gray-700"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          >
            <option value="next-day">Next Day</option>
            <option value="next-3-days">Next 2 Days</option>
          </select>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">Error: {error}</p>
        </div>
      )}

      {/* API Data Display */}
      {apiData && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            Live Optimized Predictions
          </h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="font-medium">Forklifts:</span>
              <span className="text-green-700 font-semibold">
                {apiData.forklifts}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Trucks:</span>
              <span className="text-green-700 font-semibold">
                {apiData.trucks}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Labour:</span>
              <span className="text-green-700 font-semibold">
                {apiData.labour}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Equipment Prediction Grid */}
      <div className="border rounded-lg p-6 bg-gray-50">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Equipment Requirements
        </h3>
        <div className="grid grid-cols-2 gap-x-24 gap-y-6">
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span>Reach Stackers:</span>
              <span
                className={
                  loading ? "animate-pulse bg-gray-200 rounded px-2" : ""
                }
              >
                {displayResources.stackers}
              </span>
            </li>
            <li className="flex justify-between">
              <span>Heavy Duty Hydraulic Mobile Cranes:</span>
              <span
                className={
                  loading ? "animate-pulse bg-gray-200 rounded px-2" : ""
                }
              >
                {displayResources.cranes}
              </span>
            </li>
            <li className="flex justify-between">
              <span>Low Mast Crane:</span>
              <span
                className={
                  loading ? "animate-pulse bg-gray-200 rounded px-2" : ""
                }
              >
                {displayResources.lowCrane}
              </span>
            </li>
            <li className="flex justify-between">
              <span>Forklifts:</span>
              <span
                className={`${
                  loading ? "animate-pulse bg-gray-200 rounded px-2" : ""
                } ${apiData ? "font-bold text-green-600" : ""}`}
              >
                {displayResources.forklifts}
                {apiData && (
                  <span className="text-xs text-green-500 ml-1"></span>
                )}
              </span>
            </li>
          </ul>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span>Low Mast Forklift:</span>
              <span
                className={
                  loading ? "animate-pulse bg-gray-200 rounded px-2" : ""
                }
              >
                {displayResources.lowForklift}
              </span>
            </li>
            <li className="flex justify-between">
              <span>Tractor Trailers:</span>
              <span
                className={`${
                  loading ? "animate-pulse bg-gray-200 rounded px-2" : ""
                } ${apiData ? "font-bold text-green-600" : ""}`}
              >
                {displayResources.tractors}
                {apiData && (
                  <span className="text-xs text-green-500 ml-1"></span>
                )}
              </span>
            </li>
            <li className="flex justify-between">
              <span>Hand Trollies:</span>
              <span
                className={
                  loading ? "animate-pulse bg-gray-200 rounded px-2" : ""
                }
              >
                {displayResources.trolleys}
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Labor Prediction Section */}
      <div className="border rounded-lg p-6 bg-gray-50 mt-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Labor Requirements
        </h3>
        <ul className="space-y-2">
          <li className="flex justify-between">
            <span>Skilled Labor:</span>
            <span
              className={
                loading ? "animate-pulse bg-gray-200 rounded px-2" : ""
              }
            >
              {displayResources.labor.skilled}
            </span>
          </li>
          <li className="flex justify-between">
            <span>Semi-Skilled Labor:</span>
            <span
              className={
                loading ? "animate-pulse bg-gray-200 rounded px-2" : ""
              }
            >
              {displayResources.labor.semi}
            </span>
          </li>
          <li className="flex justify-between">
            <span>General Labor:</span>
            <span
              className={
                loading ? "animate-pulse bg-gray-200 rounded px-2" : ""
              }
            >
              {displayResources.labor.general}
            </span>
          </li>
          {apiData && (
            <li className="flex justify-between border-t pt-2 mt-2">
              <span className="font-semibold">Total Labour:</span>
              <span className="font-bold text-green-600">
                {displayResources.labor.total}
                <span className="text-xs text-green-500 ml-1"></span>
              </span>
            </li>
          )}
        </ul>
      </div>

      {/* Insights Section */}
      <div className="w-full mt-6  mx-auto rounded-lg border border-blue-300 bg-white p-6 shadow-lg">
        {/* Header with BarChart Icon */}
        <div className="flex items-center gap-2 text-blue-600">
          <IoBarChartSharp className="w-8 h-8" />
          <h2 className="text-xl font-semibold">
            Resource Management Insights
          </h2>
        </div>

        {/* Insights Section */}
        <div className="mt-4 space-y-3">
          {insightsData?.length > 0 ? (
            insightsData.map((insight, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-md border-l-4 border-blue-600 bg-blue-5 py-3 px-2"
              >
                <IoSparklesSharp className="w-6 h-6 text-blue-600" />
                <p className="text-sm text-left ml-2 text-gray-800">
                  {insight}
                </p>
              </div>
            ))
          ) : (
            <p className="text-left text-gray-500">No insights available</p>
          )}
        </div>
      </div>
    </div>
  );
}
