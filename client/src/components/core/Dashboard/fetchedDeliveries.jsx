import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDeliveryDetails } from '../../../services/oparations/CompanyAPI';

function FetchedDeliveries() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch user and company data
  const user = useSelector((state) => state.profile?.user || null);
  const company = useSelector((state) => state.company?.company || null);
  const managerId = company?._id;
  // State for orders and search functionality
  const [searchQuery, setSearchQuery] = useState('');
  const orders = useSelector((state) => state.delivery.delivery || []);

  // Filter orders based on search query and `Processing` status
  const filteredOrders = Array.isArray(orders)
  ? orders.filter(
      (order) =>
        order.orderStatus === 'Processing' &&
        order.uniqueOrderId.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : [];


  // Handle navigation to fulfill order
  const handleNavigate = (deliveries,routes) => {
    console.log("Routes are new:",routes)
    navigate('/dashboard/route-details', { state: { deliveriesDetails:deliveries,routes:routes } });
  };

  // Fetch delivery details on component load
  useEffect(() => {
    if (managerId) {
      dispatch(fetchDeliveryDetails({ managerId }));
    }
  }, [dispatch, managerId]);
  useEffect(() => {
    console.log('Orders:', orders); // Log to check the value of orders
  }, [orders]);

  return (
    <div className="px-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-8  text-gray-800">
        Delivery Orders Overview
      </h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Order ID"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 w-full gap-6">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div
              key={order.uniqueOrderId}
              className="border border-gray-300 shadow-lg rounded-lg p-6 bg-white shadow-blue-25 hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-xl font-semibold mb-3 text-gray-800">
                  Order ID: {order.uniqueOrderId}
              </h2>
              <div className='flex flex-row gap-x-4'>
              <div className="mb-1 flex flex-col gap-y-2 max-w-sm">
                <p className="text-gray-600 mb-2">
                  <strong>Drop Off Address:</strong> {order.deliveries[0]?.dropoffLocation?.address || 'N/A'}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Warehouse Manager:</strong>{' '}
                  {order.deliveries[0]?.dropoffLocation?.contactPerson || 'N/A'}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Warehouse Contact:</strong>{' '}
                  {order.deliveries[0]?.dropoffLocation?.contactNumber || 'N/A'}
                </p>
              </div>

              <div className="mb-1 flex flex-col gap-y-2">
                <p className="text-gray-600 mb-2">
                  <strong>Products:</strong>{' '}
                  {order.selectedProducts.map((product) => product.productName).join(', ') || 'N/A'}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Estimated Delivery:</strong>{' '}
                  {order.estimatedDeliveryDate
                    ? new Date(order.estimatedDeliveryDate).toLocaleDateString()
                    : 'N/A'}
                </p>
                <button
                onClick={() => handleNavigate(order.deliveries,order.deliveries[0]?.deliveryRoutes)}
                className="mt-1 w-full bg-blu text-white py-2 px-4 rounded-lg hover:bg-dblue transition-all duration-300"
              >
                Fulfill Delivery
              </button>
              </div>
              </div>

            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No orders found matching your criteria.
          </p>
        )}
      </div>
    </div>
  );
}

export default FetchedDeliveries;
