const Yard = require("../models/Yard");
const Warehouse = require("../models/Warehouse");
const User = require("../models/User");
const { errorFunction } = require("../utils/errorFunction");

exports.addYard = async (req, res) => {
  try {
    console.log("Received request to add a yard");

    // Access form data parsed by Multer
    const warehouseName = req.body.warehouseName;
    const warehouseAddress = req.body.warehouseAddress;
    const yardManagerId = req.body.yardManagerId;

    console.log("warehouseName:", warehouseName);
    console.log("warehouseAddress:", warehouseAddress);
    console.log("yardManagerId:", yardManagerId);

    // Validate input
    if (!warehouseName || !warehouseAddress || !yardManagerId) {
      throw new Error(
        "All fields (warehouseName, warehouseAddress, yardManagerId) are required"
      );
    }

    // Check if the Yard Manager exists and is valid
    const yardManager = await User.findById(yardManagerId);
    if (!yardManager || yardManager.accountType !== "yard_manager") {
      throw new Error("Invalid Yard Manager ID");
    }

    // Find the warehouse by name and address
    const warehouse = await Warehouse.findOne({ warehouseName, warehouseAddress });
    if (!warehouse) {
      throw new Error("Warehouse with the given name and address does not exist");
    }

    // Create a new Yard entry
    const yard = await Yard.create({
      warehouseId: warehouse._id,
      yardManagerId: yardManagerId,
    });

    // Link the new Yard ID to the Yard Manager
    yardManager.LinkedYardID = yard._id;
    await yardManager.save();

    // Respond with success
    console.log("Yard added and linked successfully");
    return res.status(201).json({
      success: true,
      message: "Yard added successfully and linked to yard manager and warehouse.",
      yard,
    });
  } catch (error) {
    console.error("Error while adding yard:", error);
    return res.status(500).json(
      errorFunction(false, "An error occurred while adding the yard.", error.message)
    );
  }
};
