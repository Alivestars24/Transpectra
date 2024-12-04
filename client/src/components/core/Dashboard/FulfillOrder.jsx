import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RiDeleteBin6Line } from "react-icons/ri";

function FulfillOrder() {
    const navigate = useNavigate();
    const location = useLocation();

    // Extract products from the orders array
    const orders = location.state?.pendingOrders || [];
    const warehouseDetails = location.state?.warehouseDetails || [];
    const uniqueId = location.state?.uniqueId || [];
    const products = orders.selectedProducts;
    console.log("Orders Id to be passed in the next round ",orders._id)
    console.log("Warehouse Details to be passed in the next round ",warehouseDetails)
    console.log("UniqueId to be passed in the next round ",uniqueId)
    // State to store quantities, unit costs, and if a product has been added to the bill
    const [orderDetails, setOrderDetails] = useState([]);
    const [formInputs, setFormInputs] = useState(
        products.reduce((acc, product) => {
            acc[product._id] = { quantity: '', unitCost: '', added: false };
            return acc;
        }, {})
    );

    // Handle input changes dynamically for each product
    const handleInputChange = (e, productId) => {
        const { name, value } = e.target;

        // Update only the specific product's input
        setFormInputs((prevInputs) => ({
            ...prevInputs,
            [productId]: {
                ...prevInputs[productId],
                [name]: value,
            },
        }));
    };

    // Add product to the order
    const addItemToOrder = (productId, product) => {
        const { quantity, unitCost } = formInputs[productId];
        if (quantity && unitCost) {
            setOrderDetails((prevDetails) => [
                ...prevDetails,
                {
                    ...product,
                    providedQuantity: quantity,
                    unitCost: unitCost,
                },
            ]);

            // Mark the product as added and retain its input values
            setFormInputs((prevInputs) => ({
                ...prevInputs,
                [productId]: { ...prevInputs[productId], added: true },
            }));
        } else {
            alert('Please enter both quantity and unit cost.');
        }
    };

    // Handle the proceed with the order button
    const proceedWithOrder = () => {
        navigate('/dashboard/order-details', { state: { orderId:orders._id,orderDetails,warehouseDetails:warehouseDetails,uniqueId:uniqueId } });
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Heading */}
            <h2 className="text-3xl font-semibold text-richblue-700 mb-6">
                Products required for Order Fulfillment
            </h2>

            {/* Product Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="bg-white border border-gray-200 shadow-lg rounded-lg p-6"
                    >
                        <div className='flex flex-row relative '>
                            <div>
                            <h3 className="text-xl font-semibold text-gray-900">
                            {product.productName}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                                <strong>Specifications:</strong> {product.specifications}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                                <strong>Required Quantity:</strong> {product.quantity}
                            </p>
                            </div>
                            <div className='absolute right-2 top-3'>
                <RiDeleteBin6Line
                    className='w-12 h-12 text-black p-2 cursor-pointer hover:text-red-500'
                    onClick={() => {
                    // Clear the product from orderDetails and reset its form inputs
                        setOrderDetails((prevDetails) =>
                        prevDetails.filter((item) => item._id !== product._id)
                        );
                    setFormInputs((prevInputs) => ({
                        ...prevInputs,
                        [product._id]: { quantity: '', unitCost: '', added: false }
                    }));
                    }}
                    />
                </div>
                        </div>

                        {/* Input fields for quantity and unit cost */}
                        <div className="mt-4">
                            <input
                                type="number"
                                name="quantity"
                                placeholder="Enter quantity"
                                value={formInputs[product._id]?.quantity || ''}
                                onChange={(e) => handleInputChange(e, product._id)}
                                disabled={formInputs[product._id]?.added} // Disable input if already added to bill
                                className={`border rounded-md p-2 w-full mb-2 focus:ring focus:ring-blue-25 outline-none ${
                                    formInputs[product._id]?.added
                                        ? 'bg-pure-greys-25'
                                        : ''
                                }`}
                            />
                            <input
                                type="number"
                                name="unitCost"
                                placeholder="Enter unit cost"
                                value={formInputs[product._id]?.unitCost || ''}
                                onChange={(e) => handleInputChange(e, product._id)}
                                disabled={formInputs[product._id]?.added} // Disable input if already added to bill
                                className={`border rounded-md p-2 w-full mb-2 focus:ring focus:ring-blue-25 outline-none ${
                                    formInputs[product._id]?.added
                                        ? 'bg-pure-greys-25'
                                        : ''
                                }`}
                            />
                            <button
                                onClick={() => addItemToOrder(product._id, product)}
                                disabled={formInputs[product._id]?.added} // Disable button if already added to bill
                                className={`py-2 px-4 rounded-md w-full transition-colors ${
                                    formInputs[product._id]?.added
                                        ? 'bg-richblue-800 text-white cursor-not-allowed'
                                        : 'bg-blu text-white hover:bg-dblue'
                                }`}
                            >
                                {formInputs[product._id]?.added
                                    ? 'Item already added to bill'
                                    : 'Add Item to Bill'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Display order summary */}
            {orderDetails.length > 0 && (
                <div className="bg-white border border-gray-200 shadow-lg rounded-lg p-6 mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Order Summary
                    </h3>
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
                                <tr
                                    key={index}
                                    className="text-gray-700 text-sm"
                                >
                                    <td className="py-2 px-2 text-center border-b">
                                        {item.productName}
                                    </td>
                                    <td className="py-2 px-2 text-center border-b">
                                        {item.providedQuantity}
                                    </td>
                                    <td className="py-2 px-2 text-center border-b">
                                        {item.unitCost}
                                    </td>
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
                    className="bg-blu text-white py-3 px-6 rounded-md hover:bg-blue-800 transition-colors w-full"
                >
                    Proceed with the Order
                </button>
            )}
        </div>
    );
}

export default FulfillOrder;
