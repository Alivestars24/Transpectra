const express = require("express");
const router = express.Router();
const addFleetDetails = require("../controllers/fleetController");

// Route to add Fleet details
router.post("/addfleetdetails", addFleetDetails.addFleetDetails);

module.exports = router;
