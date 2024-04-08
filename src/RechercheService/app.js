const express = require("express");
const initializeDatabase = require("./data/database");
const produitRoutes = require("./routes/rechercheRoutes");
const configureRabbitMQ = require("./services/rabbitmqConfig");
const consumeEnchereCreated = require("./consumers/enchereCreatedConsumer");

const app = express();
const port = process.env.PORT || 3000;

initializeDatabase().catch(console.error);

app.use(express.json());

app.use("/api/recherche", produitRoutes);

consumeEnchereCreated()
  .then(() => console.log("Consommateur démarré avec succès."))
  .catch((error) =>
    console.error("Erreur lors du démarrage du consommateur:", error)
  );

app.listen(port, () => console.log(`Server running on port ${port}`));
