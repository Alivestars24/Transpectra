const express = require("express")
const router = express.Router();
const Joi = require('joi');
const validateWith = require('../middleware/validation')

const { FetchDelivery } = require('../controllers/delivery')



const endpoints = {
    AVAILABLE_DELIVERIES: '/deliveries/available',
    GET_DELIVERIES: '/:delivery_id?'
}


// router.post(endpoints.AVAILABLE_DELIVERIES,)
router.post(endpoints.GET_DELIVERIES, FetchDelivery)



module.exports = router