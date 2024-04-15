const amqp = require("amqplib");

const configureRabbitMQ = async () => {
  const connection = await amqp.connect(`amqp://${process.env.RABBITMQ_HOST}`);
  const channel = await connection.createChannel();

  console.log("RabbitMQ configuré avec succès");
  return channel;
};

module.exports = configureRabbitMQ;
