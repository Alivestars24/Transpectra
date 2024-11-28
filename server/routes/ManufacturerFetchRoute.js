const express = require("express");
const router = express.Router();
const { getAllManufacturersWithDetails } = require("../controllers/ManufacturerFetch");

// Route to fetch manufacturers with linked details
router.get("/manufacturers", getAllManufacturersWithDetails);

module.exports = router;
