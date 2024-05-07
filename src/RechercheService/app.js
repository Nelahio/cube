const express = require("express");
const initializeDatabase = require("./data/database");
const produitRoutes = require("./routes/rechercheRoutes");
const consumeEnchereCreated = require("./consumers/enchereCreatedConsumer");
const consumeEnchereUpdated = require("./consumers/enchereUpdatedConsumer");
const consumeEnchereDeleted = require("./consumers/enchereDeletedConsumer");
const consumeOffreCreated = require("./consumers/offreCreatedConsumer");
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
      "Erreur lors du démarrage du consommateur EnchereCreated :",
      error
    )
  );

consumeEnchereUpdated()
  .then(() => console.log("Consommateur EnchereUpdated démarré avec succès."))
  .catch((error) =>
    console.error(
      "Erreur lors du démarrage du consommateur EnchereUpdated :",
      error
    )
  );

consumeEnchereDeleted()
  .then(() => console.log("Consommateur EnchereDeleted démarré avec succès."))
  .catch((error) =>
    console.error(
      "Erreur lors du démarrage du consommateur EnchereDeleted :",
      error
    )
  );

consumeOffreCreated()
  .then(() => console.log("Consommateur OffreCreated démarré avec succès."))
  .catch((error) =>
    console.error(
      "Erreur lors du démarrage du consommateur OffreCreated :",
      error
    )
  );

app.listen(port, () => console.log(`Server running on port ${port}`));
