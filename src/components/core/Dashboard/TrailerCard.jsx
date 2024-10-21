import React from "react";

function TrailerCard({ trailer, onAssignDelivery }) {
  return (
    <div className="p-2 mb-4 bg-white shadow-md border border-[#dff0ff] shadow-[#daedff] rounded-lg">
      <div className="flex flex-row gap-x-4">
        <img
          src={trailer.driverImage}
          alt="Trailer"
          className="w-56 h-40 object-cover rounded-3xl"
        />
        <div className="flex flex-row w-full px-2 relative justify-around items-center gap-x-2">
          <div className="flex flex-col gap-y-2">
            <h2 className="text-xl font-bold text-richblue-500">{trailer.truckModel}</h2>
            <p className="text-sm text-gray-600 text-richblue-600">
              Availability: {trailer.trailerAvailability}
            </p>
            <p className="text-sm text-gray-600 text-richblue-600">
              Load Capacity: {trailer.loadCapacity}
            </p>
            <p className="text-sm text-gray-600 text-richblue-600">
              Maintenance Status: {trailer.maintenanceStatus}
            </p>
            <p className="text-sm text-gray-600 text-richblue-600">
              Temperature Controlled: {trailer.temperatureControlled ? "Yes" : "No"}
            </p>
          </div>
          <div className="flex flex-col gap-y-3 items-center">
          <p className="text-sm text-gray-600 text-richblue-600">
              Driver: {trailer.driverName} ({trailer.driverReliabilityScore})
            </p>
            <p className="text-sm text-gray-600 text-richblue-600">
              Contact: {trailer.driverContactInfo}
            </p>
          <button
            className="px-4 py-2 rounded-md bg-blu text-white font-semibold"
            onClick={() => onAssignDelivery(trailer)}
          >
            Assign a Delivery
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrailerCard;
