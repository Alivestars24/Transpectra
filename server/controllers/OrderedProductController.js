const Order = require("../models/OrderedProducts");
const ManufacturingCompany = require("../models/ManufacturingCompany");
const Warehouse = require("../models/Warehouse");

exports.createOrder = async (req, res) => {
  try {
    const {
      selectedProducts,
      manufacturerId,
      estimatedDeliveryDate,
      warehouseId,
    } = req.body;
    
    if (!selectedProducts || !Array.isArray(selectedProducts) || selectedProducts.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide selected products with their details.",
      });
    }
    if (!manufacturerId || !estimatedDeliveryDate || !warehouseId) {
      return res.status(400).json({
        success: false,
        message: "Manufacturer ID, warehouse ID, and estimated delivery date are required.",
      });
    }

    // Validate manufacturer and warehouse
    const manufacturer = await ManufacturingCompany.findById(manufacturerId);
    if (!manufacturer) {
      return res.status(404).json({
        success: false,
        message: "Manufacturer not found. Please provide a valid manufacturer ID.",
      });
    }

    const warehouse = await Warehouse.findById(warehouseId);
    if (!warehouse) {
      return res.status(404).json({
        success: false,
        message: "Warehouse not found. Please provide a valid warehouse ID.",
      });
    }

    // Save the order details
    const order = await Order.create({
      selectedProducts,
      manufacturerId,
      manufacturerName: manufacturer.companyName, // Extract from the manufacturing company
      warehouseId,
      estimatedDeliveryDate,
    });

    // Link the generated order ID with the manufacturer and warehouse
    if (!manufacturer.linkedWarehouses) manufacturer.linkedWarehouses = [];
    if (!warehouse.linkedManufacturers) warehouse.linkedManufacturers = [];

    if (!manufacturer.linkedWarehouses.includes(warehouseId)) {
      manufacturer.linkedWarehouses.push(warehouseId);
    }
    if (!warehouse.linkedManufacturers.includes(manufacturerId)) {
      warehouse.linkedManufacturers.push(manufacturerId);
    }

    // Add the order ID to the manufacturer and warehouse
    if (!manufacturer.linkedOrders) manufacturer.linkedOrders = [];
    if (!warehouse.linkedOrders) warehouse.linkedOrders = [];

    manufacturer.linkedOrders.push(order._id);
    warehouse.linkedOrders.push(order._id);

    // Save the updated manufacturer and warehouse
    await manufacturer.save();
    await warehouse.save();

    // Return success response
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
