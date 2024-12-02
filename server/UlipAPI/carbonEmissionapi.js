const axios = require('axios');
const { getHeaders } = require('./header');
const { CONFIG } = require('../constants/config');

/**
 * Fetch carbon emission details for a specific configuration.
 * 
 * @param {number} distance - Distance traveled.
 * @param {string} vehicleType - Type of vehicle.
 * @param {string} fuelType - Type of fuel.
 * @param {number} noOfTrips - Number of trips.
 * @returns {Promise<object>} - Resolves to emission details or error message.
 */
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

/**
 * Fetch carbon emission details for all permutations of vehicle types and fuel types.
 * 
 * @param {number} distance - Fixed distance traveled.
 * @returns {Promise<Array>} - Resolves to an array of all emission details.
 */
const getCarbonEmissionDetails = async (distance) => {
    const noOfTrips = 1;
    const vehicleTypes = [
        "Small Commercial Vehicles",
        "Light Commercial Vehicles - Rigid Trucks",
        "Intermediate Commercial Vehicles - Rigid Trucks",
        "Medium Commercial Vehicles - Rigid Trucks",
        "Heavy Commercial Vehicles - Rigid Trucks",
        "Ultra Heavy Commercial Vehicles - Rigid Trucks",
        "Tractor Trailer Commercial Vehicles - Trailers"
    ];
    const fuelTypes = ["Diesel", "Petrol", "CNG", "Electric"];

    const promises = vehicleTypes.flatMap(vehicleType =>
        fuelTypes.map(fuelType =>
            getCarbonEmission(distance, vehicleType, fuelType, noOfTrips)
        )
    );

 
    const results = await Promise.all(promises);
    return results;
};

module.exports = {
    getCarbonEmissionDetails
};
