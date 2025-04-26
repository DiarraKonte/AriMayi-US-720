import { createAsyncThunk } from "@reduxjs/toolkit";

export const postContact = createAsyncThunk(
  "contact/postNew",
  async (data: any) => {
    console.log(data);
    return "Message sent with successfully";
  },
);
