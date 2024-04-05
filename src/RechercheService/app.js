const express = require('express');
const connectDB = require('./database');
const produitRoutes = require('./routes/produitRoutes');
const Produit = require('./models/produit');

const app = express();
const port = process.env.PORT || 3000;

async function initializeDatabase() {
    await connectDB().then(async () => {
        try {
            const result = await Produit.createIndexes();
            console.log('Indexes créés :', result);
        } catch (error) {
            console.error('Erreur lors de la création des indexes :', error);
        }
    });
}

initializeDatabase();



app.use(express.json());

app.use('/api/produits', produitRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
