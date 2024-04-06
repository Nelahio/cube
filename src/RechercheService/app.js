const express = require('express');
const initializeDatabase = require('./data/database');
const produitRoutes = require('./routes/rechercheRoutes');

const app = express();
const port = process.env.PORT || 3000;

initializeDatabase().catch(console.error);

app.use(express.json());

app.use('/api/recherche', produitRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
