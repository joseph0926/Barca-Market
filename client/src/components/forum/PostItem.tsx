import { useAppSelect } from "@/src/hooks/useReduxHook";
import { FaHeart, FaLock, FaComment } from "react-icons/fa";
import { PostItemWrapper } from "./PostItemStyle";

const PostItem = (post: Post): JSX.Element => {
  const { mode } = useAppSelect((state) => state.ui);

  return (
    <PostItemWrapper mode={mode}>
      <div className="post-content">{post.content}</div>
      <div className="post-info">
        <div className="likes">
          <FaHeart /> {post.totalLikes}
        </div>
        {post.isPrivate && (
          <div className="private-indicator">
            <FaLock />
            <span>Private</span>
          </div>
        )}
        <div className="comments">
          <FaComment />
          {post.totalComments}
        </div>
      </div>
    </PostItemWrapper>
  );
};

export default PostItem;
