import { useState } from "react";
import {useLocation,useNavigate} from "react-router-dom"
import { useDispatch } from "react-redux"
import { registerCompany } from "../services/oparations/authAPI";

function ManufacturerForm() {
  const location=useLocation();
  const userId = location.state?.userId;
  console.log(userId);  
 // Access the userId passed from the signup
  const navigate=useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    companyName: "",
    companyAddress: "",
    companyArea: "",
    companyDescription: "",
    companyImage: null,
    manufacturerId:userId,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: e.target.files[0] });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }
      // Call the API function to register the company
      dispatch(registerCompany(data, navigate));
    } catch (error) {
      console.error("Error registering company:", error);
    }
  };
  return (
    <div className="my-auto flex items-center justify-center min-h-screen bg-gray-100">
      <div className="shadow-lg rounded-lg bg-white w-full mt-[-40px] max-w-4xl px-8 py-4">
        <form
          onSubmit={handleOnSubmit}
          className="flex flex-col gap-6"
        >
          {/* Heading */}
          <h1 className="text-3xl font-bold text-blue-900 text-center mb-1">
            Enter Manufacturing Unit Details
          </h1>

          {/* Input Fields */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                placeholder="Enter Company Name"
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-blue-800"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                 Company Address
              </label>
              <input
                type="text"
                name="companyAddress"
                placeholder="Enter Company Address"
                value={formData.companyAddress}
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
                name="companyArea"
                placeholder="Enter Company Area"
                value={formData.companyArea}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-2 py-[11px] focus:outline-blue-800"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Upload Company Image
              </label>
              <input
                type="file"
                name="companyImage"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-blue-800"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Write About the Company
            </label>
            <textarea
              name="companyDescription"
              placeholder="Write a brief description about the manufacturing unit"
              value={formData.companyDescription}
              onChange={handleInputChange}
              rows="2"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-blue-800"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blu text-white w-full font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ManufacturerForm;
