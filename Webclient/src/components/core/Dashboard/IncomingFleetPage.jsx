import React, { useState } from 'react';
import { addFleetToYard } from '../../../services/oparations/YardAPI';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const IncomingFleetPage = () => {
  const dispatch=useDispatch();
  const user = useSelector((state) => state.profile?.user || null);
  const [formData, setFormData] = useState({
    vehicleLicensePlate: '',
    driverName: '',
    dateOfArrival: '',
    purpose: 'loading',
    orderId: '',
    allocatedDock: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user?._id) {
      alert("User not authenticated.");
      return;
    }

    const payload = {
      ...formData,
      yardManagerId: user._id, 
    };

    console.log("Submitting Truck Details with payload:", payload);

    dispatch(addFleetToYard(payload));

    setFormData({
      vehicleLicensePlate: '',
      driverName: '',
      dateOfArrival: '',
      purpose: 'loading',
      orderId: '',
      allocatedDock: '',
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-blue-900">Register the entry of Incoming Fleet </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 mt-4 space-y-4"
      >
        {/* Driver Name, License Plate, and Incoming Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-700">Driver's Name *</label>
            <input
              type="text"
              name="driverName"
              placeholder="Driver's Name"
              value={formData.driverName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">
              License Plate Number *
            </label>
            <input
              type="text"
              name="vehicleLicensePlate"
              placeholder="License Plate Number"
              value={formData.vehicleLicensePlate}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Incoming Date & Time *</label>
            <input
              type="datetime-local"
              name="dateOfArrival"
              value={formData.dateOfArrival}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700">Purpose *</label>
            <select
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
            >
              <option value="loading">Loading</option>
              <option value="unloading">Unloading</option>
            </select>
          </div>
        </div>

        {/* Dock and Order ID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-700">Allocated Dock *</label>
            <input
              type="text"
              name="allocatedDock"
              value={formData.allocatedDock}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
              placeholder="Dock Number Assigned"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Order ID</label>
            <input
              type="text"
              name="orderId"
              value={formData.orderId}
              onChange={handleChange}
              placeholder="Order ID "
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blu text-white px-12 py-2 rounded-lg hover:bg-blue-900"
        >
          Create an Entry 
        </button>
      </form>
    </div>
  );
};

export default IncomingFleetPage;
