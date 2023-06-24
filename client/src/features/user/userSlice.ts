import { createSlice, nanoid } from "@reduxjs/toolkit";
import { signup } from "./userService";
import { toast } from "react-toastify";

export type UserState = {
  user: User;
  isLoading: boolean;
};

type DraftUser = RequireOnly<User, "email" | "password">;

const createUser = (draftUser: DraftUser): User => {
  return { id: nanoid(), ...draftUser };
};

const initialState: UserState = {
  user: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, { payload }) => {
        state.isLoading = true;
        toast.success(payload.message);
      })
      .addCase(signup.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload[0].message);
      });
  },
});

export default userSlice.reducer;
