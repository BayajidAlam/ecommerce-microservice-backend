import amqp from "amqplib";
import redis from "./redis";
import { RABBIT_MQ } from "./config";

const receiveFromQueue = async (
  queue: string,
  callback: (message: string) => void
) => {
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

  const q = await channel.assertQueue(queue, { durable: true });
  await channel.bindQueue(q.queue, exchange, queue);

  channel.consume(
    q.queue,
    (msg) => {
      if (msg) {
        callback(msg.content.toString());
      }
    },
    { noAck: true }
  );
};

receiveFromQueue("clear-cart", (msg) => {
  console.log("Received from queue: clear-cart");
  const parsedMessage = JSON.parse(msg);

  const cartSessionId = parsedMessage.cartSessionId;
  redis.del(`session:${cartSessionId}`);
  redis.del(`cart:${cartSessionId}`);

  console.log("Cart cleared");
});
