const Yard = require("../models/Yard");
const Warehouse = require("../models/Warehouse");
const User = require("../models/User");
const { errorFunction } = require("../utils/errorFunction");
const { CONFIG } = require("../constants/config");

exports.addYard = async (req, res) => {
  try {
    console.log("Received request to add a yard");

    const { warehouseCode, yardManagerId } = req.body;

    // Validate input
    if (!warehouseCode) {
      throw new Error(
        "Ware-House Code is required"
      );
    }

    const wareHouse = await Warehouse.findOne({ uniqueCode: warehouseCode });
    if (!wareHouse) {
      console.log(wareHouse);
      throw new Error("Invalid wareHouse ID");
    }

    // Check if the Yard Manager exists and is valid
    const yardManager = await User.findById(yardManagerId);
    if (!yardManager || yardManager.accountType !== CONFIG.ACCOUNT_TYPE.YARD) {
      throw new Error("Invalid Yard Manager ID");
    }

    // Create a new Yard entry
    const yard = await Yard.create({
      warehouseId: wareHouse._id,
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
