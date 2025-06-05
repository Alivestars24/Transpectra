import React, { useState } from 'react';
import warehouseImage from '../../../assets/Images/image1.png'; // Replace with actual image
import { useNavigate } from 'react-router-dom';

function SupplierOrders() {
    const navigate = useNavigate();

    // Sample warehouse orders data
    const [warehouseOrders] = useState([
        {
            id: "W123",
            warehouseName: "Gurgaon Central Warehouse",
            orderDate: "2024-10-18",
            expectedDelivery: "2024-10-20",
            quantity: 500,
            status: "Pending",
            manager: "Anil Kumar",
        },
        {
            id: "W456",
            warehouseName: "Mumbai Logistics Hub",
            orderDate: "2024-10-17",
            expectedDelivery: "2024-10-21",
            quantity: 1200,
            status: "In Progress",
            manager: "Sunil Sharma",
        },
        {
            id: "W789",
            warehouseName: "Chennai Distribution Center",
            orderDate: "2024-10-15",
            expectedDelivery: "2024-10-22",
            quantity: 900,
            status: "Pending",
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
        <div className="flex flex-col gap-y-6 justify-center p-4 max-w-7xl mx-auto">
            {/* Heading */}
            <h2 className="text-3xl font-semibold text-gray-800">Supplier Orders Received</h2>
            
            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search by warehouse name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border rounded-md p-2 w-full max-w-lg focus:ring focus:ring-blue-300 outline-none"
            />

            {/* Warehouse Orders List */}
            <div className="grid grid-cols-1 gap-6 mt-6">
                {filteredOrders.map(order => (
                    <div key={order.id} className="bg-white border border-gray-200 shadow-lg rounded-lg p-4 flex">
                        {/* Warehouse Image */}
                        <div className="w-1/4">
                            <img src={warehouseImage} alt="Warehouse" className="w-full h-32 object-cover rounded-md" />
                        </div>

                        {/* Order Details - Left Side */}
                        <div className="w-1/2 pl-4">
                            <h3 className="text-xl font-semibold text-gray-900">{order.warehouseName}</h3>
                            <p className="text-sm text-gray-600 mt-1"><strong>Order Date:</strong> {order.orderDate}</p>
                            <p className="text-sm text-gray-600 mt-1"><strong>Expected Delivery:</strong> {order.expectedDelivery}</p>
                            <p className="text-sm text-gray-600 mt-1"><strong>Quantity:</strong> {order.quantity}</p>
                        </div>

                        {/* Order Details - Right Side */}
                        <div className="w-1/4 flex flex-col justify-between">
                            <p className="text-sm text-gray-600"><strong>Status:</strong> {order.status}</p>
                            <p className="text-sm text-gray-600"><strong>Manager:</strong> {order.manager}</p>
                            {/* Fulfill Order Button */}
                            <button
                                onClick={() => navigate(`/dashboard/fulfill-order/${order.id}`)}
                                className="mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-colors"
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
