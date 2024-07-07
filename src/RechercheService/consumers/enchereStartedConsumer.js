const Produit = require("../models/produit");
const configureRabbitMQ = require("../services/rabbitmqConfig");
const retry = require("async-retry");

const consumeEnchereStarted = async (message) => {
  try {
    // Configuration RabbitMQ
    const channel = await configureRabbitMQ();
    //Nom de l'exchange
    const exchange = "Contracts:EnchereStarted";
    // Nom de la file d'attente
    const queue = "recherche-auction-started";
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
          const enchereStarted = JSON.parse(message.content.toString()).message;
          console.log(
            `--> Consuming EnchereStarted : ${JSON.stringify(
              enchereStarted,
              null,
              2
            )}`
          );

          const produit = await Produit.findOne({
            _id: enchereStarted.auctionId,
          });

          if (produit.auctionStart <= produit.updatedAt) {
            produit.status = "Live";
          }
          console.log(produit, "produit");
          console.log(enchereStarted, "enchereStarted");

          await retry(
            async (bail, attempt) => {
              console.log(
                `EnchereStartedConsumer : Tentative de mise à jour du produit : ${attempt}`
              );
              await produit.save();
              console.log("Produit enregistré");
            },
            {
              retries: 5,
              factor: 2,
              minTimeout: 10000,
            }
          );
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
      "EnchereStartedConsumer : Erreur lors de la configuration du consumer :",
      error
    );
  }
};

module.exports = consumeEnchereStarted;
