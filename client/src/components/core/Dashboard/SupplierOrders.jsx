import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { fetchOrderDetails } from '../../../services/oparations/CompanyAPI';

function SupplierOrders() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.profile?.user || null); 
    const company = useSelector((state) => state.company?.company || null);
    const managerId = company?._id;
    const order = useSelector((state) => state.order?.order || []);

    useEffect(() => {
        dispatch(fetchOrderDetails({ managerId }));
    }, [dispatch, company]);

    // Search term state
    const [searchTerm, setSearchTerm] = useState('');

    // Filter warehouse orders based on the search term and order status
    const filteredOrders = order.filter(({ warehouseDetails, orders }) => {
        // Only include warehouses if all orders have a "pending" status
        const allPending = orders.every(order => order.orderStatus === 'pending');
        return allPending && warehouseDetails?.warehouseName.toLowerCase().includes(searchTerm.toLowerCase());
    });

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
                {filteredOrders.map(({ warehouseDetails, orders }, index) => {
                    const firstOrder = orders[0] || {};
                    const pendingOrders = orders.filter(order => order.orderStatus === 'pending');

                    return (
                        <div key={index} className="bg-white border border-gray-200 shadow-lg rounded-lg p-4 flex">
                            {/* Warehouse Image */}
                            <div className="w-2/6">
                                <img
                                    src={warehouseDetails?.warehouseImage || ''}
                                    alt="Warehouse"
                                    className="w-full h-full object-cover rounded-md"
                                />
                            </div>

                            {/* Order Details - Left Side */}
                            <div className='flex w-1/3 flex-col gap-y-2 pl-4 justify-between'>
                                <h3 className="text-md text-richblue-600">{warehouseDetails?.warehouseName}</h3>
                                <p className="text-md text-richblue-600"><strong>Order Date:</strong> {new Date(firstOrder.orderCreatedDate).toLocaleDateString()}</p>
                                <p className="text-md text-richblue-600"><strong>Expected Delivery:</strong> {new Date(firstOrder.estimatedDeliveryDate).toLocaleDateString()}</p>
                            </div>

                            {/* Order Details - Right Side */}
                            <div className="flex ml-44 flex-col justify-between">
                                <p className="text-md text-richblue-600"><strong>Warehouse Address:</strong> {warehouseDetails?.warehouseAddress}</p>
                                {/* Fulfill Order Button */}
                                <button
                                    onClick={() => navigate(`/dashboard/fulfill-order`, { state: { pendingOrders, warehouseDetails:warehouseDetails,uniqueId:orders[0].uniqueOrderId } })}
                                    className="mt-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    Fulfill the Order
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default SupplierOrders;
