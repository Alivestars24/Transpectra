const express = require("express");
const multer = require("multer");
const path = require("path");
const yardController = require("../controllers/YardManage");

const router = express.Router();


/**
 * @route POST /addYard
 * @description Add a new yard with details from form-data
 */
router.post(
  "/addYard",
  yardController.addYard
);


module.exports = router;
