const automapper = require("automapper-ts");
const configureRabbitMQ = require("../services/rabbitmqConfig");
const Produit = require("../models/produit");

const consumeEnchereCreated = async () => {
  // Configuration RabbitMQ
  const channel = await configureRabbitMQ();
  //Nom de l'exchange
  const exchange = "EnchereService.Contracts:EnchereCreated";
  // Nom de la file d'attente
  const queue = "search-auction-created";
  const routingKey = "";

  await channel.assertExchange(exchange, "fanout", { durable: true });
  await channel.assertQueue(queue, { durable: true });
  await channel.bindQueue(queue, exchange, routingKey);
  console.log(`Binding créé entre l'exchange ${exchange} et la queue ${queue}`);
  await channel.consume(
    queue,
    async (message) => {
      if (message !== null) {
        console.log(
          "--> Consuming enchere created:",
          message.content.toString()
        );
        const enchereCreated = JSON.parse(message.content.toString()).message;
        console.log("Enchère reçue:", enchereCreated);
        const produitData = automapper.map(
          "EnchereCreated",
          "Produit",
          enchereCreated
        );
        const produit = new Produit(produitData);
        try {
          await produit.save();
          console.log("Produit enregistré avec succès");
        } catch (error) {
          console.error("Erreur lors de l'enregistrement du produit:", error);
        }

        channel.ack(message);
      }
    },
    { noAck: false }
  );
  console.log("Consumer est en écoute des enchères...");
};

module.exports = consumeEnchereCreated;
