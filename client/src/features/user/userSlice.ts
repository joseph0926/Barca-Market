import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
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
  reducers: {
    setUser: (state, action: PayloadAction<DraftUser>) => {
      const user = createUser(action.payload);
      state.user = user;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
