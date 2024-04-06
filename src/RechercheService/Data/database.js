const fs = require('fs').promises;
const mongoose = require('mongoose');
const Produit = require('../models/produit');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Database connection failed: ', err.message);
    }
};

const initializeDatabase = async () => {
    await connectDB().then(async () => {
        try {
            const result = await Produit.createIndexes();
            console.log('Indexes créés :', result);
        } catch (error) {
            console.error('Erreur lors de la création des indexes :', error);
        }
    });

    const count = await Produit.countDocuments();

    if (count === 0) {
        console.log("Pas de données - en attente des données");
        const produitData = await fs.readFile("Data/encheres.json", "utf8");

        const produits = JSON.parse(produitData);

        await Produit.insertMany(produits);
        console.log("Base de données initialisée avec les données des produits", produits);
    }
}

module.exports = initializeDatabase;