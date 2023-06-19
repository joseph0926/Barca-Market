interface EmailInfo {
  name: string;
  email: string;
  verificationToken: string;
  origin: string;
}

interface SendEmailInfo {
  to: string;
  subject: string;
  html: string;
}

interface JwtUser {
  id: number;
  email: string;
}

interface UserPayload {
  id: string;
  email: string;
}
