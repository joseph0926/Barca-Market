import React from "react";
import { useAppDispatch } from "@/src/hooks/useReduxHook";
// import { deletePost } from '../redux/actions/postActions';
import { PostWrapper } from "./PostComStyle";

const Post = ({ post }: PostProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const deleteHandler = () => {};

  return (
    <PostWrapper>
      <h3>{post.content.substring(0, 50) + "..."}</h3>
      <p>{post.likes.length} likes</p>
      <p>{post.totalComments} comments</p>
      <button onClick={deleteHandler}>Delete</button>
    </PostWrapper>
  );
};

export default Post;
