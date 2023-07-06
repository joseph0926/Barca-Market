import { useGetPostsQuery } from "@/src/store/store";
import PostForm from "./PostForm";
// import PostItem from "./PostItem";
import { PostListWrapper } from "./PostListStyle";
import Loading from "../layouts/Loading";

const PostList = (): JSX.Element => {
  const { data, isFetching, error } = useGetPostsQuery(undefined);

  let content;
  if (isFetching) {
    content = <Loading display="true" />;
  } else if (error) {
    content = <div>Error!!!</div>;
    // } else {
    //   content = data.map((post: Post) => {
    //     return <PostItem key={post.id} post={post} />;
    //   });
  }

  return (
    <PostListWrapper>
      <PostForm />
      {/* <PostItem /> */}
    </PostListWrapper>
  );
};

export default PostList;
