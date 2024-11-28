import React, { useState } from "react";

const ProductSelectionPage = () => {
  // Dummy data for products
  const initialProducts = [
    { id: 1, name: "Smartphone", predictedQuantity: 50, specifications: "", isSelected: false },
    { id: 2, name: "Laptop", predictedQuantity: 30, specifications: "", isSelected: false },
    { id: 3, name: "Tablet", predictedQuantity: 20, specifications: "", isSelected: false },
  ];

  // State for products and supplier name
  const [products, setProducts] = useState(initialProducts);
  const [supplierName, setSupplierName] = useState("Kumar Sons Pvt Ltd");

  // Handle product selection
  const toggleProductSelection = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, isSelected: !product.isSelected } : product
      )
    );
  };

  // Handle specification change
  const handleSpecificationChange = (id, value) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, specifications: value } : product
      )
    );
  };

  // Handle confirm order
  const handleConfirmOrder = () => {
    const selectedProducts = products.filter((product) => product.isSelected);
    const orderData = {
      supplierName,
      products: selectedProducts,
    };
    console.log("Order Data:", orderData);
  };

  return (
    <div className="bg-white min-h-screen px-6 text-richblue-900">
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-2">Electronics Product Selection</h1>
      <p className="text-lg mb-6">Select all the products below for the order</p>

      {/* Product Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className={`p-4 rounded-lg shadow-md bg-white text-black border-2 ${
              product.isSelected ? "border-ddblue" : "border-transparent"
            }`}
          >
            {/* Product Name and Predicted Quantity */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <span className="text-gray-600">Qty: {product.predictedQuantity}</span>
            </div>

            {/* Specifications Input */}
            <div className="mt-4">
              <label htmlFor={`spec-${product.id}`} className="block text-sm font-medium">
                State the specifications:
              </label>
              <input
                type="text"
                id={`spec-${product.id}`}
                value={product.specifications}
                onChange={(e) => handleSpecificationChange(product.id, e.target.value)}
                className="w-full mt-1 p-2 border rounded"
                placeholder="Enter specifications"
              />
            </div>

            {/* Selection Toggle */}
            <button
              className="mt-4 w-full py-2 text-center rounded bg-blu text-white hover:bg-blue-800"
              onClick={() => toggleProductSelection(product.id)}
            >
              {product.isSelected ? "Deselect Product" : "Select Product"}
            </button>
          </div>
        ))}
      </div>

      {/* Supplier Name Input */}
      <div className="mt-8">
        <label className="block text-lg font-medium mb-2">Supplier Name:</label>
        <div className="flex items-center">
          <input
            type="text"
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
            className="flex-1 p-2 border rounded text-black"
          />
          <button
            onClick={() => alert("Supplier name saved!")}
            className="ml-4 py-2 px-4 bg-ddblue text-white rounded hover:bg-green-800"
          >
            Change Supplier Name
          </button>
        </div>
      </div>

      {/* Confirm Order Button */}
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

export default ProductSelectionPage;
