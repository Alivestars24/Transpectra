const mongoose = require('mongoose');
const DistributionCenter = require('./DistributionCenter');
const { required } = require('joi');

const DeliverySchema = new mongoose.Schema({
    DistributionCenterId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : "DistributionCenter"
    },
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Store"
    },
    pickupLocation: {
        address: { type: String, required: true },
        contactPerson: { type: String, required: true },
        contactNumber: { type: String, required: true }
    },
    dropoffLocation: {
        address: { type: String, required: true },
        contactPerson: { type: String, required: true },
        contactNumber: { type: String, required: true }
    },
    packageDetails: {
        weight: { type: String, required: true },
        dimensions: { type: String, required: true },
        fragile: { type: Boolean, default: false },
        description: { type: String }
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
    assignedDriver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    estimatedDeliveryTime: { type: Date },
    createdAt: { type: Date, default: Date.now },

});

const Delivery = mongoose.model('Delivery', DeliverySchema);

module.exports = Delivery;
