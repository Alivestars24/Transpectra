//const { apiHandler } = require('./apiHandler');
const { CONFIG } = require('../constants/config');
const axios = require('axios');
/**
 * Fetch driver’s license details from Sarthi.
 * @param {string} licenseNo - The license number.
 * @param {string} driverName - The name of the driver.
 * @param {string} permit - The permit associated with the driver.
 * @returns {Promise<object>} - License details response.
 */
const getSarthiDetails = async (licenseNo,driverName,permit) => {
    const url = CONFIG.SARTHI_API.LICENSE_DETAILS; // Set this in your config
    const data = { licenseNo: licenseNo.toString(), driverName: driverName, permit: permit };
    
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
    

    module.exports = {
        getSarthiDetails
    };
    