import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "localhost",
  port: parseInt(process.env.SMTP_PORT || "1025"),
});

export const defaultSender =
  process.env.DEFAULT_SENDER_EMAIL || "admin@example.com";

export const RABBIT_MQ = {
  HOST: process.env.RABBIT_MQ_HOST || "localhost",
  PORT: process.env.RABBIT_MQ_PORT ? process.env.RABBIT_MQ_PORT : 5672,
  USER: process.env.RABBIT_MQ_USER || "admin",
  PASSWORD: process.env.RABBIT_MQ_PASS || "admin",
};
