const express = require("express");
const router = express.Router();
const { getManufacturerDetails } = require("../controllers/OrderRequest");

// Route to fetch manufacturer details with linked warehouses and orders
router.get("/manufacturer/:manufacturerId/details", getManufacturerDetails);

module.exports = router;
