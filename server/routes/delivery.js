const express = require("express")
const router = express.Router();
const Joi = require('joi');
const validateWith = require('../middleware/validation')

const { FetchDelivery, CreateDelivery } = require('../controllers/delivery')



const endpoints = {
    AVAILABLE_DELIVERIES: '/deliveries/available',
    GET_DELIVERIES: '/:delivery_id?',
    CREATE_DELIVERIES: '/create',
}


/**
 * @url : api/v1/delivery/create
 * 
 * purpose : create delivery for perticular order 
 */

router.post(endpoints.CREATE_DELIVERIES, CreateDelivery)


router.post(endpoints.GET_DELIVERIES, FetchDelivery)



module.exports = router