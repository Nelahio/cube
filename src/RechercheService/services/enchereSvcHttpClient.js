const axiosInstance = require("../services/axiosInstance");
const Produit = require("../models/produit");

const enchereServiceUrl = process.env.ENCHERE_SERVICE_URL;

getProduitsForSearchDb = async () => {
  try {
    const lastUpdated = await Produit.find()
      .sort({ updatedAt: -1 })
      .limit(1)
      .then((products) => products[0].updatedAt.toISOString());

    const response = await axiosInstance.get(
      `/api/encheres?date=${encodeURIComponent(lastUpdated)}`
    );
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des produits:", error);
    throw error;
  }
};

module.exports = getProduitsForSearchDb;
