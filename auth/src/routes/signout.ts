import express from "express";

const router = express.Router();

router.post("/api/users/signout", (req, res) => {
  req.session = null;
  res.status(201).json([{ message: "로그아웃에 성공하였습니다." }]);
});

export { router as signoutRouter };
