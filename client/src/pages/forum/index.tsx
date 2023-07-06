import PostList from "@/src/components/forum/PostList";
import ForumLayout from "@/src/components/layouts/ForumLayout";

const Forum = (): JSX.Element => {
  return (
    <ForumLayout>
      <PostList />
    </ForumLayout>
  );
};

export default Forum;
