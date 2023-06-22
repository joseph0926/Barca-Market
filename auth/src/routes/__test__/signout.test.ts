import request from "supertest";
import app from "../../app";

it("로그아웃 후 쿠키 초기화 테스트", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password", name: "test" })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signout")
    .send({})
    .expect(200);

  console.log(response.get("Set-Cookie"));
  expect(response.get("Set-Cookie")[0]).toEqual("express:sess=; path=/;");
});
