const express = require("express");
const router = express.Router();
const { getOrderDetailsByWarehouse } = require("../controllers/OrderRequest");

// Route to fetch order details by warehouse ID
router.get("/orders/:warehouseId", getOrderDetailsByWarehouse);

module.exports = router;
