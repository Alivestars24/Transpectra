const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    selectedProducts: [
      {
        productName: { type: String, required: true },
        quantity: { type: Number, required: true },
        specifications: { type: String, required: true },
      },
    ],
    manufacturerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ManufacturingCompany",
      required: true,
    },
    manufacturerName: {
      type: String,
      required: true,
    },
    warehouseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
      required: true,
    },
    estimatedDeliveryDate: {
      type: Date,
      required: true,
    },
    orderCreatedDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("OrderProducts", OrderSchema);

module.exports = Order;
