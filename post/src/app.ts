import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from "@joseph0926-barcelona/common";
import { createPostRouter } from "./routes/create-post";
import { getPostRouter } from "./routes/get-posts";
import { updatePostRouter } from "./routes/update-post";
import { deletePostRouter } from "./routes/delete-post";
import { likesRouter } from "./routes/likes-post";

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

app.use(createPostRouter);
app.use(getPostRouter);
app.use(updatePostRouter);
app.use(deletePostRouter);
app.use(likesRouter);

app.get("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export default app;
