import { useGetPostsQuery } from "@/src/store/store";
import PostForm from "./PostForm";
import PostItem from "./PostItem";
import { PostListWrapper } from "./PostListStyle";
import Loading from "../layouts/Loading";
import { useAppSelect } from "@/src/hooks/useReduxHook";

const PostList = (): JSX.Element => {
  const { mode } = useAppSelect((state) => state.ui);
  const { data, isFetching, error } = useGetPostsQuery(undefined);

  let content;
  if (isFetching) {
    content = <Loading $display={true} />;
  } else if (error) {
    content = <div>Error!!!</div>;
  } else {
    const posts = data[0].posts;
    content =
      posts.length === 0 ? (
        <p>글이 존재하지 않습니다.</p>
      ) : (
        posts.map((post: Post) => {
          return <PostItem key={post.id} post={post} />;
        })
      );
  }

  return (
    <PostListWrapper mode={mode}>
      <PostForm />
      {content}
    </PostListWrapper>
  );
};

export default PostList;
