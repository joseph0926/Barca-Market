import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from "@joseph0926-barcelona/common";
import { createCommentRouter } from "./routes/create-comment";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(currentUser);

app.use(createCommentRouter);

app.get("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export default app;
