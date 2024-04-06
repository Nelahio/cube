const Produit = require('../models/produit');
const { rechercheParams } = require('../services/requestHelpers/rechercheParams');

exports.rechercheProduits = async (req, res) => {
    try {
        const { searchTerm, pageNumber, pageSize, seller, winner, orderBy, filterBy } = rechercheParams(req);
        let query = Produit.find();

        if (searchTerm) {
            query = query.find({ $text: { $search: searchTerm } },
                { score: { $meta: "textScore" } })
                .sort({ score: { $meta: "textScore" } });
        }

        if (seller) {
            query = query.find({ seller: seller });
        }
        if (winner) {
            query = query.find({ winner: winner });
        }

        // Tri selon le paramètre 'orderBy'
        switch (orderBy) {
            case 'make':
                query = query.sort('make');
                break;
            case 'new':
                query = query.sort('createdAt');
                break;
            default:
                query = query.sort('auctionEnd');
                break;
        }
        console.log(filterBy);
        // Filtrage selon le paramètre 'filterBy'
        const now = new Date();
        if (filterBy) {

            switch (filterBy) {
                case 'finished':
                    query = query.find({ auctionEnd: { $lt: now } });
                    break;
                case 'endingSoon':
                    query = query.find({ auctionEnd: { $lt: new Date(now.getTime() + 6 * 60 * 60 * 1000), $gt: now } });
                    break;
                default:
                    query = query.find({ auctionEnd: { $gt: now } });
                    break;
            }
        }

        // Calcul pour la pagination
        const skip = (pageNumber - 1) * pageSize;
        query = query.skip(skip).limit(pageSize);

        // Exécution de la requête avec pagination
        const results = await query.exec();

        // Calcul du nombre total de documents pour déterminer le nombre de pages
        const totalCount = await Produit.countDocuments(searchTerm ? { $text: { $search: searchTerm } } : {});

        res.json({
            results,
            pageCount: Math.ceil(totalCount / pageSize),
            totalCount
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
