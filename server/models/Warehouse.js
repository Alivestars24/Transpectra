const mongoose = require("mongoose");
const generateUniqueId = require('generate-unique-id');

const WarehouseSchema = new mongoose.Schema(
  {
    warehouseName: {
      type: String,
      trim : true,
      required: true,
    },
    warehouseAddress: {
      type: String,
      trim : true,
      required: true,
    },
    warehouseArea: {
      type: String,
      required: true,
    },
    warehouseDescription: {
      type: String,
      trim : true,
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
    ],
    uniqueCode: {
      type: String,
      sparse: true,
    },
  },
  { timestamps: true }
);

WarehouseSchema.pre('save', async function (next) {
  this.uniqueCode = generateUniqueId({
    length: 6
  });
  next();
});

const Warehouse = mongoose.model("warehouse", WarehouseSchema);

module.exports = Warehouse;
