import { customAxios } from "@/src/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signup = createAsyncThunk(
  "user/signup",
  async (user: User, thunkAPI) => {
    try {
      const response = await customAxios.post("/users/signup", {
        email: user.email,
        password: user.password,
        name: user.name,
      });
      if (response.status !== 200) {
        throw response.data;
      }
      return response.data[0];
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue({ message: error.message });
      }
    }
  }
);
