const express = require("express");
const initializeDatabase = require("./data/database");
const produitRoutes = require("./routes/rechercheRoutes");
const configureRabbitMQ = require("./services/rabbitmqConfig");
const consumeEnchereCreated = require("./consumers/enchereCreatedConsumer");
require("./services/requestHelpers/mappingProfiles");

const app = express();
const port = process.env.PORT || 3000;

initializeDatabase().catch(console.error);

app.use(express.json());

app.use("/api/recherche", produitRoutes);

consumeEnchereCreated()
  .then(() => console.log("Consommateur EnchereCreated démarré avec succès."))
  .catch((error) =>
    console.error(
      "Erreur lors du démarrage du consommateur EnchereCreated:",
      error
    )
  );

app.listen(port, () => console.log(`Server running on port ${port}`));
