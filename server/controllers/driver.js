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

const ManufacturingUnit = require("../models/ManufacturingUnit");
// const Driver = require("../models/Driver");


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
            const rcEngineNumber = extractXmlValue(responseXml, "enginenumber");
            if (rcChassisNumber !== chassisNumber || rcOwnerName !== ownerName || rcEngineNumber !== engineNumber) {
                return res.status(400).json(
                    msgFunction(false, "Truck details do not match registered records")
                );
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

            const bioFullName = sarathiResponse.data.response?.bioFullName;
            if (!bioFullName || bioFullName !== req.user.name) {
                return res.status(404).json(
                    msgFunction(false, "Driving license verification failed: Name mismatch")
                );
            }
        }

        // Driver verification in the database
        const driver = await User.findOne({ id: driverId, accountType: CONFIG.ACCOUNT_TYPE.DRIVER });
        if (!driver) {
            return res.status(404).json(msgFunction(false, "Driver not found in the database"));
        }


        driver.isVerified = true;
        await driver.save();

        return res.status(200).json({
            success: true,
            message: "Driver successfully verified",
            data: {
                verified: true,
                driverName: driver.name,
                truckNumber: truckNumber || null,
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

/*
 * @url : api/v1/delivery/warehouse/:warehouseId/details
 *
 * purpose : fetch all the available drivers 
 */

exports.getAvailableDrivers = async (req, res) => {
    try {
        const { manufacturingUnitId } = req.params;

        // Validate the manufacturingUnitId
        if (!manufacturingUnitId) {
            return res.status(400).json({
                success: false,
                message: "Manufacturing unit ID is required.",
            });
        }

        // Find the manufacturing unit by ID
        const manufacturingUnit = await ManufacturingUnit.findById(manufacturingUnitId);
        if (!manufacturingUnit) {
            return res.status(404).json({
                success: false,
                message: "Manufacturing unit not found.",
            });
        }

        // Extract linked driver IDs from the manufacturing unit
        const linkedDriverIds = manufacturingUnit.linkedDrivers || [];

        if (linkedDriverIds.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No drivers are linked to this manufacturing unit.",
            });
        }

        // Fetch details of drivers whose status is "available"
        const availableDrivers = await Driver.find({
            _id: { $in: linkedDriverIds },
            status: "available",
        });

        if (availableDrivers.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No available drivers found for the given manufacturing unit.",
            });
        }

        // Respond with the list of available drivers
        return res.status(200).json({
            success: true,
            message: "Available drivers fetched successfully.",
            drivers: availableDrivers,
        });
    } catch (error) {
        console.error("Error fetching available drivers:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message,
        });
    }
};
/*
 * @url : api/v1/delivery/warehouse/:warehouseId/details
 *
 * purpose : assign the delivery to drivers
 */

exports.assignDriverToManufacturingUnit = async (req, res) => {
    try {
        const { uniqueUnitCode, driverId } = req.body;

        // Validate request body
        if (!uniqueUnitCode || !driverId) {
            return res.status(400).json({
                success: false,
                message: "Unique Unit Code and Driver ID are required.",
            });
        }

        // Find the manufacturing unit by unique unit code
        const manufacturingUnit = await ManufacturingUnit.findOne({ uniqueUnitCode });
        if (!manufacturingUnit) {
            return res.status(404).json({
                success: false,
                message: "Manufacturing unit not found.",
            });
        }

        // Check if the driver is already linked
        if (manufacturingUnit.linkedDrivers.includes(driverId)) {
            return res.status(400).json({
                success: false,
                message: "Driver is already linked to this manufacturing unit.",
            });
        }

        // Append the driver ID to the linkedDrivers array
        manufacturingUnit.linkedDrivers.push(driverId);
        await manufacturingUnit.save();

        // Update the driver's status to "assigned"
        const updatedDriver = await Driver.findByIdAndUpdate(
            driverId,
            { status: "assigned", linkedManufacturingUnit: manufacturingUnit._id },
            { new: true }
        );

        if (!updatedDriver) {
            return res.status(404).json({
                success: false,
                message: "Driver not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Driver assigned to manufacturing unit successfully.",
            manufacturingUnit,
            driver: updatedDriver,
        });
    } catch (error) {
        console.error("Error assigning driver to manufacturing unit:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message,
        });
    }
};



