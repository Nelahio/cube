const amqp = require("amqplib");

async function configureRabbitMQ() {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  const queue = "hello";
  await channel.assertQueue(queue, { durable: false });

  // Plus de configurations peuvent être ajoutées ici

  console.log("RabbitMQ configuré avec succès");
}

module.exports = configureRabbitMQ;