import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();

const pass = process.env.EMAIL_PASS!;

const nodemailerConfig = {
  service: "naver",
  host: "smtp.naver.com",
  port: 587,
  secure: false,
  auth: {
    user: "joseph0926",
    pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
};

export const sendEmail = async ({ to, subject, html }: SendEmailInfo) => {
  const transporter = nodemailer.createTransport(nodemailerConfig);

  return transporter.sendMail({
    from: "joseph0926@naver.com",
    to,
    subject,
    html,
  });
};
