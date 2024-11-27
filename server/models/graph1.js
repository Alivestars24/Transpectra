const mongoose = require('mongoose');

const GraphDataSchema = new mongoose.Schema({
  managerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  warehouseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Warehouse',
    required: true,
  },
  productCategory: {
    type: String,
    required: true,
  },
  currentMonthQuantity: {
    type: Number,
    required: true,
  },
  previousMonthQuantity: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('graph1', GraphDataSchema);
