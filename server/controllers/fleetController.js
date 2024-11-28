const Fleet = require("../models/fleet");
const User = require("../models/User");
const { errorFunction } = require("../utils/errorFunction");

exports.addFleetDetails = async (req, res) => {
  try {
    // Destructure fields from the request body
    const { 
      driverName, 
      vehicleLicensePlate, 
      dateOfArrival, 
      purpose, 
      allocatedDock, 
      orderId, 
      yardManagerId // Taking yardManagerId from the request body
    } = req.body;

    console.log(req.body);

    // Validate required fields
    if (!driverName || !vehicleLicensePlate || !dateOfArrival || !purpose || !allocatedDock || !yardManagerId) {
      return res
        .status(400)
        .json(errorFunction(false, "All required fields must be provided, including yardManagerId."));
    }

    // Find the Yard Manager in the database
    const yardManager = await User.findById(yardManagerId);

    if (!yardManager || yardManager.accountType !== "yard_manager") {
      return res
        .status(400)
        .json(errorFunction(false, "Invalid Yard Manager ID or the user is not a Yard Manager."));
    }

    // Check if the Yard Manager is linked to a Yard
    const linkedYardId = yardManager.LinkedYardID;
    if (!linkedYardId) {
      return res
        .status(400)
        .json(errorFunction(false, "Yard Manager is not linked to any Yard."));
    }

    // Get the current time for timeOfArrival
    const timeOfArrival = new Date().toISOString().split("T")[1].split(".")[0]; // Format: HH:mm:ss

    // Create Fleet entry
    const newFleet = await Fleet.create({
      driverName,
      vehicleLicensePlate,
      dateOfArrival,
      timeOfArrival,
      purpose,
      allocatedDock,
      orderId: orderId || null, // Optional field
      yardId: linkedYardId, // Linking Yard ID
      yardManagerId, // Linking Yard Manager ID
    });

    // Return success response
    return res.status(201).json({
      success: true,
      message: "Fleet details added successfully.",
      fleet: newFleet,
    });
  } catch (error) {
    console.error("Error adding Fleet details:", error);
    return res
      .status(500)
      .json(errorFunction(false, "An error occurred while adding Fleet details.", error.message));
  }
};
