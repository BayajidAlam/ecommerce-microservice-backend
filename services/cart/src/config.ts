import dotenv from "dotenv";
dotenv.config({
  path: ".env",
});

export const REDIS_PORT = process.env.REDIS_PORT
  ? parseInt(process.env.REDIS_PORT)
  : 6379;
export const REDIS_HOST = process.env.REDIS_HOST || "localhost";

export const CART_TTL = process.env.CART_TTL
  ? parseInt(process.env.CART_TTL)
  : 900;

export const INVENTORY_SERVICE =
  process.env.INVENTORY_SERVICE_URL || "http://localhost:4002";

export const RABBIT_MQ = {
  HOST: process.env.RABBIT_MQ_HOST || "localhost",
  PORT: process.env.RABBIT_MQ_PORT ? process.env.RABBIT_MQ_PORT : 5672,
  USER: process.env.RABBIT_MQ_USER || "admin",
  PASSWORD: process.env.RABBIT_MQ_PASS || "admin",
};
