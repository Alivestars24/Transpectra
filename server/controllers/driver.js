const available_driver = require('../models/AvailabilityStatus')
const { msgFunction } = require('../utils/msgFunction')
const distribution_center = require('../models/DistributionCenter');
const delivery = require('../models/Delivery');
const availability_status = require('../models/AvailabilityStatus');
const mongoose = require('mongoose');

const { CONFIG } = require('../constants/config');

// check karna bacha hai 
exports.FetchDriver = async (req, res) => {
    try {

        const dsId = req.store.id;
        console.log(dsId);

        if (!dsId) {
            return res.json(msgFunction(false, "Distribution Center field is required"));
        }

        console.log(dsId)

        const DC = await distribution_center.findById(dsId);

        if (!DC) {
            return res.json(msgFunction(false, "Distribution Center Not found"));
        }

        const { status } = req.query;

        const statusOrder = ['assigned', 'onDelivery', 'available'];

        let filter = { _id: dsId };
        if (status && statusOrder.includes(status)) {
            filter.status = status;
        }

        console.log("filter", filter);

        const allAvailableDriver = available_driver.find(filter);

        return res.status(200).json({
            success: true,
            data: allAvailableDriver,
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json(msgFunction(false, JSON.stringify(error.message)))
    }
}


//  check karna  bachha hai 
exports.ChooseDelivery = async (req, res) => {
    try {
        const { id: driverId, account_type: accountType } = req.user;
        const { deliveryId } = req.params;
        const { isAccepted } = req.body;

        if (!driverId) {
            return res.json(msgFunction(false, "You are not authenticated!"));
        }

        if (accountType !== CONFIG.ACCOUNT_TYPE.DRIVER) {
            return res.json(msgFunction(false, "You are not permitted!"));
        }

        if (!mongoose.Types.ObjectId.isValid(deliveryId)) {
            return res.status(400).json(
                msgFunction(false, "Incorrect delivery ID. Please provide a valid ID.")
            );
        }

        if (isAccepted == 'false') {
            return res.json(
                msgFunction(true, "Successfully, you did not accept the delivery ride.")
            );
        }

        const deliveryUpdateResult = await delivery.findByIdAndUpdate(
            deliveryId,
            { status: "In Progress", assignedDriver: driverId },
            { new: true }
        );

        if (!deliveryUpdateResult) {
            return res.json(
                msgFunction(false, "This delivery was not found.")
            );
        }

        const driverAvailability = await availability_status.findOne({
            driver_id: driverId
        });

        if (!driverAvailability) {
            return res.json(
                msgFunction(false, "Driver availability status not found.")
            );
        }

        if (driverAvailability.status === "available") {
            await availability_status.findOneAndUpdate(
                { driver_id: driverId },
                { status: "assigned" }
            );

            return res.json({
                success: true,
                data: deliveryUpdateResult,
                message: "You have been assigned the delivery."
            });
        } else {
            return res.json(
                msgFunction(false, "You have already been assigned a delivery. Please complete it before accepting another.")
            );
        }
    } catch (error) {
        console.error("Error in ChooseDelivery:", error);
        return res.status(500).json(
            msgFunction(false, "An error occurred while choosing the delivery.", error.message)
        );
    }
};


