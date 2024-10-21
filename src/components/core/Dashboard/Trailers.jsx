import React, { useState } from "react";
import TrailerCard from "./TrailerCard";
import ConfirmationModal from "../../Common/DeliveryModal";
import trailer1 from "../../../assets/Images/trailer1.jpeg"
import trailer2 from "../../../assets/Images/trailer2.jpeg"
import trailer3 from "../../../assets/Images/trailer3.jpeg"
import trailer4 from "../../../assets/Images/trailer4.jpg"

const trailers = [
  {
    truckModel: "Freightliner Cascadia",
    driverName: "Pradeep Bhale",
    driverImage: trailer1,
    trailerAvailability: "Available",
    loadCapacity: "20 Tons",
    maintenanceStatus: "Good",
    temperatureControlled: true,
    driverReliabilityScore: 4.8,
    driverContactInfo: "555-1234",
  },
  {
    truckModel: "Volvo VNL",
    driverName: "Chandu Guled",
    driverImage: trailer2,
    trailerAvailability: "On Delivery",
    loadCapacity: "18 Tons",
    maintenanceStatus: "Due",
    temperatureControlled: false,
    driverReliabilityScore: 4.5,
    driverContactInfo: "555-5678",
  },
  {
    truckModel: "Peterbilt 579",
    driverName: "Jatin Mathijia",
    driverImage: trailer4,
    trailerAvailability: "Available",
    loadCapacity: "10 Tons",
    maintenanceStatus: "Good",
    temperatureControlled: false,
    driverReliabilityScore: 3.5,
    driverContactInfo: "555-5668",
  },
  {
    truckModel: "Kenworth T680",
    driverName: "Shrikant Salve",
    driverImage: trailer3,
    trailerAvailability: "Available",
    loadCapacity: "5 Tons",
    maintenanceStatus: "Good",
    temperatureControlled: false,
    driverReliabilityScore: 4.1,
    driverContactInfo: "555-4678",
  },
];

function TrailerManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmationModal, setConfirmationModal] = useState(null);

  const filteredTrailers = trailers.filter((trailer) =>
    trailer.trailerAvailability.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAssignDelivery = (trailer, deliveryId) => {
    console.log(`Assigned delivery ID ${deliveryId} to trailer ${trailer.truckModel}`);
    // Handle the assignment logic here
  };

  return (
    <div className="p-4 w-full mx-auto">
      <div className="flex flex-col items-center mb-4">
        <input
          type="text"
          placeholder="Search by availability"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {filteredTrailers.map((trailer, index) => (
        <TrailerCard
          key={index}
          trailer={trailer}
          onAssignDelivery={(deliveryId) =>
            setConfirmationModal({
              text1: "Assign Delivery",
              text2: "Please enter the delivery ID to assign.",
              btn1Text: "Assign",
              btn2Text: "Cancel",
              btn2Handler: () => setConfirmationModal(null),
              onAssignDelivery: () => handleAssignDelivery(trailer, deliveryId),
            })
          }
        />
      ))}

      {confirmationModal && (
        <ConfirmationModal
          modalData={{
            ...confirmationModal,
            onAssignDelivery: (deliveryId) => {
              confirmationModal.onAssignDelivery(deliveryId);
              setConfirmationModal(null);
            },
          }}
        />
      )}
    </div>
  );
}

export default TrailerManagementPage;
