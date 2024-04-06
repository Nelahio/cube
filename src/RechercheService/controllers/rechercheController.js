const Produit = require('../models/produit');

exports.rechercheProduits = async (req, res) => {
    try {
        const searchTerm = req.query.searchTerm;
        const pageNumber = parseInt(req.query.pageNumber, 10) || 1;
        const pageSize = parseInt(req.query.pageSize, 10) || 4;

        let query = Produit.find();

        if (searchTerm) {
            query = query.find({ $text: { $search: searchTerm } },
                { score: { $meta: "textScore" } })
                .sort({ score: { $meta: "textScore" } });
        } else {
            query = query.sort('Make');
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
