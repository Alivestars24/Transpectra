import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { fetchDeliveryDetails } from '../../../services/oparations/CompanyAPI';

function FetchedDeliveries() {
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const user = useSelector((state) => state.profile?.user || null); 
    const company = useSelector((state) => state.company?.company || null);
    const managerId = company?._id;
    const order = useSelector((state) => state.delivery || []);
    const orders= [
        {
            "_id": "674dc4b05c9da7d8d5cf4b00",
            "uniqueOrderId": "7pcf2st2",
            "selectedProducts": [
                {
                    "productName": "Basmati Rice (5kg)",
                    "quantity": 60,
                    "specifications": "Raw ",
                    "_id": "674dc4b05c9da7d8d5cf4b01"
                },
                {
                    "productName": "Groundnut Oil (1L)",
                    "quantity": 100,
                    "specifications": "Best Quality",
                    "_id": "674dc4b05c9da7d8d5cf4b02"
                }
            ],
            "manufacturerId": "674d6862073b5fffa952138e",
            "manufacturerName": "Patels Oils & Co",
            "warehouseId": "674d65fa073b5fffa9521327",
            "estimatedDeliveryDate": "2024-12-18T00:00:00.000Z",
            "actualDeliveryDate": null,
            "orderStatus": "Processing",
            "deliveries": [
                "674f41a1f53f1a4e550c3323"
            ],
            "qrCodeImageUrl": "https://res.cloudinary.com/dvfmv4bpb/image/upload/v1733149875/orders/qr-codes/whswkqe66ohp6ntcsm3k.png",
            "orderCreatedDate": "2024-12-02T14:31:12.962Z",
            "createdAt": "2024-12-02T14:31:12.968Z",
            "updatedAt": "2024-12-03T17:36:33.509Z",
            "__v": 0,
            "deliveriesDetails": [
                {
                    "pickupLocation": {
                        "address": "Bhilai nagar, Magarpatta, Pune",
                        "contactPerson": "Gagan Arora",
                        "contactNumber": "1234554321"
                    },
                    "dropoffLocation": {
                        "address": "Sinhgad road, Ambegaon Vadgaon, Pune-411041",
                        "contactPerson": "Ajay Deewan",
                        "contactNumber": "9878690959"
                    },
                    "packageDetails": {
                        "weight": "10kg",
                        "dimensions": "Varied",
                        "fragile": false,
                        "description": "Delivery of selected products"
                    },
                    "_id": "674f41a1f53f1a4e550c3323",
                    "orderId": "674dc4b05c9da7d8d5cf4b00",
                    "uniqueOrderId": "7pcf2st2",
                    "warehouseId": "674d65fa073b5fffa9521327",
                    "ManufactureId": "674d6862073b5fffa952138e",
                    "products": [
                        {
                            "productName": "Basmati Rice (5kg)",
                            "quantity": 66,
                            "specifications": "Raw ",
                            "unitCost": 66,
                            "_id": "674dc4b05c9da7d8d5cf4b01"
                        }
                    ],
                    "deliveryRoutes": [
                        {
                            "step": 0,
                            "from": "Supplier",
                            "to": "Delhi Airport",
                            "by": "road",
                            "distance": 0,
                            "expectedTime": "N/A",
                            "cost": 0,
                            "_id": "674f41a1f53f1a4e550c3324"
                        },
                        {
                            "step": 1,
                            "from": "Delhi",
                            "to": "Jaipur",
                            "by": "air",
                            "distance": 280,
                            "expectedTime": "5 hours",
                            "cost": 1000,
                            "_id": "674f41a1f53f1a4e550c3325"
                        },
                        {
                            "step": 2,
                            "from": "Jaipur",
                            "to": "Udaipur",
                            "by": "road",
                            "distance": 420,
                            "expectedTime": "7 hours",
                            "cost": 1400,
                            "_id": "674f41a1f53f1a4e550c3326"
                        }
                    ],
                    "overallTripCost": 2400,
                    "status": "Pending",
                    "assignedDriver": [],
                    "routeTrackingid": null,
                    "estimatedDeliveryTime": "2024-12-05T15:30:00.000Z",
                    "invoicePdf": "https://res.cloudinary.com/dvfmv4bpb/raw/upload/v1733247392/invoices/paj2doj0ghh53bqql1xn.pdf",
                    "createdAt": "2024-12-03T17:36:33.480Z",
                    "uniqueDeliveryId": "3wfhb8kh",
                    "__v": 0
                }
            ]
        },
        {
            "_id": "674df1275c9da7d8d5cf4d8c",
            "uniqueOrderId": "0woouub6",
            "selectedProducts": [
                {
                    "productName": "Stainless Steel Utensils",
                    "quantity": 100,
                    "specifications": "Strong and sturdy",
                    "_id": "674df1275c9da7d8d5cf4d8d"
                }
            ],
            "manufacturerId": "674d6862073b5fffa952138e",
            "manufacturerName": "Patels Oils & Co",
            "warehouseId": "674d65fa073b5fffa9521327",
            "estimatedDeliveryDate": "2024-12-10T00:00:00.000Z",
            "actualDeliveryDate": null,
            "orderStatus": "pending",
            "deliveries": [],
            "qrCodeImageUrl": "https://res.cloudinary.com/dvfmv4bpb/image/upload/v1733161257/orders/qr-codes/m2wxotjz6hh1l6bwvl0u.png",
            "orderCreatedDate": "2024-12-02T17:40:55.844Z",
            "createdAt": "2024-12-02T17:40:55.845Z",
            "updatedAt": "2024-12-02T17:40:58.639Z",
            "__v": 0,
            "deliveriesDetails": []
        }
    ]
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
      };
   const [searchQuery, setSearchQuery] = useState("");
    const filteredOrders = orders.filter(
        (order) =>
          order.deliveriesDetails.length > 0 &&
          order.uniqueOrderId.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const handleNavigate = (deliveriesDetails) => {
        navigate("/fulfill-order", { state: { deliveriesDetails } });
      };

    useEffect(() => {
        dispatch(fetchDeliveryDetails({ managerId }));
    }, [dispatch, company]);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Orders Overview</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by Order ID"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="grid grid-cols-1 w-full gap-6">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div
              key={order.uniqueOrderId}
              className="border border-gray-300 shadow-lg rounded-lg p-6 flex  justify-between bg-white hover:shadow-xl transition-shadow duration-300"
            >
              <div>
                <div className='flex flex-col gap-y-1 items-start'>
                <h2 className="text-2xl font-semibold mb-3">
                  Order ID: {order.uniqueOrderId}
                </h2>
                <p className="text-gray-600 mb-2">
                  <strong>Drop Off Address: </strong> {order.deliveriesDetails.dropoffLocation.address}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Warehouse Manager:</strong> {order.deliveriesDetails.dropoffLocation.contactPerson} {/* Replace with warehouse name */}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Warehouse Contact:</strong> {order.deliveriesDetails.dropoffLocation.contactNumber} {/* Replace with warehouse name */}
                </p>
                </div>
                <div className='flex flex-col gap-y-1 items-start'>
                <p className="text-gray-600 mb-2">
                  <strong>Products:</strong>{" "}
                  {order.selectedProducts.map((product) => product.productName).join(", ")}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Estimated Delivery:</strong>{" "}
                  {new Date(order.estimatedDeliveryDate).toLocaleDateString()}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Status:</strong> {order.orderStatus}
                </p>
                </div>
                
              </div>

              <button
                onClick={() => handleNavigate(order.deliveriesDetails)}
                className="mt-4 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 self-end transition-all duration-300"
              >
                Fulfill Delivery
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No orders found matching your criteria.
          </p>
        )}
      </div>
    </div>
  )
}

  
export default FetchedDeliveries;