import { useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import { registerYard } from "../services/oparations/authAPI";

function YardForm() {
  const location = useLocation();
  const userId = location.state?.userId; 
  console.log(userId)// Access the userId passed from the signup
  const dispatch=useDispatch();
  const navigate=useNavigate();
  
  const [formData, setFormData] = useState({
    warehouseCode: "",
    yardManagerId: userId || "", 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }
      dispatch(registerYard(data, navigate));
    } catch (error) {
      console.error("Error registering yard:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="shadow-lg rounded-lg bg-white w-full max-w-2xl px-8 pt-1 mt-[-100px] pb-6">
        <form
          onSubmit={handleOnSubmit}
          className="flex w-full flex-col gap-6"
        >
          {/* Heading */}
          <h1 className="text-3xl font-bold text-blue-900 text-center mb-1">
            Enter Warehouse Details of the Yard
          </h1>

          {/* Input Fields */}
          <div className="gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Warehouse ID 
              </label>
              <input
                type="text"
                name="warehouseCode"
                placeholder="Enter Warehouse Code"
                value={formData.warehouseCode}
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
