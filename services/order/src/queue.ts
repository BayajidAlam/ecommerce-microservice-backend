import amqp from "amqplib";
import {  RABBIT_MQ } from "./config";

const sendToQueue = async (queue: string, message: string) => {
  const connection = await amqp.connect({
    protocol: "amqp",
    hostname: RABBIT_MQ.HOST,
    port: RABBIT_MQ.PORT,
    username: RABBIT_MQ.USER,
    password: RABBIT_MQ.PASSWORD,
  });

  const channel = await connection.createChannel();

  const exchange = "order";
  await channel.assertExchange(exchange, "direct", { durable: true });

  channel.publish(exchange, queue, Buffer.from(message));
  console.log(`[queue]: Sent ${message} to ${queue}`);

  setTimeout(() => {
    connection.close();
  }, 500);
};

export default sendToQueue;
