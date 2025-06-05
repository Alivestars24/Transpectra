import React, { useState } from 'react';
import { HiSparkles } from 'react-icons/hi2';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import { useSelector , useDispatch} from 'react-redux';
import { CreateDeliveryforOrder } from '../../../services/oparations/CompanyAPI';

function OrderDetails() {
    const dispatch = useDispatch();
    const { state } = useLocation();
    const orderDetails = state.orderDetails || [];
    const orderId = state.orderId || [];
    const uniqueId = state.uniqueId || "";
    console.log("Received Products for order are:",orderDetails);
    console.log("Order Id received : ",orderId)
    const warehouseDetails=state.warehouseDetails || [];
    const company = useSelector((state) => state.company?.company || null);
    console.log("received warehouseDetails:",warehouseDetails)
    console.log("Company Details are :", company)
    // Sample delivery routes
    const deliveryRoutes = [
        {
          routeId: "route1",
          steps: [
            {
                step: 1,
                from: "Nanded",
                to: "Ahemdabad",
                by: "air",
                distance: 651,
                expectedTime: "1 hour",
                cost: 4499,
                arrivalDate: "2024-17-12",
            },
            {
                step: 2,
                from: "Ahemdabad",
                to: "Surat",
                by: "rail",
                distance: 228,
                expectedTime: "2 hours",
                cost: 650,
                arrivalDate: "2024-18-12",
            },
          ],
          totalCarbonEmission: 112,
          totalTimeTaken: "3 hours",
          expectedDelivery: "2024-18-12",
          totalCost: 5299,
        },
        {
          routeId: "route2",
          steps: [
            {
                step: 1,
                from: "Nanded",
                to: "Pune",
                by: "rail",
                distance: 450,
                expectedTime: "13 hours",
                cost: 300,
                arrivalDate: "2024-18-12",
            },
            {
                step: 2,
                from: "Pune",
                to: "Surat",
                by: "road",
                distance: 280,
                expectedTime: "4 hours",
                cost: 590,
                arrivalDate: "2024-19-12",
            },
          ],
          totalCarbonEmission: 65,
          totalTimeTaken: "17 hours",
          expectedDelivery: "2024-19-12",
          totalCost: 730,
        },
        {
          routeId: "route3",
          steps: [
            {
                step: 1,
                from: "Nanded",
                to: "Mumbai",
                by: "rail",
                distance: 610,
                expectedTime: "13  hours",
                cost: 300,
                arrivalDate: "2024-18-12",
            },
            {
                step: 2,
                from: "Mumbai",
                to: "Surat",
                by: "sea",
                distance: 275,
                expectedTime: "5 hours",
                cost: 420,
                arrivalDate: "2024-19-12",
            },
          ],
          totalCarbonEmission: 78,
          totalTimeTaken: "18 hours",
          expectedDelivery: "2024-19-12",
          totalCost: 720,
        },
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
        startY += 10;
    
        // Invoice Info
        doc.setFontSize(12);
        doc.text(`Invoice No: INV-${Math.floor(Math.random() * 10000)}`, 20, startY);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, startY);
        startY += lineSpacing;
        doc.line(20, startY, 190, startY);
        startY += lineSpacing;
    
        // Supplier Info on the left
        doc.setFontSize(10);
        doc.text("From (Supplier):", 20, startY);
        doc.text(company.companyName, 20, startY + lineSpacing);
        doc.text(company.companyAddress, 20, startY + lineSpacing * 2);
    
        // Warehouse Info on the right
        doc.text("To (Warehouse):", 110, startY);
        doc.text(warehouseDetails.warehouseName, 110, startY + lineSpacing);
        doc.text(warehouseDetails.warehouseAddress, 110, startY + lineSpacing * 2);
    
        startY += lineSpacing * 3;
        doc.line(20, startY, 190, startY);
        startY += lineSpacing;
    
        // Route Details
        doc.setFontSize(12);
        addLine("Route Details:", 20, startY);
        doc.setFontSize(10);
        if (selectedRoute) {
            // Get the selected route
            const selectedRouteData = deliveryRoutes.find(route => route.routeId === selectedRoute.routeId);
        
            if (selectedRouteData) {
                // Add the Route Summary
                doc.text(`Expected Delivery Date: ${selectedRouteData.expectedDelivery}`, 20, startY);
                doc.text(`Total Time Taken: ${selectedRouteData.totalTimeTaken}`, 120, startY );
                doc.text(`Total Cost: ${selectedRouteData.totalCost} INR`, 20, startY + 10);
                doc.text(`Carbon Emission: ${selectedRouteData.totalCarbonEmission} kg`, 120, startY + 10);
        
                // Iterate through the steps and add concise details
                selectedRouteData.steps.forEach((step, index) => {
                    const stepY = startY + 20 + (index * 1); // Adjust vertical spacing for each step
                    addLine(
                        `${index + 1}. ${step.from} --> ${step.to} (${step.by}, ${step.distance} km)`,
                        20,
                        stepY
                    );
                });
            }
        } 
        startY += lineSpacing*3;       
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
            doc.text(item.productName, 20, startY);
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
        doc.text(`Authorized Signatory: `, 20, startY);
        doc.text("Manager, Sales", 20, startY + lineSpacing );
        doc.text(company.companyName, 20, startY + lineSpacing*2);
        startY += lineSpacing*4;
        const pdfDataUri = doc.output('dataurlstring');
        const newWindow = window.open();
        newWindow.document.write(`<iframe width='100%' height='100%' src='${pdfDataUri}'></iframe>`);
        
        doc.save('invoice.pdf');
    };
      
    
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [confirmed, setConfirmed] = useState(false);
    const handleRouteSelect = (routeId) => {
        const selected = deliveryRoutes.find(route => route.routeId === routeId); // Find the full route object by routeId
        setSelectedRoute(selected); // Store the entire route object
    };
    const validByModes = ["rail", "road", "air", "sea"];

    // Utility function to validate a single step
    const validateStep = (step) => {
      const isValid =
        typeof step.step === "number" &&
        typeof step.from === "string" &&
        typeof step.to === "string" &&
        validByModes.includes(step.by) &&
        typeof step.distance === "number" &&
        typeof step.expectedTime === "string" &&
        typeof step.cost === "number";
    
      if (!isValid) {
        console.error("Invalid Step:", step); // Log the problematic step
      }
    
      return isValid;
    };

    const handleConfirmOrder = () => {
        if (selectedRoute) {
            setConfirmed(true);
            console.log("Route selected is displayed as ",selectedRoute)
            // Create JSON object
            const data = {
                orderId,
                uniqueOrderId: uniqueId,
                ManufactureId: company?._id || "",
                warehouseId: warehouseDetails?._id || "",
                selectedProducts: orderDetails.map(product => ({
                    productName: product.productName,
                    quantity: Number(product.providedQuantity), 
                    unitCost: Number(product.unitCost),
                    specifications:product.specifications,
                    _id:product._id,
                })),
                estimatedDeliveryTime: "2024-12-05T15:30:00Z", // Replace with dynamic data if needed
                deliveryRoutes :
    selectedRoute && selectedRoute.steps && selectedRoute.steps.length >= 1
        ?  [
            {
              step: 0,
              from: "Supplier",
              to: `${String(selectedRoute.steps[0]?.from || "")} ${
                selectedRoute.steps[0]?.by === "sea"
                  ? "Port"
                  : selectedRoute.steps[0]?.by === "rail"
                  ? "Station"
                  : selectedRoute.steps[0]?.by === "air"
                  ? "Airport"
                  : "Truck Depot"
              }`,
              by: "road",
              distance: 0,
              expectedTime: "N/A",
              cost: 0,
            },
            ...selectedRoute.steps.map((step, index) => ({
              step: Number(index + 1), // Ensure step is a number
              from: String(step.from), // Coerce to string
              to: String(step.to), // Coerce to string
              by: validByModes.includes(step.by) ? step.by : "road", // Validate mode
              distance: Number(step.distance), // Coerce to number
              expectedTime: String(step.expectedTime), // Coerce to string
              cost: Number(step.cost), // Coerce to number
            })).filter(validateStep), // Only include valid steps
          ]
        : [] };
    
            console.log("Combined JSON object:", data);
           
            // Prepare form-data for the backend
            const formData = new FormData();
            formData.append("orderId", data.orderId);
            formData.append("uniqueOrderId", data.uniqueOrderId);
            formData.append("ManufactureId", data.ManufactureId);
            formData.append("warehouseId", data.warehouseId);
            formData.append("selectedProducts", JSON.stringify(data.selectedProducts));
            formData.append("estimatedDeliveryTime", data.estimatedDeliveryTime);
            formData.append("deliveryRoutes", JSON.stringify(data.deliveryRoutes));
            // Append a dummy file as invoice (replace with dynamic file)
            const dummyFile = new File(["dummy content"], "dummyInvoice.pdf", { type: "application/pdf" });
            formData.append("invoicePdf", dummyFile);
    
            console.log("FormData ready for backend:");
    
            // Debugging the FormData (prints only key-value pairs)
            for (const pair of formData.entries()) {
                console.log(pair[0], pair[1]);
            }
            dispatch(CreateDeliveryforOrder(formData));
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
                <p><strong>Order ID:</strong>{uniqueId}</p>
                <p><strong>Total Quantity:</strong> {totalQuantity} items</p>
            </div>

            <hr className="mb-6" />

            {/* Warehouse and Supplier Details */}
            <div className="flex justify-between mb-6">
                {/* Warehouse Details */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-800">To (Warehouse):</h3>
                    <p><strong>Name:</strong> {warehouseDetails.warehouseName}</p>
                    <p><strong>Address:</strong> {warehouseDetails.warehouseAddress}</p>
                </div>
                {/* Supplier Details */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-800">From (Manufacturing Unit):</h3>
                    <p><strong>Name:</strong> {company.companyName}</p>
                    <p><strong>Address:</strong> {company.companyAddress}</p>
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
                                <td className="py-2 px-2 text-center border-b">{item.productName}</td>
                                <td className="py-2 px-2 text-center border-b">{item.providedQuantity}</td>
                                <td className="py-2 px-2 text-center border-b">₹{item.unitCost}</td>
                                <td className="py-2 px-2 text-center border-b">₹{item.providedQuantity * item.unitCost}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p className="text-right mt-4 text-lg"><strong>Total Bill:</strong> ₹{totalBill}</p>
            </div>

            {/* Route Selection */}
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                 Select a Route to Transport the Order
            </h3>
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-2 mb-8">
        {deliveryRoutes && deliveryRoutes.map(route => (
        <div
            key={route.routeId}
            className={`border relative rounded-lg shadow-lg p-6 cursor-pointer ${
                (selectedRoute?.routeId || null) === route.routeId ? "bg-blue-5" : "bg-white"
            }`}
            onClick={() => handleRouteSelect(route.routeId)}
        >
            <h4
                className={`text-lg font-semibold ${
                    selectedRoute?.routeId === route.routeId ? "text-blue-900" : "text-gray-800"
                } mb-2`}
            >
                {route.routeId?.toUpperCase()}
            </h4>

            <ul className="mb-4 min-h-[240px]">
                <li className="flex items-start mb-4">
                    <span
                        className={`text-2xl mr-3 ${
                            selectedRoute?.routeId === route.routeId
                                ? "text-blue-900"
                                : "text-gray-900"
                        }`}
                    >
                        📦
                    </span>
                    <div>
                        <h5
                            className={`font-semibold ${
                                selectedRoute?.routeId === route.routeId
                                    ? "text-blue-900"
                                    : "text-gray-900"
                            }`}
                        >
                            Ship to {route.steps[0]?.from || "Unknown"} {route.steps[0]?.by === 'sea' ? 'Port' : route.steps[0]?.by === 'rail' ? 'Station' : route.steps[0]?.by === 'air' ? 'Airport' : 'Truck Depo'}
                        </h5>
                    </div>
                </li>

                {route.steps.map((step, idx) => {
                    const modeIcons = {
                        road: "🚚", 
                        rail: "🚆", 
                        air: "✈️", 
                        sea: "🚢", 
                        package: "📦" 
                    };

                    const icon = modeIcons[step.by] || "📍";

                    return (
                        <li key={idx} className="flex items-start mb-4">
                            <span
                                className={`text-2xl mr-3 ${
                                    selectedRoute?.routeId === route.routeId
                                        ? "text-blue-900"
                                        : "text-gray-900"
                                }`}
                            >
                                {icon}
                            </span>
                            <div>
                                <h5
                                    className={`font-semibold ${
                                        selectedRoute?.routeId === route.routeId
                                            ? "text-blue-900"
                                            : "text-gray-900"
                                    }`}
                                >
                                    {step.from} → {step.to}
                                </h5>
                                <small
                                    className={`${
                                        selectedRoute?.routeId === route.routeId
                                            ? "text-blue-900"
                                            : "text-gray-500"
                                    }`}
                                >
                                    {step.by.toUpperCase()} | Distance: {step.distance} km
                                </small>
                            </div>
                        </li>
                    );
                })}
            </ul>

            <div>
                <p
                    className={`${
                        selectedRoute?.routeId === route.routeId
                            ? "text-blue-900"
                            : "text-gray-800"
                    }`}
                >
                    <strong>Total Time:</strong> {route.totalTimeTaken}
                </p>
                <p
                    className={`${
                        selectedRoute?.routeId === route.routeId
                            ? "text-blue-900"
                            : "text-gray-800"
                    }`}
                >
                    <strong>Total Cost:</strong> ₹{route.totalCost}
                </p>
                <p
                    className={`${
                        selectedRoute?.routeId === route.routeId
                            ? "text-blue-900"
                            : "text-gray-800"
                    }`}
                >
                    <strong>Expected Delivery:</strong> {route.expectedDelivery}
                </p>
                <div className='bg-caribbeangreen-50 mt-2 p-1 flex gap-x-1 items-center rounded-md'>
                    <HiSparkles className='text-white ml-1'/>
                    <p
                        className={`${
                            selectedRoute?.routeId === route.routeId
                                ? "text-blue-900"
                                : "text-gray-800"
                        } `}
                    >
                        <strong>Carbon Emission:</strong> {route.totalCarbonEmission} kcal
                    </p>
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
