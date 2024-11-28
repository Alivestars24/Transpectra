const mongoose = require("mongoose");

const ManufacturingCompanySchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    companyAddress: { type: String, required: true },
    companyArea: { type: String, required: true },
    companyDescription: { type: String },
    companyImage: { type: String, required: true },
    manufacturerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    linkedWarehouses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "warehouse",
      },
    ],
    linkedOrders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrderProducts",
      },
    ],
  },
  { timestamps: true }
);

const ManufacturingCompany = mongoose.model(
  "manufacturingCompany",
  ManufacturingCompanySchema
);

module.exports = ManufacturingCompany;
