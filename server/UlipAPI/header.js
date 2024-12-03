const axios = require("axios");
const jwt = require("jsonwebtoken");
const { CONFIG } = require("../constants/config");

// Configuration constants
const AUTH_URL = CONFIG.ULIP.url;
const USERNAME = CONFIG.ULIP.username;
const PASSWORD = CONFIG.ULIP.password;

// Global token variable
let token = null;

/**
 * Validate the token's properties based on the payload.
 * @param {string} token - The JWT token to validate.
 * @returns {boolean} - True if the token is valid; otherwise, false.
 */
const isTokenValid = () => {
    if (!token) return false;

    try {
        const decoded = jwt.decode(token);
        if (!decoded) return false;

        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

        // Validate 'iat' (issued at) and ensure it's not in the future
        if (!decoded.iat || decoded.iat > currentTime) {
            console.error("Invalid 'iat' in token.");
            return false;
        }

        return true;
    } catch (err) {
        return false;
    }
};

/**
 * Fetch a new authentication token from the API.
 * @returns {Promise<string>} - Resolves to the token or an empty string if failed.
 */
const fetchToken = async () => {
    try {
        console.log("token api called")
        const response = await axios.post(
            AUTH_URL,
            { username: USERNAME, password: PASSWORD },
            {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            }
        );

        console.log("this is response token",response.data)

        const newToken = response?.data?.response?.id;
        if (newToken) {
            token = newToken;
            return newToken;
        } else {
            return "";
        }
    } catch (error) {
        return "";
    }
};

/**
 * Get headers for API requests.
 * @param {boolean} isTokenRequired - Whether the token is required in the headers.
 * @returns {Promise<object>} - Resolves to the headers object.
 */
const getHeaders = async (isTokenRequired = true) => {
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
    };

    if (isTokenRequired) {
        if (!isTokenValid()) {
            console.log("Token is invalid or expired. Fetching a new token...");
            await fetchToken();
        }
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        } else {
            console.warn("Authorization token is unavailable.");
        }
    }

    return headers;
};

module.exports = {
    getHeaders,
};
