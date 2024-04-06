const Produit = require('../models/produit');

exports.rechercheProduits = async (req, res) => {
    try {
        const searchTerm = req.query.searchTerm;
        let query = Produit.find();

        if (searchTerm) {
            query = query.find({ $text: { $search: searchTerm } }).sort({ score: { $meta: "textScore" } });
        } else {
            query = query.sort('Make');
        }

        const result = await query.exec();
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
