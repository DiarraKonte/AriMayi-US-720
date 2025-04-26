import { createSlice } from "@reduxjs/toolkit";
import { postContact } from "./contactThunks";

interface ContactState {
  isLoading?: boolean;
  contactResponse?: any;
  error?: any;
}

const initialState: ContactState = {
  isLoading: undefined,
  contactResponse: undefined,
  error: undefined,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contactResponse = action.payload;
        return state;
      })
      .addCase(postContact.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export default contactSlice.reducer;
