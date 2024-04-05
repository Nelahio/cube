const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Database connection failed: ', err.message);
    }
};

module.exports = connectDB;