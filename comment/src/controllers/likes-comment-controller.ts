// import { Request, Response } from "express";
// import mongoose from "mongoose";
// import { NotFoundError } from "@joseph0926-barcelona/common";
// import { Comment } from "../models/comment";

// export const likesComment = async (req: Request, res: Response) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();
//   try {
//     const comment = await Comment.findById(req.params.commentId);
//     if (!comment) {
//       throw new NotFoundError();
//     }

//     const userId = req.currentUser!.id;
//     const likeIndex = comment.likes.findIndex((id) => id === userId);

//     if (likeIndex === -1) {
//       comment.likes.push(userId);
//     } else {
//       comment.likes.splice(likeIndex, 1);
//     }

//     comment.totalLikes = comment.likes.length;

//     await comment.save();
//     await session.commitTransaction();

//     res.status(200).json({ message: "좋아요 상태가 변경되었습니다." });
//   } catch (error) {
//     if (session.inTransaction()) {
//       await session.abortTransaction();
//     }
//     console.log(error);
//   } finally {
//     session.endSession();
//   }
// };
