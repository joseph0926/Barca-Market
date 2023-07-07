import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createAsyncThunk } from "@reduxjs/toolkit";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/users",
  }),
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
      // currentUser: builder.query({
      //   query: () => {
      //     return {
      //       url: "/currentuser",
      //       method: "GET",
      //     };
      //   },
      // }),
      signout: builder.mutation({
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

export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("/api/users/currentuser");
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }
);

export const {
  useSignupMutation,
  useSigninMutation,
  useVerifyEmailMutation,
  useSignoutMutation,
} = userApi;

export { userApi };
