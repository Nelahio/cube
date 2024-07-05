const automapper = require("automapper-ts");
const configureRabbitMQ = require("../services/rabbitmqConfig");
const Produit = require("../models/produit");
const retry = require("async-retry");

const consumeEnchereCreated = async () => {
  try {
    // Configuration RabbitMQ
    const channel = await configureRabbitMQ();
    //Nom de l'exchange
    const exchange = "Contracts:EnchereCreated";
    // Nom de la file d'attente
    const queue = "recherche-auction-created";
    const routingKey = "";

    await channel.assertExchange(exchange, "fanout", { durable: true });
    await channel.assertQueue(queue, { durable: true });
    await channel.bindQueue(queue, exchange, routingKey);
    await channel.consume(
      queue,
      async (message) => {
        try {
          if (message === null || message.fields === undefined) {
            console.error("Message ou message.fields est undefined");
            return;
          }
          const enchereCreated = JSON.parse(message.content.toString()).message;
          console.log(
            `--> Consuming EnchereCreated : ${JSON.stringify(
              enchereCreated,
              null,
              2
            )}`
          );

          const produitData = automapper.map(
            "EnchereCreated",
            "Produit",
            enchereCreated
          );
          const produit = new Produit(produitData);

          if (enchereCreated.auctionStart > enchereCreated.updatedAt) {
            produit.status = "Scheduled";
          }

          await retry(
            async (bail, attempt) => {
              console.log(
                `EnchereCreatedConsumer : Tentative de création du produit : ${attempt}`
              );
              await produit.save();
              console.log("Produit créé");
            },
            {
              retries: 5,
              factor: 2,
              minTimeout: 10000,
            }
          );

          channel.ack(message);
        } catch (error) {
          console.log("Erreur lors du traitement du message :", error);
          if (message && message.fields) {
            channel.nack(message, false, false);
          }
        }
      },
      { noAck: false }
    );
  } catch (error) {
    console.error(
      "EnchereCreatedConsumer : Erreur lors de la configuration du consumer :",
      error
    );
  }
};

module.exports = consumeEnchereCreated;
