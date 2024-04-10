const Produit = require("../models/produit");
const {
  rechercheParams,
} = require("../services/requestHelpers/rechercheParams");

exports.rechercheProduits = async (req, res) => {
  try {
    const {
      searchTerm,
      pageNumber,
      pageSize,
      seller,
      winner,
      orderBy,
      filterBy,
    } = rechercheParams(req);
    let conditions = {};

    if (searchTerm) {
      conditions.$text = { $search: searchTerm };
    }

    if (seller) {
      conditions.seller = seller;
    }
    if (winner) {
      conditions.winner = winner;
    }

    const now = new Date();
    if (filterBy) {
      switch (filterBy) {
        case "finished":
          conditions.auctionEnd = { $lt: now };
          break;
        case "endingSoon":
          conditions.auctionEnd = {
            $lt: new Date(now.getTime() + 6 * 60 * 60 * 1000),
            $gt: now,
          };
          break;
        default:
          conditions.auctionEnd = { $gt: now };
          break;
      }
    }

    // Calculez le nombre total de résultats correspondants
    const totalCount = await Produit.countDocuments(conditions);

    // Construisez la requête avec pagination pour récupérer les résultats
    let query = Produit.find(conditions).skip((pageNumber - 1) * pageSize).limit(pageSize);

    // Tri selon le paramètre 'orderBy'
    switch (orderBy) {
      case "make":
        query = query.sort("make");
        break;
      case "new":
        query = query.sort("-createdAt"); // Notez le "-" pour le tri décroissant
        break;
      default:
        query = query.sort("auctionEnd");
        break;
    }

    // Exécution de la requête avec pagination
    const results = await query.exec();
    res.json({
      results,
      pageCount: Math.ceil(totalCount / pageSize),
      totalCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
