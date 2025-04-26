import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk<
  string,
  { username: string; password: string },
  { rejectValue: string }
>("auth/loginUser", async ({ username, password }, { rejectWithValue }) => {
  try {
    // TODO Replace **https://admin.arimayi.io** with `process.env.BASE_URL`
    const response = await axios.post(
      "https://admin.arimayi.io/api-token-auth/",
      {
        username,
        password,
      },
    );
    return response.data.token;
  } catch (error: any) {
    if (error.response) {
      return rejectWithValue(error.response.data.message || "Login failed.");
    }
    return rejectWithValue("Unknown error occurred.");
  }
});