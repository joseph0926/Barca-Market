import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";

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
    removeUser: (state) => {
      return { ...initialState };
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
