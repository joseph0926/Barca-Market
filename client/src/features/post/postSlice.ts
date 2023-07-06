import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";

export type PostState = {
  posts: Post[];
  isLoading: boolean;
};

type DraftPost = RequireOnly<Post, "id" | "content" | "isPrivate" | "userId">;

const initialState: PostState = {
  posts: [],
  isLoading: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<DraftPost>) => {
      state.posts.push(action.payload);
    },
  },
});

export const { setPost } = postSlice.actions;

export default postSlice.reducer;
