const Order = require("../models/OrderedProducts");
const User = require("../models/User");


exports.getOrderDetailsByWarehouse = async (req, res) => {
  try {
    // Extract warehouseId from request parameters
    const { warehouseId } = req.params;

    // Validate that the warehouseId is provided
    if (!warehouseId) {
      return res.status(400).json({
        success: false,
        message: "Warehouse ID is required.",
      });
    }

    // Find the order details for the given warehouseId
    const order = await Order.findOne({ warehouseId }).populate("warehouseId");
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "No order found for the given Warehouse ID.",
      });
    }

    // Find the Warehouse Manager associated with this warehouseId
    const warehouseManager = await User.findOne({
      LinkedWarehouseID: warehouseId,
      accountType: "Warehouse_Manager",
    });

    if (!warehouseManager) {
      return res.status(404).json({
        success: false,
        message: "No Warehouse Manager found for the given Warehouse ID.",
      });
    }

    // Prepare the response
    const response = {
      warehouseManagerName: `${warehouseManager.firstName} ${warehouseManager.lastName}`,
      selectedProducts: order.selectedProducts,
      estimatedDeliveryDate: order.estimatedDeliveryDate,
      orderCreatedDate: order.orderCreatedDate,
    };

    // Return the response
    return res.status(200).json({
      success: true,
      message: "Order details fetched successfully.",
      orderDetails: response,
    });
  } catch (error) {
    console.error("Error fetching order details:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching order details.",
      error: error.message,
    });
  }
};
