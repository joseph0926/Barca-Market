import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/post",
  }),
  tagTypes: ["Post"],
  endpoints(builder) {
    return {
      createPost: builder.mutation({
        invalidatesTags: (result, error, post) => {
          return [{ type: "Post", id: post.id }];
        },
        query: ({ content, hashtags, images, isPrivate }) => {
          return {
            url: "/",
            method: "POST",
            body: { content, hashtags, images, isPrivate },
          };
        },
      }),
      getPosts: builder.query({
        providesTags: (result, error, data) => {
          const tag = result.map((post) => {
            return { type: "Post", id: post.id };
          });
          return tag;
        },
        query: () => {
          return {
            url: "/",
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useCreatePostMutation, useGetPostsQuery } = postApi;

export { postApi };
