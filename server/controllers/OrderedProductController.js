const Order = require("../models/OrderedProducts");
const ManufacturingCompany = require("../models/ManufacturingCompany");

exports.createOrder = async (req, res) => {
  try {
    const {
      selectedProducts,
      manufacturerName,
      estimatedDeliveryDate,
      warehouseId,
    } = req.body;

    // Validate the input fields
    if (!selectedProducts || !Array.isArray(selectedProducts) || selectedProducts.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide selected products with their details.",
      });
    }
    if (!manufacturerName || !estimatedDeliveryDate || !warehouseId) {
      return res.status(400).json({
        success: false,
        message: "Manufacturer name, warehouse ID, and estimated delivery date are required.",
      });
    }

    // Fetch the manufacturer ID using the manufacturer name
    const manufacturer = await ManufacturingCompany.findOne({ companyName: manufacturerName });
    if (!manufacturer) {
      return res.status(404).json({
        success: false,
        message: "Manufacturer not found. Please provide a valid manufacturer name.",
      });
    }

    // Save the order details in the database
    const order = await Order.create({
      selectedProducts, // Includes productName, quantity, and specifications
      manufacturerId: manufacturer._id,
      manufacturerName,
      warehouseId,
      estimatedDeliveryDate,
    });

    // Return the success response
    return res.status(201).json({
      success: true,
      message: "Order created successfully.",
      order,
    });
  } catch (error) {
    console.error("Error creating the order:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the order.",
      error: error.message,
    });
  }
};
