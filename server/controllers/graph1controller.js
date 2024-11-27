// controllers/graphController.js
const Product = require('../models/Products');
const Warehouse = require('../models/Warehouse');
const GraphData = require('../models/graph1');
const User = require('../models/User');
const moment = require('moment');

exports.generateGraphData = async (req, res) => {
  try {
    const { managerId } = req.params;

    // Step 1: Verify manager exists
    const manager = await User.findById(managerId);
    if (!manager || manager.accountType !== 'Warehouse_Manager') {
      return res.status(404).json({ error: "Invalid warehouse manager ID." });
    }

    // Step 2: Fetch linked warehouse
    const warehouseId = manager.LinkedWarehouseID;
    if (!warehouseId) {
      return res.status(404).json({ error: "No linked warehouse found for the manager." });
    }

    const warehouse = await Warehouse.findById(warehouseId);
    if (!warehouse) {
      return res.status(404).json({ error: "Warehouse not found." });
    }

    // Step 3: Determine current and previous months
    const currentMonth = moment().format('MMMM');
    const previousMonth = moment().subtract(1, 'months').format('MMMM');

    // Step 4: Aggregate product data for current and previous months
    const products = await Product.find({ warehouse: warehouseId });

    const dataByCategory = products.reduce((acc, product) => {
      if (!acc[product.productCategory]) {
        acc[product.productCategory] = { currentMonthQuantity: 0, previousMonthQuantity: 0 };
      }

      if (product.month === currentMonth) {
        acc[product.productCategory].currentMonthQuantity += product.productQuantity;
      } else if (product.month === previousMonth) {
        acc[product.productCategory].previousMonthQuantity += product.productQuantity;
      }

      return acc;
    }, {});

    // Step 5: Store aggregated data in GraphData model
    const graphDataPromises = Object.entries(dataByCategory).map(([category, { currentMonthQuantity, previousMonthQuantity }]) => {
      return GraphData.create({
        managerId,
        warehouseId,
        productCategory: category,
        currentMonthQuantity,
        previousMonthQuantity,
      });
    });

    await Promise.all(graphDataPromises);

    res.status(201).json({
      success: true,
      message: "Graph data generated successfully.",
      data: dataByCategory,
    });
  } catch (error) {
    console.error("Error generating graph data:", error);
    res.status(500).json({ error: "An error occurred while generating graph data." });
  }
};
