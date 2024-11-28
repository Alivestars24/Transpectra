const Yard = require("../models/Yard");
const Warehouse = require("../models/Warehouse");
const User = require("../models/User");
const { msgFunction } = require("../utils/msgFunction");
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
      return res.status(201).json(
        msgFunction(
          true,
          "A Yard with the same Yard Manager and Warehouse already exists",
          existingYard
        )
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
      msgFunction(
        false,
        error.message
      )
    );
  }
};


// Controller to fetch warehouse details for a given yardManagerId
exports.getWarehouseDetailsForManager = async (req, res) => {
  try {
    const { yardManagerId } = req.params;

    // Find the yard managed by the yardManagerId
    const yard = await Yard.findOne({ yardManagerId: yardManagerId });
    if (!yard) {
      return res.status(404).json({ error: "Yard not found" });
    }

    // Find the warehouse associated with the yard
    const warehouse = await Warehouse.findById(yard.warehouseId);
    if (!warehouse) {
      return res.status(404).json({ error: "Warehouse not found" });
    }

    // Respond with the warehouse details
    return res.status(200).json({ success: true, warehouse });
  } catch (error) {
    console.error("Error fetching warehouse details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


