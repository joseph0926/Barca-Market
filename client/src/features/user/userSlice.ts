import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
import { getCurrentUser } from "./userService";

export type UserState = {
  user: User;
  isLoading: boolean;
  userLoading: boolean;
};

type DraftUser = RequireOnly<User, "email" | "password">;

const createUser = (draftUser: DraftUser): User => {
  return { id: nanoid(), ...draftUser };
};

const initialState: UserState = {
  user: null,
  isLoading: false,
  userLoading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<DraftUser>) => {
      const user = createUser(action.payload);
      state.user = user;
    },
    removeUser: (state) => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.userLoading = true;
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        state.userLoading = false;
        state.isLoading = false;
        state.user = payload && payload[0].currentUser;
      })
      .addCase(getCurrentUser.rejected, (state, { payload }) => {
        state.userLoading = false;
        state.isLoading = false;
        console.log(payload);
      });
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
