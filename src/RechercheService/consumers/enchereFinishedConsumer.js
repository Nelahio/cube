const automapper = require("automapper-ts");
const configureRabbitMQ = require("../services/rabbitmqConfig");
const Produit = require("../models/produit");
const retry = require("async-retry");

const consumeEnchereFinished = async () => {
  try {
    // Configuration RabbitMQ
    const channel = await configureRabbitMQ();
    //Nom de l'exchange
    const exchange = "Contracts:EnchereFinished";
    // Nom de la file d'attente
    const queue = "recherche-auction-finished";
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
          const enchereFinished = JSON.parse(
            message.content.toString()
          ).message;
          console.log(
            `--> Consuming EnchereFinished : ${JSON.stringify(
              enchereFinished,
              null,
              2
            )}`
          );

          const produit = await Produit.findOne({
            _id: enchereFinished.auctionId,
          });

          if (enchereFinished.itemSold) {
            produit.winner = enchereFinished.winner;
            produit.soldAmount = enchereFinished.amount;
          }

          produit.status = "Finished";

          await retry(
            async (bail, attempt) => {
              console.log(
                `EnchereFinishedConsumer : Tentative de mise à jour du produit : ${attempt}`
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
      "EnchereFinishedConsumer : Erreur lors de la configuration du consumer:",
      error
    );
  }
};

module.exports = consumeEnchereFinished;
