const axios = require("axios");
require("dotenv").config();

const axiosInstance = axios.create({
  baseURL: process.env.ENCHERE_SERVICE_URL,
});

module.exports = axiosInstance;
