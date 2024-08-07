const Produit = require("../models/produit");
const {
  rechercheParams,
} = require("../services/requestHelpers/rechercheParams");

exports.rechercheProduits = async (req, res) => {
  try {
    const {
      searchTerm,
      category,
      state,
      status,
      make,
      color,
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

    if (category) {
      if (Array.isArray(category)) {
        conditions.category = {
          $in: category.map((c) => new RegExp("^" + c + "$", "i")),
        };
      } else {
        conditions.category = { $regex: new RegExp("^" + category + "$", "i") };
      }
    }

    if (state) {
      if (Array.isArray(state)) {
        conditions.state = {
          $in: state.map((s) => {
            switch (s) {
              case "neuf":
                return "New";
              case "comme neuf":
                return "LikeNew";
              case "bon état":
                return "GoodCondition";
              case "usé":
                return "Worn";
              default:
                return s;
            }
          }),
        };
      } else {
        switch (state) {
          case "neuf":
            conditions.state = "New";
            break;
          case "comme neuf":
            conditions.state = "LikeNew";
            break;
          case "bon état":
            conditions.state = "GoodCondition";
            break;
          case "usé":
            conditions.state = "Worn";
            break;
          default:
            conditions.state = state;
            break;
        }
      }
    }

    if (make) {
      if (Array.isArray(make)) {
        conditions.make = {
          $in: make.map((m) => new RegExp("^" + m + "$", "i")),
        };
      } else {
        conditions.make = { $regex: new RegExp("^" + make + "$", "i") };
      }
    }

    if (color) {
      if (Array.isArray(color)) {
        conditions.color = {
          $in: color.map((c) => new RegExp("^" + c + "$", "i")),
        };
      } else {
        conditions.color = { $regex: new RegExp("^" + color + "$", "i") };
      }
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
        case "scheduled":
          conditions.auctionStart = { $gt: now };
          break;
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
          conditions.auctionStart = { $lt: now };
          break;
      }
    }

    // Calcul du nombre total de résultats correspondants
    const totalCount = await Produit.countDocuments(conditions);

    // Construction de la requête avec pagination pour récupérer les résultats
    let query = Produit.find(conditions)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    // Tri selon le paramètre 'orderBy'
    switch (orderBy) {
      case "make":
        query = query.sort("make").sort("name");
        break;
      case "new":
        query = query.sort("-createdAt"); // "-" pour le tri décroissant
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
