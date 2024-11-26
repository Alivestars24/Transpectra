import { useState } from "react";
import { useLocation } from "react-router-dom";

function YardForm() {
  const location = useLocation();
  const userId = location.state?.userId; // Access the userId passed from the signup

  const [formData, setFormData] = useState({
    warehouseName: "",
    warehouseAddress: "",
    userId: userId || "", // Include the userId in the initial state
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log("Yard Form Data:", formData);
    // Add logic to send `formData` to the backend
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="shadow-lg rounded-lg bg-white w-full max-w-4xl px-8 pt-1 mt-[-100px] pb-6">
        <form
          onSubmit={handleOnSubmit}
          className="flex flex-col gap-6"
        >
          {/* Heading */}
          <h1 className="text-3xl font-bold text-blue-900 text-center mb-1">
            Enter Warehouse Details of the Yard
          </h1>

          {/* Input Fields */}
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
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blu text-white w-full font-bold py-2 px-4 rounded-md hover:bg-ddblue transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default YardForm;
