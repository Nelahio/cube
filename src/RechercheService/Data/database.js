const fs = require("fs").promises;
const mongoose = require("mongoose");
const Produit = require("../models/produit");
const getProduitsForSearchDb = require("../services/enchereSvcHttpClient");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Database connection failed: ", err.message);
  }
};

const initializeDatabase = async () => {
  await connectDB().then(async () => {
    try {
      await Produit.createIndexes();
      console.log("Indexes créés");
    } catch (error) {
      console.error("Erreur lors de la création des indexes :", error);
    }
  });

  const produits = await getProduitsForSearchDb();

  if (produits?.length > 0) {
    console.log(produits.length + " retournés du service des enchères.");
    await Produit.insertMany(produits);
  }
};

module.exports = initializeDatabase;
