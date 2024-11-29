const express = require("express");
const router = express.Router();
const {addFleetDetails }= require("../controllers/fleet");

/**
 * 
 * Purpose : Route to add Fleet details 
 * 
 * url : api/v1/fleet/add
 * 
 * 
 */
router.post("/add", addFleetDetails);

module.exports = router;
