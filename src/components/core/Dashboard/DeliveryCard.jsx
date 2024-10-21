import React, { useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import QRModal from "../../Common/QrModal";
import ConfirmationModal from "../../Common/ConfirmationModal";
import Qrimg from "../../../assets/Images/QRcode.jpg"

function DeliveryCard({
  driverName,
  driverImage,
  status,
  expectedArrival,
  dcLocation,
  orderDate,
  isDispatched,
  productsList,
}) {
  const [showProducts, setShowProducts] = useState(false);
  const [qrModal, setQRModal] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  return (
    <div className="p-2 w-full mx-auto bg-white shadow-md border border-[#dff0ff] shadow-[#daedff] rounded-lg">
      <div className="flex flex-row gap-x-4">
        <img
          src={driverImage}
          alt="Trailer"
          className="w-60 h-40 object-cover rounded-3xl"
        />
        <div className="flex flex-row w-[700px] px-2 relative justify-around items-center gap-x-2">
          <div className="flex flex-col gap-y-2">
            <h2 className="text-xl font-bold text-richblue-500">Driver: {driverName}</h2>
            <p className="text-sm text-gray-600 text-richblue-600">
              Status: {status ? "Dispatched" : "Pending"}
            </p>
            <p className="text-sm text-gray-600 text-richblue-500">
              Expected Arrival: {expectedArrival}
            </p>
          </div>
          <div className="flex flex-col gap-y-2">
            <p className="text-sm text-gray-600 font-semibold text-richblue-500">
              DC: {dcLocation} 
            </p>
            <p className="text-sm text-gray-600 text-richblue-500">
              Order Placed On: {orderDate}
            </p>
            <button
              className={`px-4 py-2 rounded ${
                isDispatched ? "bg-richblue-600" : "bg-blu"
              } text-white font-bold`}
              onClick={
                isDispatched
                  ? () =>
                      setQRModal({
                        text1: "Scan the QR Code",
                        btn2Handler: () => setQRModal(null),
                      })
                  : () =>
                      setConfirmationModal({
                        text1: "Are you sure?",
                        text2: "You will reject the incoming delivery.",
                        btn1Text: "Reject",
                        btn2Text: "Cancel",
                        btn2Handler: () => setConfirmationModal(null),
                      })
              }
            >
              {isDispatched ? "Scan the QR code" : "Reject Delivery"}
            </button>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div
          className="flex items-center cursor-pointer text-blu"
          onClick={() => setShowProducts(!showProducts)}
        >
          <p className="underline font-semibold ">See the products list</p>
          {showProducts ? (
            <AiOutlineUp className="ml-2" />
          ) : (
            <AiOutlineDown className="ml-2" />
          )}
        </div>
        {showProducts && (
          <div className="w-full mx-auto p-1 border-[1px] border-blue-800 rounded-lg shadow-sm shadow-llblue mt-2">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-richblue-600 text-white text-xs font-medium">
                  <th className="py-1 px-2 border-b-2 border-blue-500">ID</th>
                  <th className="py-2 px-2 border-b-2 border-blue-500">Product Name</th>
                  <th className="py-2 px-2 border-b-2 border-blue-500">Quantity</th>
                  <th className="py-2 px-2 border-b-2 border-blue-500">Status</th>
                  <th className="py-2 px-2 border-b-2 border-blue-500">Arrival Date</th>
                </tr>
              </thead>
              <tbody>
                {productsList.map((product, index) => (
                  <tr
                    key={product.id}
                    className={`${
                      index % 2 === 0 ? "bg-[#dcecff]" : "bg-blue-5"
                    } text-richblue-600 text-xs font-inter`}
                  >
                    <td className="py-2 px-5 border-b text-center border-blue-300">{product.id}</td>
                    <td className="py-2 px-5 border-b text-center border-blue-300">{product.name}</td>
                    <td className="py-2 px-5 border-b text-center border-blue-300">{product.quantity}</td>
                    <td className="py-2 px-5 border-b text-center border-blue-300">{product.status}</td>
                    <td className="py-2 px-5 border-b text-center border-blue-300">{product.dateReceived}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {qrModal && <QRModal modalData={qrModal} qrImage={Qrimg} />}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
}

export default DeliveryCard;
