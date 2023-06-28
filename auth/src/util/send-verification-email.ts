/// <reference path="../@types/index.d.ts" />

import { sendEmail } from "./send-email";

export const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}: EmailInfo) => {
  const verifyEmail = `${origin}/sign/verify-email?token=${verificationToken}&email=${email}`;

  const message = `<p>링크를 클릭하여 이메일 인증을 완료해주세요 : <a href="${verifyEmail}">이메일 인증 링크</a> </p>`;

  return sendEmail({
    to: email,
    subject: "이메일 인증",
    html: `<h4>안녕하세요! ${name}님</h4>
  ${message}`,
  });
};
