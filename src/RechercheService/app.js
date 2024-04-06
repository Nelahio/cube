const express = require("express");
const initializeDatabase = require("./data/database");
const produitRoutes = require("./routes/rechercheRoutes");
const configureRabbitMQ = require("./services/rabbitmqConfig");

const app = express();
const port = process.env.PORT || 3000;

initializeDatabase().catch(console.error);

app.use(express.json());

app.use("/api/recherche", produitRoutes);

configureRabbitMQ()
  .then(() => console.log("RabbitMQ est prêt"))
  .catch((error) =>
    console.error("Erreur lors de la configuration de RabbitMQ:", error)
  );

app.listen(port, () => console.log(`Server running on port ${port}`));
