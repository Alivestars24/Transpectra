const ManufacturingCompany = require("../models/ManufacturingCompany");
const Warehouse = require("../models/Warehouse");
const Order = require("../models/OrderedProducts");

exports.getManufacturerDetails = async (req, res) => {
  try {
    const { manufacturerId } = req.params; // Extract manufacturerId from request parameters

    // Validate manufacturerId
    if (!manufacturerId) {
      return res.status(400).json({
        success: false,
        message: "Manufacturer ID is required.",
      });
    }

    // Fetch the manufacturer
    const manufacturer = await ManufacturingCompany.findById(manufacturerId)
      .populate("linkedWarehouses") // Populate linked warehouses
      .populate("linkedOrders"); // Populate linked orders

    if (!manufacturer) {
      return res.status(404).json({
        success: false,
        message: "Manufacturer not found.",
      });
    }

    // Fetch warehouse and corresponding orders
    const warehouseOrderDetails = await Promise.all(
      manufacturer.linkedWarehouses.map(async (warehouseId) => {
        // Fetch warehouse details
        const warehouse = await Warehouse.findById(warehouseId);

        // Fetch orders linked to this warehouse for this manufacturer
        const orders = await Order.find({
          manufacturerId: manufacturerId,
          warehouseId: warehouseId,
        });

        return {
          warehouseDetails: warehouse,
          orders: orders,
        };
      })
    );

    // Return response
    return res.status(200).json({
      success: true,
      manufacturerDetails: {
        companyName: manufacturer.companyName,
        companyAddress: manufacturer.companyAddress,
        companyArea: manufacturer.companyArea,
        companyDescription: manufacturer.companyDescription,
        linkedWarehouses: warehouseOrderDetails,
      },
    });
  } catch (error) {
    console.error("Error fetching manufacturer details:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching manufacturer details.",
      error: error.message,
    });
  }
};
