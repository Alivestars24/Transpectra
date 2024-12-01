const axios = require('axios');
const { getHeaders } = require('./header'); 
const { CONFIG } = require('../constants/config');

const getCarbonEmission = async (distance, vehicleType, fuelType, noOfTrips) => {
    const url = CONFIG.ULIP_API.CARBON_EMISSION;
    
    const data = {
        distance: distance.toString(),
        vehicleType,
        fuelType,
        noOfTrips: noOfTrips.toString()
    };

    try {
        const headers = await getHeaders(true); 
        
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


module.exports={
    getCarbonEmission
}