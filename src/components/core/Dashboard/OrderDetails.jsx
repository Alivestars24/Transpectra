import React, { useState } from 'react';
import { HiSparkles } from 'react-icons/hi2';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';

function OrderDetails() {
    const { state } = useLocation();
    const orderDetails = state.orderDetails || [];

    // Sample warehouse and supplier details
    const warehouseDetails = {
        name: "Bharat Logistics",
        address: "Gurugram, Haryana, India",
        contact: "0124-1234567",
    };

    const supplierDetails = {
        name: "Electric Goods Supplier",
        address: "Chennai, Tamil Nadu, India",
        contact: "022-9876543",
    };

    // Sample delivery routes
    const routes = [
        {
            id: 1,
            name: "Route 1",
            steps: [
                {
                    title: "Ship to Chennai Port",
                    arrivalDate: "10th October 2024",
                    icon: "📦", // A package icon for the starting point
                },
                {
                    title: "Ship from Chennai Port to Mumbai Port",
                    arrivalDate: "13th October 2024",
                    icon: "🛳️", // Ship icon
                },
                {
                    title: "Transport by Rail from Mumbai to Delhi",
                    arrivalDate: "16th October 2024",
                    icon: "🚆", // Train icon
                },
                {
                    title: "Transport by Truck from Delhi to Warehouse (Gurgaon)",
                    arrivalDate: "20th October 2024",
                    icon: "🚚", // Truck icon for final step
                }
            ],
            time: "10 Days",
            cost: "₹15,000",
            insight1: "16% less carbon emission",
            insight2: "7% more Cost Saving",
        },
        {
            id: 2,
            name: "Route 2",
            steps: [
                {
                    title: "Ship to Chennai Airport",
                    arrivalDate: "10th October 2024",
                    icon: "📦", // Package icon for starting point
                },
                {
                    title: "Ship by Air Cargo from Chennai to Delhi",
                    arrivalDate: "10th October 2024",
                    icon: "✈️", // Plane icon for air cargo
                },
                {
                    title: "Transport by Truck from Delhi to Warehouse (Gurgaon)",
                    arrivalDate: "12th October 2024",
                    icon: "🚚", // Truck icon for final step
                }
            ],
            time: "2 Days",
            cost: "₹25,000",
            insight1: "22% more carbon emission",
            insight2: "25% more faster delivery",
        },
        {
            id: 3,
            name: "Route 3",
            steps: [
                {
                    title: "Ship to Chennai Railway Station",
                    arrivalDate: "10th October 2024",
                    icon: "📦", // Package icon for starting point
                },
                {
                    title: "Ship by Rail from Chennai to Delhi",
                    arrivalDate: "13th October 2024",
                    icon: "🚆", // Truck icon for road transport
                },
                {
                    title: "Transported by Rail from Delhi to Warehouse (Gurgaon)",
                    arrivalDate: "15th October 2024",
                    icon: "🚚", // Train icon
                }
            ],
            time: "5 Days",
            cost: "₹8,000",
            insight1: "8% less carbon emission",
            insight2: "30% more Cost Saving",
        }
    ];
    
    const generateInvoicePdf = () => {
        const doc = new jsPDF();
    
        let startY = 10; // Starting Y position
        const lineSpacing = 10;
    
        const addLine = (text, x, y) => {
            doc.text(text, x, y);
            startY += lineSpacing;
            if (startY > 290) { // Adjust page height if content overflows
                doc.addPage();
                startY = 20; // Reset Y position for the new page
            }
        };
    
        // Add the invoice header
        doc.setFontSize(14);
        doc.text("INVOICE", 105, startY, { align: "center" });
        startY += 20;
    
        // Invoice Info
        doc.setFontSize(12);
        addLine(`Invoice No: INV-${Math.floor(Math.random() * 10000)}`, 20, startY);
        addLine(`Date: ${new Date().toLocaleDateString()}`, 20, startY);
    
        doc.line(20, startY, 190, startY);
        startY += lineSpacing;
    
        // Supplier Info on the left
        doc.setFontSize(10);
        doc.text("From (Supplier):", 20, startY);
        doc.text(supplierDetails.name, 20, startY + lineSpacing);
        doc.text(supplierDetails.address, 20, startY + lineSpacing * 2);
        doc.text(`Contact: ${supplierDetails.contact}`, 20, startY + lineSpacing * 3);
    
        // Warehouse Info on the right
        doc.text("To (Warehouse):", 130, startY);
        doc.text(warehouseDetails.name, 130, startY + lineSpacing);
        doc.text(warehouseDetails.address, 130, startY + lineSpacing * 2);
        doc.text(`Contact: ${warehouseDetails.contact}`, 130, startY + lineSpacing * 3);
    
        startY += lineSpacing * 4;
        doc.line(20, startY, 190, startY);
        startY += lineSpacing;
    
        // Route Details
        doc.setFontSize(12);
        addLine("Route Details:", 20, startY);
        doc.setFontSize(10);
        if (selectedRoute) {
            addLine(`Route Name: ${routes.find(route => route.id === selectedRoute).name}`, 20, startY);
            routes.find(route => route.id === selectedRoute).steps.forEach((step, index) => {
                addLine(`${index + 1}. ${step.title} (Arrival: ${step.arrivalDate})`, 20, startY);
            });
        }
    
        doc.line(20, startY, 190, startY);
        startY += lineSpacing;
    
        // Itemized List of Goods
        doc.setFontSize(12);
        doc.text("Itemized List of Goods:", 20, startY);
    
        // Table Header
        doc.setFontSize(10);
        startY += lineSpacing;
        doc.text("Item", 20, startY);
        doc.text("Quantity", 70, startY);
        doc.text("Unit Price", 100, startY);
        doc.text("Total Price", 150, startY);
    
        orderDetails.forEach((item) => {
            startY += lineSpacing;
            doc.text(item.name, 20, startY);
            doc.text(`${item.providedQuantity}`, 70, startY);
            doc.text(`${item.unitCost.toLocaleString()}`, 100, startY);
            doc.text(`${(item.providedQuantity * item.unitCost).toLocaleString()}`, 150, startY);
    
            if (startY > 260) {  // Handle overflow for the item list
                doc.addPage();
                startY = 20;  // Reset Y position for the new page
                doc.text("Item", 20, startY); // Redraw table headers
                doc.text("Quantity", 70, startY);
                doc.text("Unit Price", 100, startY);
                doc.text("Total Price", 150, startY);
            }
        });
    
        // Calculate Total Cost
        const subtotal = orderDetails.reduce((acc, item) => acc + item.providedQuantity * item.unitCost, 0);
        const gst = subtotal * 0.18;
        const shippingCost = 15000;
        const totalPayable = subtotal + gst + shippingCost;
    
        startY += lineSpacing;
        doc.line(20, startY, 190, startY);
        startY += lineSpacing;
    
        doc.setFontSize(12);
        doc.text("Total Summary:", 20, startY);
        doc.setFontSize(10);
    
        startY += lineSpacing;
        doc.text("Description", 20, startY);
        doc.text("Amount", 150, startY);
        
        doc.text("Subtotal", 20, startY + lineSpacing);
        doc.text(`${subtotal.toLocaleString()}`, 150, startY + lineSpacing);
        
        doc.text("GST (18%)", 20, startY + lineSpacing * 2);
        doc.text(`${gst.toLocaleString()}`, 150, startY + lineSpacing * 2);
        
        doc.text("Shipping Cost", 20, startY + lineSpacing * 3);
        doc.text(`${shippingCost.toLocaleString()}`, 150, startY + lineSpacing * 3);
        
        doc.text("Total Payable Amount", 20, startY + lineSpacing * 4);
        doc.text(`${totalPayable.toLocaleString()}`, 150, startY + lineSpacing * 4);
    
        startY += lineSpacing * 12;
    
        // Manual Page Break
        doc.addPage();
        startY = 10;  // Reset Y position after manual page break
    
        // Payment Terms
        startY += lineSpacing;
        doc.setFontSize(12);
        doc.text("Payment Terms", 20, startY);
        doc.setFontSize(10);
        doc.text("Due Date: 2024-11-05", 20, startY + lineSpacing);
        doc.text("Payment Method: Bank Transfer", 20, startY + lineSpacing * 2);
        
        doc.text("Bank Details:", 20, startY + lineSpacing * 3);
        doc.text("Bank Name: HDFC Bank", 20, startY + lineSpacing * 4);
        doc.text("Account Number: 1234567890", 20, startY + lineSpacing * 5);
        doc.text("IFSC Code: HDFC0001234", 20, startY + lineSpacing * 6);
        startY += lineSpacing*7;
        doc.line(20, startY, 190, startY);
    
        // Terms and Conditions
        startY += lineSpacing;
        doc.setFontSize(12);
        doc.text("Terms and Conditions", 20, startY);
        doc.setFontSize(10);
        doc.text("1. Goods once sold will not be taken back.", 20, startY + lineSpacing);
        doc.text("2. Any claims regarding the shipment should be made within 5 business days.", 20, startY + lineSpacing * 2);
        doc.text("3. Please quote the Invoice Number in all future correspondence.", 20, startY + lineSpacing * 3);
        startY += lineSpacing*4;
        doc.line(20, startY, 190, startY);
        startY += lineSpacing;
        doc.text("Authorized Signatory (Saksham Pvt Ltd.):", 20, startY);
        doc.text("John Smith", 20, startY + lineSpacing);
        doc.text("(Manager, Sales)", 20, startY + lineSpacing * 2);
        startY += lineSpacing*4;
        const pdfDataUri = doc.output('dataurlstring');
        const newWindow = window.open();
        newWindow.document.write(`<iframe width='100%' height='100%' src='${pdfDataUri}'></iframe>`);
        
        doc.save('invoice.pdf');
    };
      
    
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [confirmed, setConfirmed] = useState(false);

    const handleRouteSelect = (routeId) => {
        setSelectedRoute(routeId);
    };

    const handleConfirmOrder = () => {
        if (selectedRoute) {
            setConfirmed(true);
            //generateInvoicePdf();
        } else {
            alert("Please select a route before confirming the order.");
        }
    };

    const totalQuantity = orderDetails.reduce((total, item) => total + Number(item.providedQuantity), 0);
    const totalBill = orderDetails.reduce((total, item) => total + Number(item.providedQuantity) * Number(item.unitCost), 0);

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Heading */}
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Order Details</h2>

            {/* Order ID and total quantity */}
            <div className="mb-4 flex justify-between">
                <p><strong>Order ID:</strong> #ORD123456</p>
                <p><strong>Total Quantity:</strong> {totalQuantity} items</p>
            </div>

            <hr className="mb-6" />

            {/* Warehouse and Supplier Details */}
            <div className="flex justify-between mb-6">
                {/* Warehouse Details */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-800">To (Warehouse):</h3>
                    <p><strong>Name:</strong> {warehouseDetails.name}</p>
                    <p><strong>Address:</strong> {warehouseDetails.address}</p>
                    <p><strong>Contact:</strong> {warehouseDetails.contact}</p>
                </div>
                {/* Supplier Details */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-800">From (Supplier):</h3>
                    <p><strong>Name:</strong> {supplierDetails.name}</p>
                    <p><strong>Address:</strong> {supplierDetails.address}</p>
                    <p><strong>Contact:</strong> {supplierDetails.contact}</p>
                </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white border border-gray-200 shadow-lg rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h3>
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 text-xs font-medium">
                            <th className="py-2 px-1 border-b-2">Product</th>
                            <th className="py-2 px-1 border-b-2">Quantity</th>
                            <th className="py-2 px-1 border-b-2">Unit Cost</th>
                            <th className="py-2 px-1 border-b-2">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderDetails.map((item, index) => (
                            <tr key={index} className="text-gray-700 text-sm">
                                <td className="py-2 px-2 border-b">{item.name}</td>
                                <td className="py-2 px-2 border-b">{item.providedQuantity}</td>
                                <td className="py-2 px-2 border-b">₹{item.unitCost}</td>
                                <td className="py-2 px-2 border-b">₹{item.providedQuantity * item.unitCost}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p className="text-right mt-4 text-lg"><strong>Total Bill:</strong> ₹{totalBill}</p>
            </div>

            {/* Route Selection */}
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Select a Route to Transport the Order</h3>
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-2 mb-8">
    {routes.map(route => (
        <div
            key={route.id}
            className={` border relative rounded-lg shadow-lg p-6 cursor-pointer ${
                selectedRoute === route.id ? "bg-blue-5" : "bg-white"
            }`} // Highlight the selected route
            onClick={() => handleRouteSelect(route.id)}
        >
            <h4 className={`text-lg font-semibold ${
                selectedRoute === route.id ? "text-blue-900" : "text-gray-800"
            } mb-2`}>{route.name}</h4>

            <ul className="mb-4 min-h-[340px]">
                {route.steps.map((step, idx) => (
                    <li key={idx} className="flex items-start mb-4">
                        <span className={`text-2xl mr-3 ${
                            selectedRoute === route.id ? "text-blue-900" : "text-gray-900"
                        }`}>{step.icon}</span>
                        <div>
                            <h5 className={`font-semibold ${
                                selectedRoute === route.id ? "text-blue-900" : "text-gray-900"
                            }`}>{step.title}</h5>
                            <small className={`${
                                selectedRoute === route.id ? "text-blue-900" : "text-gray-500"
                            }`}>Arrival: {step.arrivalDate}</small>
                        </div>
                    </li>
                ))}
            </ul>
            <div>
            <p className={`${
                selectedRoute === route.id ? "text-blue-900" : "text-gray-800"
            }`}><strong>Time:</strong> {route.time}</p>
            <p className={`${
                selectedRoute === route.id ? "text-blue-900" : "text-gray-800"
            }`}><strong>Cost:</strong> {route.cost}</p>

            {/* Insights */}
            <div className={`text-sm mt-4 p-2 rounded-lg  ${
                selectedRoute === route.id ? "bg-caribbeangreen-100 text-blue-900" : "bg-caribbeangreen-100"
            } flex items-center`}>
                <HiSparkles className={`${selectedRoute === route.id ? "text-richblue-800": "text-white"}`}/>
                <p className='font-semibold ml-2'>{route.insight1}</p>
            </div>
            <div className={`text-sm mt-4 p-2 rounded-lg  ${
                selectedRoute === route.id ? "bg-yellow-5 text-blue-900" : "bg-yellow-5"
            } flex items-center`}>
                <HiSparkles className={`${selectedRoute === route.id ? "text-richblue-800": "text-richblue-800"}`}/>
                <p className='font-semibold ml-2'>{route.insight2}</p>
            </div>
            </div>
        </div>
    ))}
</div>


            {/* Confirm Button */}
            <div className="flex justify-end">
                <button
                    onClick={handleConfirmOrder}
                    className="bg-blu w-60 text-white py-2 px-6 rounded-lg hover:bg-blue-800"
                    disabled={!selectedRoute}
                >
                    Confirm the Order
                </button>
            </div>

            {/* Generate Invoice Button */}
            {/* Generate Invoice Button */}
    {confirmed && (
    <div className="flex justify-end mt-4">
        <button
            onClick={generateInvoicePdf}
            className="bg-blu text-white py-2 w-60 px-6 rounded-lg hover:bg-blue-800"
        >
            View Invoice of the Order
        </button>
    </div>
)}

        </div>
    );
}

export default OrderDetails;
