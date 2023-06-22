import { PrismaClient } from "@prisma/client";
import app from "./../app";
import request from "supertest";

declare global {
  var signin: () => Promise<string[]>;
}

const prisma = new PrismaClient();

beforeAll(async () => {
  process.env.JWT_SECRET = "superjwtsecret";
});

beforeEach(async () => {
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

global.signin = async () => {
  const email = "test@test.com";
  const password = "password";
  const name = "test";

  const response = await request(app)
    .post("/api/users/signup")
    .send({ email, password, name })
    .expect(201);

  const cookie = response.get("Set-Cookie");

  return cookie;
};
