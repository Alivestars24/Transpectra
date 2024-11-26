const express = require("express");
const multer = require("multer");
const path = require("path");
const yardController = require("../controllers/YardManage");

const router = express.Router();

// Multer setup for parsing form-data
const storage = multer.memoryStorage(); // No file uploads, so memory storage suffices
const upload = multer({ storage });

/**
 * @route POST /addYard
 * @description Add a new yard with details from form-data
 */
router.post(
  "/addYard",
  upload.none(), // Use `none()` since no file upload is expected
  yardController.addYard
);

module.exports = router;
