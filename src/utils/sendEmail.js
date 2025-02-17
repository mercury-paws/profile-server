import nodemailer from 'nodemailer';
import 'dotenv/config';

const {SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD} =
  process.env;

const nodemailerConfig = {
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: true,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, // 🔥 Fix self-signed certificate issue
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmailtoCheckComment = (data) => {
  const email = { ...data, from: SMTP_USER };
  return transport.sendMail(email);
};

export default sendEmailtoCheckComment;