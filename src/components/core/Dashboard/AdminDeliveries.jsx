import React from "react";
import DeliveryCardAdmin from "./DeliveryCardAdmin";
import truckImage from "../../../assets/Images/Truck.jpg"; 
import truck2 from "../../../assets/Images/truck1.jpg"
import truck3 from "../../../assets/Images/truck3.jpg"
const products1 = [
  { id: "C2453", name: "Amul Ice Cream", quantity: 200, status: "Selling fast", dateReceived: "2024-08-15" },
  { id: "C5678", name: "Steel Bottle(Plastic)", quantity: 180, status: "Out of Stock soon", dateReceived: "2024-08-15" },
  { id: "C5679", name: "Tiffin Boxes(Small)", quantity: 85, status: "Selling Fast", dateReceived: "2024-08-15" },
];

const products2 = [
  { id: "C2453", name: "Coco Cola Bottle(2 ltr)", quantity: 200, status: "Selling fast", dateReceived: "2024-08-15" },
  { id: "C5678", name: "Water Bottle(Plastic)", quantity: 180, status: "Out of Stock soon", dateReceived: "2024-08-15" },
  { id: "C5679", name: "Tiffin Boxes(Medium)", quantity: 85, status: "Selling Fast", dateReceived: "2024-08-15" },
];

const products3 = [
  { id: "C2453", name: "ThumbsUp Bottle(2 ltr)", quantity: 200, status: "Selling fast", dateReceived: "2024-08-15" },
  { id: "C5678", name: "Vadilal's Ice Cream", quantity: 180, status: "Out of Stock soon", dateReceived: "2024-08-15" },
  { id: "C5679", name: "SkyBag School Bag", quantity: 85, status: "Selling Fast", dateReceived: "2024-08-15" },
];

const deliveryCards = [
  {
    driverName: "Shrikant Salve",
    driverImage: truckImage,
    status: true,
    expectedArrival: "2024-08-16 11:30 AM",
    dcLocation: "Kurnool Distribution Center",
    orderDate: "2024-08-15 9:30 AM",
    productsList: products1,
    storeName: "Vijaywada Store",
  },
  {
    driverName: "Ravi Kumar",
    driverImage: truck2,
    status: false,
    expectedArrival: "2024-08-17 12:00 PM",
    dcLocation: "Kurnool Distribution Center",
    orderDate: "2024-08-16 10:00 AM",
    productsList: products2,
    storeName: "Visakhapatnam Store",
  },
  {
    driverName: "Amit Sharma",
    driverImage: truck3,
    status: true,
    expectedArrival: "2024-08-18 01:00 PM",
    dcLocation: "Kurnool Distribution Center",
    orderDate: "2024-08-17 11:00 AM",
    productsList: products3,
    storeName: "Rajamahendravaram Store",
  },
];

const deliveryList = [
    {
      id: "D1234",
      driverName: "Pradeep Bhale",
      quantityReceived: 280,
      dateReceived: "2024-07-12",
      status: "Received",
      startDate: "2024-07-10",
      endDate: "2024-07-13",
      store: "Store A",
    },
    {
      id: "D5678",
      driverName: "Jatin Mathijia",
      quantityReceived: 850,
      dateReceived: "2024-07-10",
      status: "Received",
      startDate: "2024-07-08",
      endDate: "2024-07-11",
      store: "Store B",
    },
    {
      id: "D2345",
      driverName: "Chandu Guled",
      quantityReceived: 480,
      dateReceived: "2024-07-08",
      status: "Received",
      startDate: "2024-07-06",
      endDate: "2024-07-09",
      store: "Store C",
    },
    {
      id: "D6789",
      driverName: "Pradeep Bhale",
      quantityReceived: 210,
      dateReceived: "2024-07-05",
      status: "Rejected",
      startDate: "2024-07-03",
      endDate: "2024-07-06",
      store: "Store D",
    },
    {
      id: "D3456",
      driverName: "Shrikant Salve",
      quantityReceived: 170,
      dateReceived: "2024-07-03",
      status: "Rejected",
      startDate: "2024-07-01",
      endDate: "2024-07-04",
      store: "Store E",
    },
    {
      id: "D7890",
      driverName: "Shrikant Salve",
      quantityReceived: 195,
      dateReceived: "2024-07-01",
      status: "Received",
      startDate: "2024-06-29",
      endDate: "2024-07-02",
      store: "Store F",
    },
  ];
  
function AdminDeliveries() {
  return (
    <div className="flex flex-col gap-y-4">
        <div>
         <p className="text-2xl text-richblue-400 font-semibold">Ongoing Deliveries</p>
        </div>
        <div className="flex flex-col gap-y-3 ">
        {deliveryCards.map((card, index) => (
          <DeliveryCardAdmin key={index} {...card} />
        ))}
        </div>
        <div>
         <p className="text-2xl text-richblue-400 mt-4 font-semibold">Past Deliveries</p>
        </div>
        {
            <div className="w-full mx-auto p-1 border border-richblue-700 rounded-lg shadow-sm shadow-llblue mt-2">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-richblue-700 text-white text-xs font-medium">
                  <th className="py-2 px-1 border-b-2 border-blue-500">ID</th>
                  <th className="py-2 px-2 border-b-2 border-blue-500">Driver Name</th>
                  <th className="py-2 px-2 border-b-2 border-blue-500">Quantity Recieved</th>
                  <th className="py-2 px-2 border-b-2 border-blue-500">Status</th>
                  <th className="py-2 px-2 border-b-2 border-blue-500">Order Placed On</th>
                  <th className="py-2 px-2 border-b-2 border-blue-500">Departure Date</th>
                  <th className="py-2 px-2 border-b-2 border-blue-500">Arrival Date</th>
                  <th className="py-2 px-2 border-b-2 border-blue-500">Delivered To</th>
                </tr>
              </thead>
              <tbody>
                {deliveryList.map((delivery, index) => (
                  <tr
                    key={delivery.id}
                    className={`${
                      index % 2 === 0 ? "bg-[#f7faff]" : "bg-blue-5"
                    } text-richblue-600 text-xs font-inter`}
                  >
                    <td className="py-[12px] px-4 border-b text-center border-blue-300">{delivery.id}</td>
                    <td className="py-2 px-5 border-b text-center border-blue-300">{delivery.driverName}</td>
                    <td className="py-2 px-5 border-b text-center border-blue-300">{delivery.quantityReceived}</td>
                    <td className="py-2 px-5 border-b text-center border-blue-300">{delivery.status}</td>
                    <td className="py-2 px-5 border-b text-center border-blue-300">{delivery.dateReceived}</td>
                    <td className="py-2 px-5 border-b text-center border-blue-300">{delivery.startDate}</td>
                    <td className="py-2 px-5 border-b text-center border-blue-300">{delivery.endDate}</td>
                    <td className="py-2 px-5 border-b text-center border-blue-300">{delivery.store}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
    </div>
  );
}

export default AdminDeliveries;
