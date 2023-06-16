import nodemailer from "nodemailer";

const nodemailerConfig = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "vpemfl0926@gmail.com",
    pass: "qwezxc1234!",
  },
};

export const sendEmail = async ({ to, subject, html }: SendEmailInfo) => {
  const transporter = nodemailer.createTransport(nodemailerConfig);

  return transporter.sendMail({
    from: '"vpemfl0926" <vpemfl0926@gmail.com>',
    to,
    subject,
    html,
  });
};
