const automapper = require("automapper-ts");
const configureRabbitMQ = require("../services/rabbitmqConfig");
const Produit = require("../models/produit");
const retry = require("async-retry");

const consumeEnchereUpdated = async () => {
  try {
    const channel = await configureRabbitMQ();
    const exchange = "Contracts:EnchereUpdated";
    const queue = "recherche-auction-updated";
    const routingKey = "";

    await channel.assertExchange(exchange, "fanout", { durable: true });
    await channel.assertQueue(queue, { durable: true });
    await channel.bindQueue(queue, exchange, routingKey);
    await channel.consume(
      queue,
      async (message) => {
        if (message !== null) {
          try {
            const enchereUpdated = JSON.parse(
              message.content.toString()
            ).message;
            console.log(
              `--> Consuming EnchereUpdated : ${JSON.stringify(
                enchereUpdated,
                null,
                2
              )}`
            );

            const produitData = automapper.map(
              "EnchereUpdated",
              "Produit",
              enchereUpdated
            );

            await retry(
              async (bail, attempt) => {
                console.log(
                  `EnchereUpdatedConsumer : Tentative de mise à jour du produit : ${attempt}`
                );
                await Produit.findByIdAndUpdate(enchereUpdated.id, produitData);
                console.log("Produit mis à jour");
              },
              {
                retries: 5,
                factor: 2,
                minTimeout: 10000,
              }
            );

            channel.ack(message);
          } catch (error) {
            console.error("Erreur lors de la mise à jour du produit : ", error);
            channel.nack(message, false, false);
          }
        }
      },
      { noAck: false }
    );
  } catch (error) {
    console.error(
      "EnchereUpdatedConsumer : Erreur lors de la configuration du consumer : ",
      error
    );
  }
};

module.exports = consumeEnchereUpdated;
