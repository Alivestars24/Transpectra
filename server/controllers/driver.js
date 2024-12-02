const available_driver = require('../models/AvailabilityStatus')
const { msgFunction } = require('../utils/msgFunction')
const distribution_center = require('../models/DistributionCenter');
const delivery = require('../models/Delivery');
const availability_status = require('../models/AvailabilityStatus');
const mongoose = require('mongoose');
const axios = require('axios');
const { getVahanDetails } = require('../UlipAPI/vahan');
const { getSarthiDetails } = require('../UlipAPI/sarathi');
// const { User } = require('../models/user');


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

        let filter = { _id : dsId };
        if (status && statusOrder.includes(status)) {
            filter.status = status;
        }

        console.log("filter",filter);

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

exports.DRIVER_TRUCK = async (req, res) => {
    try {
        const { id: driverId } = req.user;
        const { truckNumber, permit , chassisNumber, drivingLicense, dob, ownerName, engineNumber } = req.body;

        // Check if either truck details or driving license with DOB is provided
        if ((!truckNumber || !chassisNumber) && (!drivingLicense || !dob)) {
            return res.status(400).json(
                msgFunction(false, "Provide either truck details or driving license with DOB")
            );
        }

        // Truck details verification
        if (truckNumber && chassisNumber && ownerName && engineNumber) {
            const vahanResponse = await getVahanDetails(truckNumber, ownerName, chassisNumber, engineNumber);

            if (!vahanResponse.success || !vahanResponse.data.valid) {
                return res.status(400).json(
                    msgFunction(false, "Truck verification failed with VAHAN API")
                );
            }

            const responseXml = vahanResponse.data.response[0].response;
            const rcOwnerName = extractXmlValue(responseXml, "rc_owner_name");
            const rcChassisNumber = extractXmlValue(responseXml, "rc_chasi_no");

            if (rcChassisNumber !== chassisNumber) {
                return res.status(400).json({
                    success: false,
                    message: "Chassis number does not match the registered record",
                });
            }

            if (rcOwnerName !== ownerName) {
                return res.status(400).json({
                    success: false,
                    message: "Owner name does not match the registered record",
                });
            }
        }

        // Driving License verification
        if (drivingLicense && dob) {
            const sarathiResponse = await getSarthiDetails(drivingLicense, dob);

            if (!sarathiResponse.success || sarathiResponse.data.responseStatus !== "SUCCESS") {
                return res.status(404).json({
                    success: false,
                    message: "Driving license verification failed with SARATHI API",
                });
            }

            const driverName = sarathiResponse.data.response?.driverName;
            if (!driverName || driverName !== "Verified") {
                return res.status(404).json({
                    success: false,
                    message: "Driving license verification failed: Driver name not verified",
                });
            }
        }

        // Driver verification in the database
        let driver = await User.findOne({ id: driverId, accountType: CONFIG.ACCOUNT_TYPE.DRIVER });
        if (!driver) {
            return res.status(404).json(
                msgFunction(false, "Driver not found in the database")
            );
        }

        driver.isVerified = true;
        await driver.save();

        return res.status(200).json({
            success: true,
            message: "Driver successfully verified",
            data: {
                verified: true,
                driverName: driver.name,
                truckNumber: driver.truckNumber,
            },
        });
    } catch (error) {
        console.error("Error during driver verification:", error);
        return res.status(500).json(
            msgFunction(false, "An error occurred during verification", error.message)
        );
    }
};


const QRCode = require('qrcode');

exports.VerifyQRAndCompleteDelivery = async (req, res) => {
    try {
        const { id: driverId } = req.user;
        const { qrData } = req.body;

        if (!driverId) {
            return res.status(401).json(msgFunction(false, "You are not authenticated!"));
        }

        if (!qrData) {
            return res.status(400).json(msgFunction(false, "QR data is required!"));
        }

        const deliveryDetails = await delivery.findOne({
            qrCode: qrData,
            assignedDriver: driverId,
            status: "In Progress"
        });

        if (!deliveryDetails) {
            return res.status(404).json(msgFunction(false, "No matching delivery found or invalid QR code!"));
        }

        deliveryDetails.status = "Completed";
        deliveryDetails.completedAt = new Date();
        await deliveryDetails.save();

        return res.status(200).json({
            success: true,
            message: "Delivery successfully completed",
            data: deliveryDetails
        });
    } catch (error) {
        console.error("Error in VerifyQRAndCompleteDelivery:", error);
        return res.status(500).json(msgFunction(false, "An error occurred while completing the delivery", error.message));
    }
};


