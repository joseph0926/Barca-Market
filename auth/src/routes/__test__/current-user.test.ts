import request from "supertest";
import app from "../../app";

it("현재 유저에 대한 상세 정보 응답 테스트", async () => {
  const cookie = await global.signin();

  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual("test@test.com");
  expect(response.body.currentUser.role).toEqual("USER");
});

it("인증되지 않은 유저에게 null을 반환하는 테스트", async () => {
  const response = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(200);

  expect(response.body.currentUser).toBeNull();
});
