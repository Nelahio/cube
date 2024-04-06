const express = require('express');
const initializeDatabase = require('./Data/database');
const produitRoutes = require('./routes/produitRoutes');

const app = express();
const port = process.env.PORT || 3000;

initializeDatabase().catch(console.error);

app.use(express.json());

app.use('/api/produits', produitRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
