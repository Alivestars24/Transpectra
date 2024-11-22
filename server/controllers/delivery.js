const Delivery = require('../models/Delivery');
const { errorFunction } = require('../utils/errorFunction');
const { CONFIG } = require('../constants/config')
const mongoose = require('mongoose');


exports.available_delivery = async (req, res) => {
    try {

    } catch {

    }
}

exports.FetchDelivery = async (req, res) => {
    try {
        const { id: userId, account_type: accountType } = req.user;
        const { id: storeId } = req.store;
        const { delivery_id: deliveryId } = req.params;


        if (!userId) {
            return res.status(401).json(errorFunction(false, "You are not authenticated!"));
        }

        if (deliveryId && !mongoose.Types.ObjectId.isValid(deliveryId)) {
            return res.status(400).json(
                errorFunction(false, "Incorrect delivery ID. Please provide a valid ID.")
            );
        }

        let query = {};


        if (accountType === CONFIG.ACCOUNT_TYPE.DRIVER) {
            query.assignedDriver = userId;
        }
        else if (accountType === CONFIG.ACCOUNT_TYPE.DISTRIBUTION_CENTER || accountType === CONFIG.ACCOUNT_TYPE.STORE) {
            if (!storeId) {
                return res.status(400).json(
                    errorFunction(false, "Your Store is Not Found! Please log in again.")
                );
            }

            query = accountType === CONFIG.ACCOUNT_TYPE.DISTRIBUTION_CENTER
                ? { DistributionCenterId: storeId }
                : { storeId: storeId };
        }
        else {
            return res.status(403).json(
                errorFunction(false, "You are not permitted to fetch deliveries!")
            );
        }

        if (deliveryId) {
            query._id = deliveryId;
        }

        const deliveries = await Delivery.find(query);

        if (!deliveries || deliveries.length === 0) {
            return res.status(404).json(
                errorFunction(false, "No Delivery Items are found!")
            );
        }

        return res.json({
            success: true,
            data: deliveries
        });

    } catch (error) {
        console.error("Error in FetchDelivery:", error);
        return res.status(500).json(
            errorFunction(false, "An error occurred while fetching the delivery.", error.message)
        );
    }
};

exports.CreateDelivery = async (req, res) => {
    try {
        const { id: userId, account_type: accountType } = req.user;
        const { id: storeId } = req.store;

        const {

        } = req.body; 
 


        if (userId == null) {
            return res.status(401).json(errorFunction(false, "You are not authenticated!"));
        }

        if (accountType !== CONFIG.ACCOUNT_TYPE.DISTRIBUTION_CENTER) {
            return res.status(401).json(errorFunction(false, "You are not permitted to Create deliveries!"))
        }


        


    } catch (error) {

    }
};


