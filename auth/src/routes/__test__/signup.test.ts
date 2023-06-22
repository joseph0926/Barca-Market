import request from "supertest";
import app from "../../app";

it("이메일 확인되지 않은 계정 로그인 테스트", async () => {
  const signupResponse = await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password", name: "test" })
    .expect(200);

  const verificationToken = signupResponse.body.verificationToken;

  const response = await request(app)
    .post("/api/users/signin")
    .send({ email: "test@test.com", password: "password", name: "test" })
    .expect(401);

  expect(response.body.error).toBe(
    "이메일 확인이 필요합니다. 이메일을 확인해주세요."
  );
});

it("이메일 확인 후 유효한 계정 로그인 테스트", async () => {
  const signupResponse = await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password", name: "test" })
    .expect(200);

  const verificationToken = signupResponse.body.verificationToken;

  const response = await request(app)
    .post("/api/users/signin")
    .send({ email: "test@test.com", password: "password", verificationToken })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});

it("이메일 중복 테스트", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password", name: "test" })
    .expect(200);

  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password", name: "test" })
    .expect(400);
});
