const automapper = require("automapper-ts");
const configureRabbitMQ = require("../services/rabbitmqConfig");
const Produit = require("../models/produit");
const os = require("os");

const publishErrorMessage = async (enchereCreated, exceptionMessage) => {
  try {
    const channel = await configureRabbitMQ();
    const exchange = "enchere-enchere-created-fault";
    const routingKey = "";

    await channel.assertExchange(exchange, "fanout", { durable: true });

    const message = {
      Message: enchereCreated,
      // Spécifiez le messageType pour un message de type Fault
      MessageType: [
        "urn:message:MassTransit:Fault:EnchereService.Contracts:EnchereCreated",
      ],
      // Incluez les détails de l'erreur ici
      Exceptions: [
        {
          ExceptionType: "System.ArgumentException",
          Message: exceptionMessage,
          // Ajoutez d'autres détails de l'exception si nécessaire
        },
      ],
      // Incluez d'autres champs nécessaires du message d'erreur ici
      Host: {
        MachineName: os.hostname(),
        ProcessName: process.title,
        ProcessId: process.pid,
        Assembly: "RechercheService",
        AssemblyVersion: "1.0.0",
        FrameworkVersion: `NodeJs ${process.version}`,
        MassTransitVersion: "N/A",
        OperatingSystemVersion: os.platform() + " " + os.release(),
      },
    };
    const messageJSON = JSON.stringify(message);
    const messageBuffer = Buffer.from(messageJSON);
    console.log(messageJSON, "BUFFER");

    // Publication du message d'erreur sur l'exchange de fault
    channel.publish(exchange, routingKey, messageBuffer, {
      contentType: "application/vnd.masstransit+json",
      persistent: true,
    });

    console.log("Message d'erreur publié avec succès");
  } catch (error) {
    console.error("Erreur lors de la publication du message d'erreur:", error);
  }
};

const consumeEnchereCreated = async () => {
  try {
    // Configuration RabbitMQ
    const channel = await configureRabbitMQ();
    //Nom de l'exchange
    const exchange = "EnchereService.Contracts:EnchereCreated";
    // Nom de la file d'attente
    const queue = "recherche-auction-created";
    const routingKey = "";

    await channel.assertExchange(exchange, "fanout", { durable: true });
    await channel.assertQueue(queue, { durable: true });
    await channel.bindQueue(queue, exchange, routingKey);
    console.log(
      `Binding créé entre l'exchange ${exchange} et la queue ${queue}`
    );
    await channel.consume(
      queue,
      async (message) => {
        try {
          if (message === null || message.fields === undefined) {
            console.error("Message ou message.fields est undefined");
            return;
          }
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

          if (produit.name === "Foo") {
            const exceptionMessage =
              "Impossible de vendre un produit avec le nom Foo";
            await publishErrorMessage(enchereCreated, exceptionMessage);
            channel.nack(message, false, false);
            return;
          }

          await retry(
            async (bail, attempt) => {
              await produit.save();
              console.log("Produit enregistré avec succès");
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
    console.log("Consumer est en écoute des enchères...");
  } catch (error) {
    console.error("Erreur lors de la configuration du consumer:", error);
  }
};

module.exports = consumeEnchereCreated;
