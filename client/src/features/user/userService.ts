import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/users",
  }),
  tagTypes: ["User"],
  endpoints(builder) {
    return {
      signup: builder.mutation({
        query: (user) => {
          return {
            url: "/signup",
            method: "POST",
            body: {
              email: user.email,
              password: user.password,
              name: user.name,
            },
          };
        },
      }),
      signin: builder.mutation({
        invalidatesTags: (result, error, arg) => {
          if (result) {
            return [{ type: "User", id: result[0].currentUser.id }];
          }
          return ["User"];
        },
        query: (user) => {
          return {
            url: "/signin",
            method: "POST",
            body: {
              email: user.email,
              password: user.password,
            },
          };
        },
      }),
      verifyEmail: builder.mutation({
        query: ({ token, email }) => {
          return {
            url: "/verify-email",
            method: "POST",
            body: {
              email,
              verificationToken: token,
            },
          };
        },
      }),
      currentUser: builder.query({
        providesTags: (result, error, arg) => {
          if (result) {
            return [{ type: "User", id: result[0].currentUser.id }];
          }
          return ["User"];
        },
        query: () => {
          return {
            url: "/currentuser",
            method: "GET",
          };
        },
      }),
      signout: builder.mutation({
        invalidatesTags: (result, error, arg) => {
          console.log(result[0]);
          if (result) {
            return [{ type: "User", id: result[0].currentUser.id }];
          }
          return ["User"];
        },
        query: () => {
          return {
            url: "/signout",
            method: "POST",
          };
        },
      }),
    };
  },
});

export const {
  useSignupMutation,
  useSigninMutation,
  useVerifyEmailMutation,
  useCurrentUserQuery,
  useSignoutMutation,
} = userApi;

export { userApi };
