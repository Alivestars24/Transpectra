const express = require("express");
const multer = require("multer");
const yardController = require("../controllers/YardManage");

const router = express.Router();

// Multer configuration to handle form-data without files
const upload = multer().none();

/**
 * @route POST /addYard
 * @description Add a new yard with details from form-data
 */
router.post("/addYard", upload, yardController.addYard);

/**
 * @route GET /:yardManagerId
 * @description Get warehouse details for a yard manager
 */
router.get("/:yardManagerId", yardController.getWarehouseDetailsForManager);

module.exports = router;
