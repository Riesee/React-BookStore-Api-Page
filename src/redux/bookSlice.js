import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getBooks = createAsyncThunk("books/getAll", async () => {
  //   const res = await axios.get("https://api.itbook.store/1.0/search/mongodb");
  //   return res.data;

  //   const options = {
  //     method: "GET",
  //     url: "https://hapi-books.p.rapidapi.com/top_authors",
  //     headers: {
  //       "x-rapidapi-key": "f2618c82f6msha775b3e18420ef3p1a93fdjsn5c70a27124be",
  //       "x-rapidapi-host": "hapi-books.p.rapidapi.com",
  //     },
  //   };

  //   try {
  //     const response = await axios.request(options);
  //     return response.data;
  //   } catch (error) {
  //     console.error(error);
  //   }

  const res = await axios.get("https://freetestapi.com/api/v1/books");
  return res.data;
});

export const bookSlice = createSlice({
  name: "book",
  initialState: {
    entities: [],
    loading: "idle",
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.loading = "pending";
        state.error = false;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.error = false;
        state.entities = action.payload;
      })
      .addCase(getBooks.rejected, (state) => {
        state.loading = "failed";
        state.error = true;
      });
  },
});

export default bookSlice.reducer;
