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
import { getCommentRouter } from "./routes/get-comments";
import { updateCommentRouter } from "./routes/update-comment";
import { deleteCommentRouter } from "./routes/delete-comment";
// import { likesCommentRouter } from "./routes/likes-comment";
// import { reportCommentRouter } from "./routes/report-comment";

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
app.use(getCommentRouter);
app.use(updateCommentRouter);
app.use(deleteCommentRouter);
// app.use(likesCommentRouter);
// app.use(reportCommentRouter);

app.get("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export default app;
