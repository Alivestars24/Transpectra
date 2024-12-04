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
    console.log("Orders fetched are:", order);

    useEffect(() => {
        dispatch(fetchOrderDetails({ managerId }));
    }, [dispatch, company]);

    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="px-6">
            <h1 className="text-2xl font-bold mb-4">Request Orders Received</h1>

            {/* Search Bar */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by warehouse name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
            </div>

            {/* Display all orders */}
            <div className="flex flex-col gap-y-4 w-full mt-6">
                {order.map(({ warehouseDetails, orders =[]}, warehouseIndex) => {
                    const pendingOrders = orders.filter((singleOrder) => singleOrder.orderStatus === "pending");
                    return pendingOrders.map((singleOrder, orderIndex) => (
                        <div 
                            key={`${warehouseIndex}-${orderIndex}`} 
                            className="bg-white border border-gray-200 shadow-lg rounded-lg p-4 flex flex-col gap-y-4"
                        >
                            {/* Warehouse Information */}
                            <div className="flex">
                                {/* Warehouse Image */}
                                <div className="w-1/3">
                                    <img
                                        src={warehouseDetails?.warehouseImage || ''}
                                        alt="Warehouse"
                                        className="w-full h-full object-cover rounded-md"
                                    />
                                </div>

                                {/* Warehouse Details */}
                                <div className='flex flex-col'>
                                    <div className='flex gap-x-3 '>
                                    <div className="flex flex-col w-2/3 pl-4 pt-4 max-w-xs gap-y-3">
                                    <h3 className="text-lg font-bold text-richblue-600">{warehouseDetails?.warehouseName}</h3>
                                    <p className="text-md text-richblue-600"><strong>Address:</strong> {warehouseDetails?.warehouseAddress}</p>
                                    <p className="text-md text-richblue-600"><strong>Area:</strong> {warehouseDetails?.warehouseArea} sq. ft.</p>
                                </div>

                                <div className="pt-4 flex flex-col gap-y-3">
                                <p className="text-md text-richblue-600"><strong>Order ID:</strong> {singleOrder.uniqueOrderId}</p>
                                <p className="text-md text-richblue-600"><strong>Order Date:</strong> {new Date(singleOrder.orderCreatedDate).toLocaleDateString()}</p>
                                <p className="text-md text-richblue-600"><strong>Expected Delivery:</strong> {new Date(singleOrder.estimatedDeliveryDate).toLocaleDateString()}</p>
                                </div>
                                    </div>
                                    <div className="mt-4">
                                <button
                                    onClick={() => navigate(`/dashboard/fulfill-order`, { 
                                        state: { 
                                            pendingOrders: singleOrder, 
                                            warehouseDetails: warehouseDetails ,
                                            uniqueId:singleOrder.uniqueOrderId
                                        } 
                                    })}
                                    className="w-full mt-1 p-2 mx-2 bg-blu text-white rounded-md hover:bg-blue-800 transition-colors"
                                >
                                    Fulfill the Order
                                </button>
                            </div>
                                </div>
                            </div>
                        </div>
                    ));
                })}
            </div>
        </div>
    );
}

export default SupplierOrders;
