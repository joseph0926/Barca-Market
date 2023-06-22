import request from "supertest";
import app from "../../app";

it("가입되지 않은 이메일 테스트", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({ email: "test@test.com", password: "password" })
    .expect(400);
});

it("비밀번호가 일치하지 않았을 때 테스트", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password", name: "test" })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({ email: "test@test.com", password: "password!!!!!!!" })
    .expect(401);
});

it("로그인 성공 후 쿠키 설정 테스트", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password", name: "test" })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({ email: "test@test.com", password: "password" })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});

it("이메일 확인되지 않은 계정 로그인 테스트", async () => {
  // 회원가입
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password", name: "test" })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({ email: "test@test.com", password: "password" })
    .expect(401);

  expect(response.body.message).toBe(
    "이메일 확인이 필요합니다. 이메일을 확인해주세요."
  );
});

it("이메일 확인 후 유효한 계정 로그인 테스트", async () => {
  // 회원가입
  const signupResponse = await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password", name: "test" })
    .expect(201);

  const verificationToken = signupResponse.body.verificationToken;

  // 이메일 확인 요청
  await request(app)
    .post("/api/users/verify-email")
    .send({ token: verificationToken })
    .expect(200);

  const response = await request(app)
    .post("/api/users/signin")
    .send({ email: "test@test.com", password: "password" })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
