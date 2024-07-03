const amqp = require("amqplib");

// Configure RabbitMQ connection
const configureRabbitMQ = async () => {
  try {
    // Connect to RabbitMQ
    const connection = await amqp.connect({
      protocol: "amqp",
      hostname: process.env.RABBITMQ_HOST,
      port: 5672,
      username: process.env.RABBITMQ_USERNAME,
      password: process.env.RABBITMQ_PASSWORD,
      vhost: "/",
    });
    // Create a channel
    const channel = await connection.createChannel();

    console.log("RabbitMQ configuré avec succès");
    return channel;
  } catch (error) {
    console.error("Erreur lors de la configuration de RabbitMQ :", error);
    throw error;
  }
};

module.exports = configureRabbitMQ;
