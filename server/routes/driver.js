const express = require('express');
const router = express.Router();

const {
    ChooseDelivery,
    GetDelivery,
    getAvailableDrivers,
    assignDriverToManufacturingUnit
} = require('../controllers/driver');
const { isDriver } = require('../middleware/auth');
const { DRIVER_TRUCK } = require('../controllers/driver'); 
const endpoints = {
    ACCEPT_REJECT_DELIVERY: '/delivery/:deliveryId/respond',
    TRACK_DELIVERY_POINTS: '/driver/:driverId/delivery/:deliveryId/track',
    CONFIRM_ARRIVAL_CHECKPOINT: "/driver/:driverId/delivery/:deliveryId/checkpoint/:pointId/arrive",
    SCAN_QR: "/driver/:drziverId/delivery/:deliveryId/checkpoint/:pointId/scan",
    VERIFY_DRIVER_TRUCK: '/driver/verify-truck',
};

router.post(endpoints.ACCEPT_REJECT_DELIVERY, isDriver, ChooseDelivery);
router.post(endpoints.VERIFY_DRIVER_TRUCK, isDriver, DRIVER_TRUCK);

router.get("/manufacturing-unit/:manufacturingUnitId/drivers", getAvailableDrivers);
router.post("/manufacturing-unit/assign-driver", assignDriverToManufacturingUnit);

module.exports = router;