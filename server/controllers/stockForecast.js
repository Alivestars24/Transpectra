const axios = require("axios");
const { CONFIG } = require("../constants/config");

// Forecast Controller
exports.getForecast = async (req, res) => {
  try {
    
    const inputData = req.body; // Retrieve JSON data from the request body
    console.log(CONFIG.DJANGO_URL);

    const djangoResponse = await axios.post(
      `${CONFIG.DJANGO_URL}/forecast/`,
      inputData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    // Send the Django response back to the client
    res.status(200).json(djangoResponse.data);
  } catch (error) {
    console.error("Error in Forecast Controller:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to process the forecast request",
      error: error.message,
    });
  }
};

