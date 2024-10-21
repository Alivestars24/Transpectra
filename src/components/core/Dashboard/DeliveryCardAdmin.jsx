import React, { useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import ConfirmationModal from "../../Common/MapModal";
import img from "../../../assets/Images/map.png"

function DeliveryCardAdmin({
  driverName,
  driverImage,
  status,
  expectedArrival,
  dcLocation,
  orderDate,
  productsList,
  storeName, // New prop for the store to which it's delivering
}) {
  const [showProducts, setShowProducts] = useState(false);
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
            <p className="text-sm  text-richblue-500">
              Order Placed On: {orderDate}
            </p>
          </div>
          <div className="flex flex-col gap-y-1">
            <p className="text-[15px] font-semibold text-richblue-500">
              DC: {dcLocation} 
            </p>
            <p className="text-[15px]  font-semibold text-richblue-500">
              Delivering to: {storeName} {/* Display the store name */}
            </p>
            <button
              className={`px-4 py-[7px] rounded-md bg-blu 
               text-white font-semibold`}
              onClick={
                () =>
                  setConfirmationModal({
                    text1: "Driver is at the gray point shown",
                    btn2Handler: () => setConfirmationModal(null),
                  })
              }
            >
                Live Update 
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
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} mapImage={img} />}
    </div>
  );
}

export default DeliveryCardAdmin;
