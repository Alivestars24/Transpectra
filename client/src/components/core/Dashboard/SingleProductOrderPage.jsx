import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchManufacturers } from "../../../services/oparations/CompanyAPI";
import { useLocation } from "react-router-dom";
import { createOrder } from "../../../services/oparations/warehouseAPI";
import { useNavigate } from "react-router-dom";

const SingleProductOrderPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const warehouse = useSelector((state) => state.warehouse?.warehouse || null);
  const manufacturerList = useSelector((state) => state.manufacturers.manufacturers);
  const isLoading = useSelector((state) => state.manufacturers.isLoading);

  const product = location.state?.product || null;
  const category = location.state?.category || "Uncategorized";

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredManufacturers, setFilteredManufacturers] = useState([]);
  const [selectedManufacturer, setSelectedManufacturer] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState("");
  const [orderQuantity, setOrderQuantity] = useState(0);
  const [specifications, setSpecifications] = useState("");

  // Fetch manufacturers on component mount
  useEffect(() => {
    dispatch(fetchManufacturers());
  }, [dispatch]);

  // Filter manufacturers as the user types
  useEffect(() => {
    if (searchTerm.trim()) {
      const results = manufacturerList.filter((manufacturer) =>
        manufacturer.companyName.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setFilteredManufacturers(results);
    } else {
      setFilteredManufacturers(manufacturerList);
    }
  }, [searchTerm, manufacturerList]);

  const handleInputFocus = () => {
    setShowDropdown(true);
    setFilteredManufacturers(manufacturerList); // Show full list on focus
  };

  const handleManufacturerSelect = (manufacturer) => {
    setSelectedManufacturer(manufacturer);
    setSearchTerm(manufacturer.companyName); // Display the selected name in the input
    setShowDropdown(false); // Hide dropdown
  };

  const handleConfirmOrder = () => {
    const formData = {
      manufacturerId: selectedManufacturer?._id,
      selectedProducts: [
        {
          productName: product.productName,
          quantity: orderQuantity,
          specifications: specifications,
        },
      ],
      estimatedDeliveryDate: expectedDeliveryDate,
      warehouseId: warehouse?._id,
    };
    console.log("Order Data:", formData);
    dispatch(createOrder(formData, category, navigate));
  };

  if (!product) {
    return <div>No product selected for order.</div>;
  }

  return (
    <div className="bg-white min-h-screen px-6 text-richblue-900">
      <h1 className="text-3xl font-bold mb-1">Order for {category} Product</h1>
      <p className="text-lg mb-6">Place an order for the selected product below</p>

      <div className="grid grid-cols-1 gap-5">
        <div
          className="p-4 rounded-lg shadow-md bg-white text-black border-2 border-ddblue"
        >
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold">{product.productName}</h2>
            <span className="text-gray-600">Current Qty: {product.quantity}</span>
          </div>
          <p className="text-sm mt-2">Category: {product.category}</p>
          <div className="mt-3">
            <label htmlFor="order-quantity" className="block text-sm font-medium">
              Enter quantity to order:
            </label>
            <input
              type="number"
              id="order-quantity"
              value={orderQuantity}
              onChange={(e) => setOrderQuantity(e.target.value)}
              className="w-full mt-1 p-1 border rounded"
            />
          </div>
          <div className="mt-2">
            <label htmlFor="specifications" className="block text-sm font-medium">
              Enter specifications:
            </label>
            <input
              type="text"
              id="specifications"
              value={specifications}
              onChange={(e) => setSpecifications(e.target.value)}
              className="w-full mt-1 p-1 border rounded"
              placeholder="Enter specifications for the product"
            />
          </div>
        </div>
      </div>

      <div className="relative mt-10">
        <label className="block text-lg font-medium mb-2">Search Manufacturer:</label>
        <div className="flex">
          <input
            type="text"
            value={searchTerm}
            onFocus={handleInputFocus}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 border rounded"
            placeholder="Type to search manufacturers"
          />
          <button
            onClick={handleConfirmOrder}
            className="ml-2 px-4 py-2 w-1/4 bg-dblue text-white rounded hover:bg-blue-700"
          >
            Confirm Supplier
          </button>
        </div>
        {isLoading && <p>Loading manufacturers...</p>}
        {showDropdown && (
          <ul className="absolute bg-white border rounded shadow w-full max-h-48 overflow-y-auto z-10 mt-1">
            {filteredManufacturers.length > 0 ? (
              filteredManufacturers.map((manufacturer) => (
                <li
                  key={manufacturer._id}
                  onClick={() => handleManufacturerSelect(manufacturer)}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {manufacturer.companyName}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500">No manufacturers found</li>
            )}
          </ul>
        )}
      </div>

      {selectedManufacturer && (
        <div className="mt-4 p-4 border rounded">
          <h3 className="font-bold">{selectedManufacturer.companyName}</h3>
          <p>{selectedManufacturer.companyAddress}</p>
        </div>
      )}

      <div className="mt-6">
        <label htmlFor="order-delivery-date" className="block text-lg font-medium">
          Expected Delivery Date:
        </label>
        <input
          type="date"
          id="order-delivery-date"
          value={expectedDeliveryDate}
          onChange={(e) => setExpectedDeliveryDate(e.target.value)}
          className="w-full mt-1 p-2 border rounded"
        />
      </div>

      <div className="mt-8 text-right">
        <button
          onClick={handleConfirmOrder}
          className="px-9 py-2 bg-blu text-white text-lg font-semibold rounded hover:bg-ddblue"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default SingleProductOrderPage;
