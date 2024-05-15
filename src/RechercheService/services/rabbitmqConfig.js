const amqp = require("amqplib");

// Configure RabbitMQ connection
const configureRabbitMQ = async () => {
  try {
    // Connect to RabbitMQ
    const connection = await amqp.connect(
      `amqp://${process.env.RABBITMQ_HOST}`
    );

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
