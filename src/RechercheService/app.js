const express = require("express");
const initializeDatabase = require("./data/database");
const produitRoutes = require("./routes/rechercheRoutes");
const consumeEnchereCreated = require("./consumers/enchereCreatedConsumer");
const consumeEnchereUpdated = require("./consumers/enchereUpdatedConsumer");
const consumeEnchereDeleted = require("./consumers/enchereDeletedConsumer");
const consumeOffreCreated = require("./consumers/offreCreatedConsumer");
const consumeEnchereFinished = require("./consumers/enchereFinishedConsumer");
const retry = require("async-retry");
require("./services/requestHelpers/mappingProfiles");

const app = express();
const port = process.env.PORT || 3000;

initializeDatabase().catch(console.error);

app.use(express.json());

app.use("/api/recherche", produitRoutes);

const startConsumers = async () => {
  await retry(consumeEnchereCreated, { retries: 3, factor: 2, delay: 5000 });
  console.log("Consommateur EnchereCreated démarré avec succès.");

  await retry(consumeEnchereUpdated, { retries: 3, factor: 2, delay: 5000 });
  console.log("Consommateur EnchereUpdated démarré avec succès.");

  await retry(consumeEnchereDeleted, { retries: 3, factor: 2, delay: 5000 });
  console.log("Consommateur EnchereDeleted démarré avec succès.");

  await retry(consumeOffreCreated, { retries: 3, factor: 2, delay: 5000 });
  console.log("Consommateur OffreCreated démarré avec succès.");

  await retry(consumeEnchereFinished, { retries: 3, factor: 2, delay: 5000 });
  console.log("Consommateur EnchereFinished démarré avec succès.");
};

app.listen(port, () => console.log(`Server running on port ${port}`));

try {
  startConsumers();
} catch (error) {
  console.error("Erreur lors du démarrage des consumers", error);
}
