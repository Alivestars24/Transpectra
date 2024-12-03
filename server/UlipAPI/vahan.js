const { CONFIG } = require('../constants/config');
const axios = require('axios');
/**
 * Fetch vehicle registration details from Vahan.
 * @param {string} vehiclenumber - The vehicle number (registration number).
 * @param {string} ownername - The name of the vehicle owner.
 * @param {string} chasisnumber - The vehicle's chassis number.
 * @param {string} enginenumber - The vehicle's engine number.
 * @returns {Promise<object>} - Vehicle registration details response.
 */
const getVahanDetails = async (vehiclenumber, ownername, chasisnumber, enginenumber) => {
    const url = CONFIG.VAHAN_API.REGISTRATION_DETAILS; // Set this in your config
    const data = { 
        vehiclenumber: vehiclenumber.toString(), 
        ownername: ownername, 
        chasisnumber: chasisnumber, 
        enginenumber: enginenumber 
    };

    try {
        const headers = await getHeaders(true); // Get headers with token
        const response = await axios.post(url, data, { headers });

        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        return {
            success: false,
            message: error.response ? error.response.data : error.message
        };
    }
};

module.exports = { getVahanDetails };
