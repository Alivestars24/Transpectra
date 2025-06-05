import { useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import {registerWarehouse} from "../services/oparations/authAPI"

function WarehouseForm() {
  const location = useLocation();
  const navigate=useNavigate();
  const dispatch = useDispatch()
  const userId = location.state?.userId; // Access the userId passed from the signup
  const [formData, setFormData] = useState({
    warehouseName: "",
    warehouseAddress: "",
    warehouseArea: "",
    warehouseDescription: "",
    warehouseImage: null,
    inventoryExcel: null,
    managerId:userId,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: e.target.files[0] });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }
      // Call the API function to register the warehouse
      dispatch(registerWarehouse(data, navigate));
    } catch (error) {
      console.error("Error registering warehouse:", error);
    }
  };

  return (
    <div className="relative flex items-center justify-center  min-h-screen pt-1 py-4">
      {/* Scrollable Box */}
      <div className="shadow-lg rounded-lg bg-white w-full mt-[-20px] max-w-4xl overflow-hidden">
        {/* Scrollable Content */}
        <form
          onSubmit={handleOnSubmit}
          className="flex flex-col gap-6 overflow-y-auto max-h-[80vh] px-8 py-2 hide-scrollbar"
        >
          {/* Heading */}
          <h1 className="text-3xl font-bold text-blue-900  text-center">
            Enter Warehouse Details
          </h1>

          {/* Left Section */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Warehouse Name
              </label>
              <input
                type="text"
                name="warehouseName"
                placeholder="Enter Warehouse Name"
                value={formData.warehouseName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-blue-800"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Warehouse Address
              </label>
              <input
                type="text"
                name="warehouseAddress"
                placeholder="Enter Warehouse Address"
                value={formData.warehouseAddress}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-blue-800"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Area (in sqft)
              </label>
              <input
                type="number"
                name="warehouseArea"
                placeholder="Enter Warehouse Area"
                value={formData.warehouseArea}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-2 py-[11px] focus:outline-blue-800"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Upload Warehouse Image
              </label>
              <input
                type="file"
                name="warehouseImage"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-blue-800"
                required
              />
            </div>
          </div>

          {/* Right Section */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Write About the Warehouse
            </label>
            <textarea
              name="warehouseDescription"
              placeholder="Write a brief description about the warehouse"
              value={formData.warehouseDescription}
              onChange={handleInputChange}
              rows="4"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-blue-800"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Upload Inventory Excel Sheet
            </label>
            <input
              type="file"
              name="inventoryExcel"
              accept=".xlsx, .xls, .csv"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-blue-800"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blu text-white w-full font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition self-center"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default WarehouseForm;
