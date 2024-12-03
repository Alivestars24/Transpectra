const axios = require("axios");
const { CONFIG } = require("../constants/config");

// Route Optimization Controller
exports.getRoutes = async (req, res) => {
  try {
    const inputData = req.body; // Retrieve JSON data from the request body
    console.log("Forwarding to Django URL:", CONFIG.DJANGO_URL);

    const djangoResponse = await axios.post(
      `${CONFIG.DJANGO_URL}/routes/`,
      inputData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    // Send the Django response back to the client
    res.status(200).json(djangoResponse.data);
  } catch (error) {
    console.error("Error in Route Optimization Controller:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to process the route optimization request",
      error: error.message,
    });
  }
};
