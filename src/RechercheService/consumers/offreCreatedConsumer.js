const automapper = require("automapper-ts");
const configureRabbitMQ = require("../services/rabbitmqConfig");
const Produit = require("../models/produit");
const retry = require("async-retry");

const consumeOffreCreated = async () => {
  try {
    // Configuration RabbitMQ
    const channel = await configureRabbitMQ();
    //Nom de l'exchange
    const exchange = "OffreService.Contracts:OffreCreated";
    // Nom de la file d'attente
    const queue = "recherche-offre-created";
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
          const offreCreated = JSON.parse(message.content.toString()).message;
          console.log(
            `--> Consuming OffreCreated : ${JSON.stringify(
              offreCreated,
              null,
              2
            )}`
          );

          const produit = await Produit.findOne({ _id: bidPlaced.AuctionId });

          await retry(
            async (bail, attempt) => {
              if (
                offreCreated.BidStatus.includes("Accepted") &&
                offreCreated.Amount > produit.currentHighBid
              ) {
                produit.currentHighBid = offreCreated.Amount;
                await produit.save();
              }
            },
            {
              retries: 5,
              factor: 2,
              minTimeout: 1000,
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
    console.error("Erreur lors de la configuration du consumer:", error);
  }
};

module.exports = consumeOffreCreated;
