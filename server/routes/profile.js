const express = require("express")
const router = express.Router();
const Joi = require('joi');
const validateWith = require('../middleware/validation')

const {
    profile
} = require('../controllers/profile')

endpoint = {
    PROFILE: "/details"
}

// Route for the fetching the profile
router.get(endpoint.PROFILE, profile);


// Export the router for use in the main application
module.exports = router