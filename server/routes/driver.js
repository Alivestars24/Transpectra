const express = require('express');
const router = express.Router();

const {
    ChooseDelivery,
    GetDelivery
} = require('../controllers/driver');
const { isDriver } = require('../middleware/auth');

const endpoints = {
    ACCEPT_REJECT_DELIVERY: '/delivery/:deliveryId/respond',
    TRACK_DELIVERY_POINTS: '/driver/:driverId/delivery/:deliveryId/track',
    CONFIRM_ARRIVAL_CHECKPOINT: "/driver/:driverId/delivery/:deliveryId/checkpoint/:pointId/arrive",
    SCAN_QR: "/driver/:drziverId/delivery/:deliveryId/checkpoint/:pointId/scan",
};

router.post(endpoints.ACCEPT_REJECT_DELIVERY, isDriver, ChooseDelivery);


module.exports = router;