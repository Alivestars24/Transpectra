import React, { useState } from 'react';
import warehouseImage from '../../../assets/Images/image1.png';
import warehouseImage1 from '../../../assets/Images/wh2.jpeg';
import warehouseImage2 from '../../../assets/Images/wh3.jpeg'; // Replace with actual image
import { useNavigate } from 'react-router-dom';

function SupplierOrders() {
    const navigate = useNavigate();

    // Sample warehouse orders data
    const [warehouseOrders] = useState([
        {
            id: "W123",
            warehouseName: "Bharat Logistics, Gurugram",
            orderDate: "2024-10-18",
            expectedDelivery: "2024-10-20",
            quantity: 500,
            img:warehouseImage,
            priority: "High",
            manager: "Ajay Massay",
        },
        {
            id: "W456",
            warehouseName: "Mumbai Logistics Hub",
            orderDate: "2024-10-17",
            expectedDelivery: "2024-10-21",
            quantity: 1200,
            img:warehouseImage1,
            priority: "Low",
            manager: "Sunil Sharma",
        },
        {
            id: "W789",
            warehouseName: "Chennai Distribution Center",
            orderDate: "2024-10-15",
            expectedDelivery: "2024-10-22",
            quantity: 900,
            img:warehouseImage2,
            priority: "High",
            manager: "Ravi Shetty",
        },
    ]);

    // Search term state
    const [searchTerm, setSearchTerm] = useState('');

    // Filter warehouse orders based on the search term
    const filteredOrders = warehouseOrders.filter(order =>
        order.warehouseName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="px-6">
        <h1 className="text-2xl font-bold mb-4">Request Orders Received</h1>
        
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by warehouse name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

            {/* Warehouse Orders List */}
            <div className="flex flex-col gap-y-4 w-full mt-6">
                {filteredOrders.map(order => (
                    <div key={order.id} className="bg-white border border-gray-200 shadow-lg rounded-lg p-4 flex">
                        {/* Warehouse Image */}
                        <div className="w-1/4">
                            <img src={order.img} alt="Warehouse" className="w-full h-32 object-cover rounded-md" />
                        </div>

                        {/* Order Details - Left Side */}
                        <div className='flex flex-col gap-y-2 pl-8 justify-between'>
                            <h3 className="text-md text-richblue-600">{order.warehouseName}</h3>
                            <p className="text-md text-richblue-600"><strong>Order Date:</strong> {order.orderDate}</p>
                            <p className="text-md text-richblue-600"><strong>Expected Delivery:</strong> {order.expectedDelivery}</p>
                            <p className="text-md text-richblue-600"><strong>Quantity:</strong> {order.quantity}</p>
                        </div>

                        {/* Order Details - Right Side */}
                        <div className=" flex pl-20 flex-col justify-between">
                            <p className="text-md text-richblue-600"><strong>Priority:</strong> {order.priority}</p>
                            <p className="text-md text-richblue-600"><strong>Manager:</strong> {order.manager}</p>
                            {/* Fulfill Order Button */}
                            <button
                                onClick={() => navigate(`/dashboard/fulfill-order`)}
                                className="mt-2 p-2 bg-blu text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Fulfill the Order
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SupplierOrders;
