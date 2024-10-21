import React from 'react';
import { useNavigate } from 'react-router-dom'; // For navigating to the delivery tracking page
import img from '../../../assets/Images/invimg.png'
import QRModal from "../../Common/QrModal";
import ConfirmationModal from "../../Common/ConfirmationModal";
import Qrimg from "../../../assets/Images/QRcode.jpg"
import { useState } from 'react';
import PastDeliveryTable from './PastDeliveryTable';

const orders = [
  {
    id: 1,
    orderNumber: 'ORD-1001',
    supplier: 'Saksham Pvt Ltd',
    deliveryDate: '2024-10-20',
    status: 'In Transit',
    totalValue: '₹7,50,000',
    paymentStatus: 'Unpaid',
    invoicePDF: '/Invoice1.pdf.docx' // PDF in the public folder
  },
  {
    id: 2,
    orderNumber: 'ORD-1002',
    supplier: 'Akash Electronics',
    deliveryDate: '2024-10-22',
    status: 'In Transit',
    totalValue: '₹1,50,000',
    paymentStatus: 'Paid',
    invoicePDF: '/Invoice1.pdf.docx'
  }
];

const Orders = () => {
  const navigate = useNavigate();

  // Function to handle opening the PDF
  const handleOpenPDF = (pdfPath) => {
    window.open(pdfPath, '_blank'); // Opens PDF in a new tab
  };

  // Function to navigate to delivery tracking
  const handleTrackDelivery = (orderId) => {
    // navigate(`/track-delivery/${orderId}`);
    navigate(`/dashboard/track-delivery`);
  };
  const [qrModal, setQRModal] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  return (
    <div className="px-6">
      <h1 className="text-2xl font-bold mb-4">Ongoing Orders</h1>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by order number or supplier"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="flex flex-col justify-center gap-y-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="relative border p-4 rounded-lg shadow-md flex justify-between items-center"
          >
            {/* Left-hand side: PDF Thumbnail and Invoice Button */}
            <div className="flex items-center">
              {/* Placeholder for PDF Thumbnail */}
              <div className='relative'>
              <img src={img} className='h-36 w-32'/>
              <div className="py-5 w-full bg-gray-300 absolute bottom-0  rounded-sm">
                {/* Button overlay for opening the invoice */}
                <button
                  className="absolute bottom-0 left-0 w-full py-1 bg-black text-white text-sm text-center"
                  onClick={() => handleOpenPDF(order.invoicePDF)}
                >
                  Open Invoice
                </button>
              </div>
              </div>

              {/* Order Information */}
              <div className="ml-4 flex flex-col justify-center gap-y-2 pl-6">
                <p className="text-lg font-semibold">{order.orderNumber}</p>
                <p className="text-blue-800">Supplier: {order.supplier}</p>
                <p className="text-blue-800">Delivery Date: {order.deliveryDate}</p>
                <p className={`text-md ${order.status === 'In Transit' ? 'text-blue-900' : 'text-green-500'}`}>
                  Status : {order.status}
                </p>
              </div>
            </div>

            {/* Right-hand side: Track Delivery Button */}
            <div className='flex flex-col gap-y-1 w-64 pr-20 justify-between'>
              
              <p className="text-md text-richblue-600 ">Payment Status: {order.paymentStatus}</p>
              <button
                className="px-4 py-2 bg-blu text-white font-semibold rounded-lg mt-2"
                onClick={() => handleTrackDelivery(order.id)}
              >
                Track Order
              </button>
              <button
                className="px-4 py-2 bg-richblue-800 text-white font-semibold rounded-lg mt-2"
                onClick={() =>
                          setQRModal({
                            text1: "Scan the QR Code",
                            btn2Handler: () => setQRModal(null),
                          })
                  }
              >
                View QR Code
              </button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <PastDeliveryTable/>
      </div>
      {qrModal && <QRModal modalData={qrModal} qrImage={Qrimg} />}
    </div>
  );
};

export default Orders;
