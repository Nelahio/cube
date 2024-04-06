const axios = require("axios");
const axiosRetry = require("axios-retry").default;
require("dotenv").config();

const axiosInstance = axios.create({
  baseURL: process.env.ENCHERE_SERVICE_URL,
});

axiosRetry(axiosInstance, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    return axiosRetry.isRetryableError(error) || error.response.status === 404;
  },
});

module.exports = axiosInstance;
