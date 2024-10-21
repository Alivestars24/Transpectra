import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FulfillOrder() {
    const navigate = useNavigate();

    // Sample product data for "Bharat Logistics, Gurugram"
    const products = [
        {
            id: "P001",
            name: "Electric Wire",
            brand: "PowerFlex",
            specifications: "Copper, 100 meters",
            requiredQuantity: 50,
        },
        {
            id: "P002",
            name: "Switchboard",
            brand: "ElectroTech",
            specifications: "6 Switch, Modular",
            requiredQuantity: 30,
        },
        {
            id: "P003",
            name: "LED Bulb",
            brand: "BrightLite",
            specifications: "10W, Pack of 4",
            requiredQuantity: 100,
        },
    ];

    // State to store quantities, unit costs, and if a product has been added to the bill
    const [orderDetails, setOrderDetails] = useState([]);
    const [formInputs, setFormInputs] = useState(
        products.reduce((acc, product) => {
            acc[product.id] = { quantity: '', unitCost: '', added: false };
            return acc;
        }, {})
    );

    // Handle input changes dynamically for each product
    const handleInputChange = (e, productId) => {
        const { name, value } = e.target;
        setFormInputs(prevInputs => ({
            ...prevInputs,
            [productId]: { ...prevInputs[productId], [name]: value }
        }));
    };

    // Add product to the order
    const addItemToOrder = (productId, product) => {
        const { quantity, unitCost } = formInputs[productId];
        if (quantity && unitCost) {
            setOrderDetails(prevDetails => [
                ...prevDetails,
                {
                    ...product,
                    providedQuantity: quantity,
                    unitCost: unitCost
                }
            ]);

            // Mark the product as added and retain its input values
            setFormInputs(prevInputs => ({
                ...prevInputs,
                [productId]: { ...prevInputs[productId], added: true }
            }));
        } else {
            alert("Please enter both quantity and unit cost.");
        }
    };

    // Handle the proceed with the order button
    const proceedWithOrder = () => {
        navigate('/dashboard/order-details', { state: { orderDetails } });
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Heading */}
            <h2 className="text-3xl font-semibold text-richblue-700 mb-6">
                Products required by Bharat Logistics, Gurugram
            </h2>

            {/* Product Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {products.map(product => (
                    <div key={product.id} className="bg-white border border-gray-200 shadow-lg rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-600 mt-1"><strong>Brand:</strong> {product.brand}</p>
                        <p className="text-sm text-gray-600 mt-1"><strong>Specifications:</strong> {product.specifications}</p>
                        <p className="text-sm text-gray-600 mt-1"><strong>Required Quantity:</strong> {product.requiredQuantity}</p>
                        
                        {/* Input fields for quantity and unit cost */}
                        <div className="mt-4">
                            <input
                                type="number"
                                name="quantity"
                                placeholder="Enter quantity"
                                value={formInputs[product.id].quantity}
                                onChange={(e) => handleInputChange(e, product.id)}
                                disabled={formInputs[product.id].added} // Disable input if already added to bill
                                className={`border rounded-md p-2 w-full mb-2 focus:ring focus:ring-blue-300 outline-none ${
                                    formInputs[product.id].added ? "bg-gray-200" : ""
                                }`}
                            />
                            <input
                                type="number"
                                name="unitCost"
                                placeholder="Enter unit cost"
                                value={formInputs[product.id].unitCost}
                                onChange={(e) => handleInputChange(e, product.id)}
                                disabled={formInputs[product.id].added} // Disable input if already added to bill
                                className={`border rounded-md p-2 w-full mb-2 focus:ring focus:ring-blue-300 outline-none ${
                                    formInputs[product.id].added ? "bg-gray-200" : ""
                                }`}
                            />
                            <button
                                onClick={() => addItemToOrder(product.id, product)}
                                disabled={formInputs[product.id].added} // Disable button if already added to bill
                                className={`py-2 px-4 rounded-md w-full transition-colors ${
                                    formInputs[product.id].added
                                        ? "bg-pure-greys-600 text-white cursor-not-allowed"
                                        : "bg-blu text-white hover:bg-green-700"
                                }`}
                            >
                                {formInputs[product.id].added ? "Item already added to bill" : "Add Item to Bill"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Display order summary */}
            {orderDetails.length > 0 && (
                <div className="bg-white border border-gray-200 shadow-lg rounded-lg p-6 mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h3>
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 text-xs font-medium">
                                <th className="py-2 px-1 border-b-2">Product</th>
                                <th className="py-2 px-1 border-b-2">Quantity</th>
                                <th className="py-2 px-1 border-b-2">Unit Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderDetails.map((item, index) => (
                                <tr key={index} className="text-gray-700 text-sm">
                                    <td className="py-2 px-2 border-b">{item.name}</td>
                                    <td className="py-2 px-2 border-b">{item.providedQuantity}</td>
                                    <td className="py-2 px-2 border-b">{item.unitCost}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Proceed with Order Button */}
            {orderDetails.length > 0 && (
                <button
                    onClick={proceedWithOrder}
                    className="bg-ddblue text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors w-full"
                >
                    Proceed with the Order
                </button>
            )}
        </div>
    );
}

export default FulfillOrder;
