const axiosInstance = require("../services/axiosInstance");
const Produit = require("../models/produit");

const enchereServiceUrl = process.env.ENCHERE_SERVICE_URL;

getProduitsForSearchDb = async () => {
  try {
    // Produit le plus récemment mis à jour
    const lastProduct = await Produit.findOne().sort({ updatedAt: -1 });
    const lastUpdated = lastProduct
      ? lastProduct.updatedAt.toISOString()
      : new Date(0).toISOString();

    // Produits mis à jour depuis cette date depuis le service d'enchères
    const response = await axiosInstance.get(
      `/api/encheres?date=${encodeURIComponent(lastUpdated)}`
    );

    const produitsData = response.data;

    for (const data of produitsData) {
      // Vérification que le produit existe déjà
      const existingProduit = await Produit.findOne({ _id: data.id });

      if (!existingProduit) {
        // Mappage
        const newProduit = new Produit({
          _id: data.id,
          reservePrice: data.reservePrice,
          seller: data.seller,
          winner: data.winner,
          soldAmount: data.soldAmount,
          currentHighBid: data.currentHighBid,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          auctionStart: data.auctionStart,
          auctionEnd: data.auctionEnd,
          status: data.status,
          make: data.make,
          name: data.name,
          year: data.year,
          color: data.color,
          description: data.description,
          imageUrl: data.imageUrl,
          category: data.category,
          state: data.state,
        });
        await newProduit.save();
      } else {
        // Mise à jour du produit s'il existe déjà et que updatedAt est différent
        if (existingProduit.updatedAt.toISOString() !== data.updatedAt) {
          await Produit.findOneAndUpdate(
            { _id: data.id },
            {
              make: data.make,
              name: data.name,
              year: data.year,
              color: data.color,
              category: data.category,
              description: data.description,
              imageUrl: data.imageUrl,
              state: data.state,
              updatedAt: data.updatedAt,
            },
            { new: true }
          );
        }
        console.log(`Produit avec l'ID ${data.id} existe déjà.`);
      }
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des produits:", error);
    throw error;
  }
};

module.exports = getProduitsForSearchDb;
