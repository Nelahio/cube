const automapper = require("automapper-ts");
const configureRabbitMQ = require("../services/rabbitmqConfig");

const consumeEnchereCreated = async () => {
  // Configuration RabbitMQ
  const channel = await configureRabbitMQ();
  // Nom de la file d'attente
  const queue = "enchere_created";

  await channel.assertQueue(queue, { durable: false });
  await channel.consume(
    queue,
    async (message) => {
      if (message !== null) {
        console.log(
          "--> Consuming enchere created:",
          message.content.toString()
        );
        const produit = automapper.map(
          "enchereCreated",
          "Produit",
          enchereCreated
        );

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
};

module.exports = consumeEnchereCreated;
