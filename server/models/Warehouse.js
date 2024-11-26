const mongoose = require("mongoose");

const WarehouseSchema = new mongoose.Schema(
  {
    warehouseName: {
      type: String,
      required: true,
    },
    warehouseAddress: {
      type: String,
      required: true,
    },
    warehouseArea: {
      type: String,
      required: true,
    },
    warehouseDescription: {
      type: String,
    },
    warehouseImage: {
      type: String,
      required: true,
    },
    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    inventory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    yards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "yard",
      },
    ], // New field to link associated yards
  },
  { timestamps: true }
);

const Warehouse = mongoose.model("warehouse", WarehouseSchema);

module.exports = Warehouse;
