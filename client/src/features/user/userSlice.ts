import { createSlice, nanoid } from "@reduxjs/toolkit";
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
});

export default userSlice.reducer;
