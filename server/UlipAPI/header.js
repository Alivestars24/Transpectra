const axios = require("axios");
const { CONFIG } = require("../constants/config");

// Configuration constants
const AUTH_URL = CONFIG.ULIP.url;
const USERNAME = CONFIG.ULIP.username;
const PASSWORD = CONFIG.ULIP.password;

let token = null;

/**
 * Validate the current token's expiration.
 * @returns {boolean} - True if the token is valid; otherwise, false.
 */
const isTokenValid = () => {
    if (!token) return false;

    try {
        const decoded = jwt.decode(token, { complete: true });
        return decoded && Date.now() < decoded.payload.exp * 1000;
    } catch (err) {
        logger.error(`Error validating token: ${err.message}`);
        return false;
    }
};

/**
 * Fetch a new authentication token from the API.
 * @returns {Promise<string>} - Resolves to the token or an empty string if failed.
 */
const fetchToken = async () => {
    try {
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

        const newToken = response.data.response.id;
        if (newToken) {
            token = newToken;
            logger.info("Token fetched successfully.");
            return newToken;
        } else {
            logger.error("No token found in the response.");
            return "";
        }
    } catch (error) {
        logger.error(`Error fetching token: ${error.response?.data || error.message}`);
        return "";
    }
};

/**
 * Get common headers for API requests.
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
            await fetchToken();
        }
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        } else {
            logger.error("Failed to include token in headers.");
        }
    }

    return headers;
};

module.exports = {
    getHeaders,
};
