import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import uiSlice from "../features/ui/uiSlice";
import userSlice from "../features/user/userSlice";
import { userApi } from "../features/user/userService";
import { postApi } from "../features/post/postService";

const store = configureStore({
  reducer: {
    ui: uiSlice,
    user: userSlice,
    [userApi.reducerPath]: userApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(postApi.middleware);
  },
});

setupListeners(store.dispatch);

export type ApplicationState = ReturnType<typeof store.getState>;
export type ApplicationDispatch = typeof store.dispatch;

export {
  useSignupMutation,
  useSigninMutation,
  useVerifyEmailMutation,
  useCurrentUserQuery,
  useSignoutMutation,
} from "../features/user/userService";

export {
  useCreatePostMutation,
  useGetPostsQuery,
} from "../features/post/postService";

export default store;
