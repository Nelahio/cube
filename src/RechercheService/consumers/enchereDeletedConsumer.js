const configureRabbitMQ = require("../services/rabbitmqConfig");
const Produit = require("../models/produit");
const retry = require("async-retry");

const consumeEnchereDeleted = async () => {
  try {
    const channel = await configureRabbitMQ();
    const exchange = "Contracts:EnchereDeleted";
    const queue = "recherche-auction-deleted";
    const routingKey = "";

    await channel.assertExchange(exchange, "fanout", { durable: true });
    await channel.assertQueue(queue, { durable: true });
    await channel.bindQueue(queue, exchange, routingKey);
    await channel.consume(
      queue,
      async (message) => {
        if (message !== null) {
          try {
            const enchereDeleted = JSON.parse(
              message.content.toString()
            ).message;
            console.log(
              `--> Consuming EnchereDeleted : ${JSON.stringify(
                enchereDeleted,
                null,
                2
              )}`
            );

            await retry(
              async (bail, attempt) => {
                await Produit.findByIdAndDelete(enchereDeleted.id);
                console.log("Produit supprimé");
              },
              {
                retries: 5,
                factor: 2,
                minTimeout: 1000,
              }
            );

            channel.ack(message);
          } catch (error) {
            console.error("Erreur lors de la suppresion du produit : ", error);
            channel.nack(message, false, false);
          }
        }
      },
      { noAck: false }
    );
  } catch (error) {
    console.error("Erreur lors de la configuration du consumer :", error);
  }
};

module.exports = consumeEnchereDeleted;
