const Delivery = require('../models/Delivery');
const { msgFunction } = require('../utils/msgFunction');
const { CONFIG } = require('../constants/config')
const mongoose = require('mongoose');
const ManufacturingUnit = require('../models/ManufacturingUnit');
const Warehouse = require('../models/Warehouse');

const { getCarbonEmission } = require('../UlipAPI/carbonEmissionapi')

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
            return res.status(401).json(msgFunction(false, "You are not authenticated!"));
        }

        if (deliveryId && !mongoose.Types.ObjectId.isValid(deliveryId)) {
            return res.status(400).json(
                msgFunction(false, "Incorrect delivery ID. Please provide a valid ID.")
            );
        }

        let query = {};


        if (accountType === CONFIG.ACCOUNT_TYPE.DRIVER) {
            query.assignedDriver = userId;
        }
        else if (accountType === CONFIG.ACCOUNT_TYPE.DISTRIBUTION_CENTER || accountType === CONFIG.ACCOUNT_TYPE.STORE) {
            if (!storeId) {
                return res.status(400).json(
                    msgFunction(false, "Your Store is Not Found! Please log in again.")
                );
            }

            query = accountType === CONFIG.ACCOUNT_TYPE.DISTRIBUTION_CENTER
                ? { DistributionCenterId: storeId }
                : { storeId: storeId };
        }
        else {
            return res.status(403).json(
                msgFunction(false, "You are not permitted to fetch deliveries!")
            );
        }

        if (deliveryId) {
            query._id = deliveryId;
        }

        const deliveries = await Delivery.find(query);

        if (!deliveries || deliveries.length === 0) {
            return res.status(404).json(
                msgFunction(false, "No Delivery Items are found!")
            );
        }

        return res.json({
            success: true,
            data: deliveries
        });

    } catch (error) {
        console.error("Error in FetchDelivery:", error);
        return res.status(500).json(
            msgFunction(false, "An error occurred while fetching the delivery.", error.message)
        );
    }
};





exports.CreateDelivery = async (req, res) => {
    try {
        const {
            orderId,
            uniqueOrderId,
            warehouseId,
            ManufactureId,
            selectedProducts,
            estimatedDeliveryTime
        } = req.body;

        // Validate mandatory fields
        if (
            !orderId ||
            !uniqueOrderId ||
            !warehouseId ||
            !ManufactureId ||
            !selectedProducts ||
            !estimatedDeliveryTime
        ) {
            return res.status(400).json(msgFunction(false, "Missing required fields."));
        }

        // Validate product structure
        if (!Array.isArray(selectedProducts) || selectedProducts.length === 0) {
            return res
                .status(400)
                .json(msgFunction(false, "Selected products must be a non-empty array."));
        }

        const isProductValid = selectedProducts.every(product =>
            product.productName &&
            typeof product.productName === 'string' &&
            product.quantity &&
            typeof product.quantity === 'number' &&
            product.specifications &&
            typeof product.specifications === 'string' &&
            product.unitCost &&
            typeof product.unitCost === 'number' &&
            product._id &&
            typeof product._id === 'string'
        );

        if (!isProductValid) {
            return res
                .status(400)
                .json(msgFunction(false, "Invalid product structure. Each product must have 'productName' (string), 'quantity' (number), 'specifications' (string), 'unitCost' (number), and '_id' (string)."));
        }

        // Retrieve Manufacturing Unit details
        const manufacturingUnit = await ManufacturingUnit.findById(ManufactureId);
        if (!manufacturingUnit) {
            return res
                .status(404)
                .json(msgFunction(false, "Manufacturing unit not found."));
        }

        // Retrieve Warehouse details
        const warehouse = await Warehouse.findById(warehouseId);
        if (!warehouse) {
            return res.status(404).json(msgFunction(false, "Warehouse not found."));
        }

        // Extract pickup and dropoff locations from Manufacturing Unit and Warehouse
        const pickupLocation = {
            address: manufacturingUnit.address,
            contactPerson: manufacturingUnit.contactPerson,
            contactNumber: manufacturingUnit.contactNumber
        };

        const dropoffLocation = {
            address: warehouse.address,
            contactPerson: warehouse.contactPerson,
            contactNumber: warehouse.contactNumber
        };


        const result = await getCarbonEmission('1823.3', 'Light Commercial Vehicles - Rigid Trucks', 'Diesel', 1);

        console.log(result)


        // Create new delivery
        const newDelivery = new Delivery({
            orderId,
            uniqueOrderId,
            uniqueDeliveryId: `DEL-${Date.now()}`, // Generate unique delivery ID
            warehouseId,
            ManufactureId,
            pickupLocation,
            dropoffLocation,
            products: selectedProducts, // Include the validated products
            packageDetails: {
                weight: `${selectedProducts.length * 10}kg`, // Example: Approximate weight calculation
                dimensions: "Varied",
                fragile: false,
                description: "Delivery of selected products"
            },
            estimatedDeliveryTime,
            createdAt: new Date(),
            status: "Pending" // Default status
        });

        // Save the delivery to the database
        await newDelivery.save();

        // Respond with success
        return res
            .status(200)
            .json(msgFunction(true, "Delivery created successfully.", newDelivery));
    } catch (error) {
        console.error("Error creating delivery:", error);
        return res
            .status(500)
            .json(msgFunction(false, "Internal server error.", error.message));
    }
};
