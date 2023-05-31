import { rest } from "msw";

export const handlers = [
  rest.get("/user/:id", (req, res, ctx) => {
    return res(
      ctx.json({
        id: "1",
        username: "dummy user",
        email: "dummy@example.com",
      })
    );
  }),
];
