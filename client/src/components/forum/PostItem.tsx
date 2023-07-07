import { useAppSelect } from "@/src/hooks/useReduxHook";
import { FaHeart, FaLock, FaComment } from "react-icons/fa";
import { PostItemWrapper } from "./PostItemStyle";
import Link from "next/link";

const PostItem = ({ post }: PostProps): JSX.Element => {
  const { mode } = useAppSelect((state) => state.ui);

  return (
    <PostItemWrapper mode={mode}>
      <Link href={`/forum/post/${post.id}`} className="option">
        자세히보기
      </Link>
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
