// routes/graphRoutes.js
const express = require('express');
const graphController = require('../controllers/graph1controller');

const router = express.Router();

// Route to generate graph data for a specific manager
router.get('/generategraph1/:managerId', graphController.generateGraphData);
module.exports = router;
