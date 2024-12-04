import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWarehouseOrdersDetails } from '../../../services/oparations/warehouseAPI';
import img from '../../../assets/Images/invimg.png';
import QRModal from "../../Common/QrModal";
import PastDeliveryTable from './PastDeliveryTable';
import {apiConnector} from "../../../services/apiConnector";
import {toast} from "react-hot-toast";

const Orders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [qrModal, setQRModal] = useState(null);

  const warehouse = useSelector((state) => state.warehouse?.warehouse || null);
  const managerId = warehouse?._id;
  const orderList = useSelector((state) => state.order?.order || []);

  useEffect(() => {
    if (managerId) {
      dispatch(fetchWarehouseOrdersDetails({ managerId }));
    }
  }, [dispatch, managerId]);

  const handleOpenPDF = async (filePath) => {
    try {
      const response = await apiConnector(
        "POST",                        // HTTP method
        "http://localhost:4000/api/v1/pdf/generate-signed-url",     // Backend endpoint
        { filePath },
      );
  
      const { url } = response.data;
      if (url) {
        window.open(url, "_blank", "noopener,noreferrer"); // Open the signed URL
      } else {
        alert("Failed to fetch the signed URL.");
      }
    } catch (error) {
      console.error("Error fetching signed URL:", error);
    }
  };
  
  const handleTrackDelivery = (orderId) => navigate(`/dashboard/track-delivery`);
  const handleRemindManufacturer = (orderId) => {
    // Logic to remind manufacturer
    toast.success("Reminder Sent Successfully for Order!")
  };

  return (
    <div className="px-6">
      <h1 className="text-2xl font-bold mb-4">Ongoing Orders</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by order number or manufacturer"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="flex flex-col gap-y-4">
        {orderList.map((order) => (
          <div
            key={order._id}
            className={`border p-4 rounded-lg shadow-md`}
          >
            <div className="flex gap-x-3 justify-between">
              <div className="flex items-center">
                {order.orderStatus === 'Processing' && (
                  <div className="relative">
                    <img src={img} className="h-36 w-32" />
                    <div className="absolute bottom-0 w-full bg-gray-300 py-5 rounded-sm">
                    <button
                    className="absolute bottom-0 left-0 w-full py-1 bg-black text-white text-sm"
                    onClick={() => handleOpenPDF(order.deliveriesDetails[0]?.invoicePdf)}
                    >
                    Open Invoice
                    </button>

                    </div>
                  </div>
                )}

                <div className="ml-12 flex flex-col justify-center gap-y-2">
                  <p className="text-lg font-semibold">Unique Order Id: {order.uniqueOrderId}</p>
                  <p className="text-blue-800">Manufacturer: {order.manufacturerName}</p>
                  <p className="text-blue-800">Expected Delivery Date: {new Date(order.estimatedDeliveryDate).toLocaleDateString()}</p>
                  <div className="text-md flex flex-row gap-x-2 items-center">
                    <p>Status:</p> 
                    <div className={`rounded-lg px-6 py-1 ${
              order.orderStatus === 'Processing'
                ? 'bg-caribbeangreen-100'
                : 'bg-yellow-100'
            }`}>{order.orderStatus}</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-y-5 max-w-md justify-center">
                
              {order.orderStatus === 'pending' && (
                <div className='flex flex-col gap-y-5'>
                <p className="text-sm">
                  Products:{" "}
                  {order.selectedProducts
                    .map(
                      (product) =>
                        `${product.productName} -> ${product.specifications}, Qty: ${product.quantity}`
                    )
                  .join(", ")}
                </p>
                <p className="text-blue-800">Order Created On: {new Date(order.orderCreatedDate).toLocaleDateString()}</p>
                  </div>
                )}
                {order.orderStatus === 'Processing' ? (
                  <>
                    <button
                      className="px-12 py-2 bg-blu text-white font-semibold rounded-lg"
                      onClick={() => handleTrackDelivery(order._id)}
                    >
                      Track Order
                    </button>
                    <button
                    className="px-12 py-2 bg-richblue-800 text-white font-semibold rounded-lg"
                    onClick={() =>
                    setQRModal({
                        text1: "Scan the QR Code",
                        btn2Handler: () => setQRModal(null),
                        qrImage: order.qrCodeImageUrl, // Pass the specific order's QR code
                    })
                    }
                    >
                    View QR Code
                    </button>

                  </>
                ) : (
                  <button
                    className="px-4 py-2 bg-blu text-white font-semibold rounded-lg"
                    onClick={() => handleRemindManufacturer(order.uniqueOrderId)}
                  >
                    Remind Manufacturer
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <PastDeliveryTable />

      {qrModal && <QRModal modalData={qrModal} qrImage={qrModal.qrImage} />}
      </div>
  );
};

export default Orders;
