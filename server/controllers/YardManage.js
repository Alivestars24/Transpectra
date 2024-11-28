const Yard = require("../models/Yard");
const Warehouse = require("../models/Warehouse");
const User = require("../models/User");
const { errorFunction } = require("../utils/errorFunction");
const { CONFIG } = require("../constants/config");

exports.addYard = async (req, res) => {
  try {
    console.log("Received request to add a yard", req.body);

    const { warehouseCode, yardManagerId } = req.body;

    // Validate input
    if (!warehouseCode || !yardManagerId) {
      throw new Error("Warehouse Code and Yard Manager ID are required");
    }

    // Fetch warehouse by code
    const wareHouse = await Warehouse.findOne({ uniqueCode: warehouseCode });
    if (!wareHouse) {
      console.log(wareHouse);
      throw new Error("Invalid Warehouse Code");
    }

    // Validate Yard Manager
    const yardManager = await User.findById(yardManagerId);
    if (!yardManager || yardManager.accountType !== CONFIG.ACCOUNT_TYPE.YARD) {
      throw new Error("Invalid Yard Manager ID");
    }

    // Check for existing yard with the same combination of yardManagerId and warehouseId
    const existingYard = await Yard.findOne({
      yardManagerId,
      warehouseId: wareHouse._id,
    });

    if (existingYard) {
      throw new Error(
        "A Yard with the same Yard Manager and Warehouse already exists"
      );
    }

    // Create a new Yard entry
    const yard = await Yard.create({
      warehouseId: wareHouse._id,
      yardManagerId,
    });

    // Link the new Yard ID to the Yard Manager
    yardManager.LinkedYardID = yard._id;
    await yardManager.save();

    // Respond with success
    console.log("Yard added and linked successfully");
    return res.status(201).json({
      success: true,
      message:
        "Yard added successfully and linked to Yard Manager and Warehouse.",
      yard,
    });
  } catch (error) {
    console.error("Error while adding yard:", error);
    return res.status(500).json(
      errorFunction(
        false,
        error.message
      )
    );
  }
};
