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

  /*   const res = await axios.get("https://freetestapi.com/api/v1/books");
  return res.data;
}); */

  try {
    const res = await axios.get("http://localhost:3000/books");
    return res.data;
  } catch (error) {
    throw Error("Failed to fetch books");
  }
});

export const putBooks = createAsyncThunk(
  "books/putBook",
  async ({ id, newBook }, thunkAPI) => {
    try {
      const res = await axios.put(`http://localhost:3000/books/${id}`, {
        name: newBook.name,
        image: newBook.image,
        author: newBook.author,
        price: newBook.price,
        description: newBook.description,
        category: newBook.category,
        publisher: newBook.publisher,
        year: newBook.year,
        pageNumber: newBook.pageNumber,
        publicationType: newBook.publicationType,
        id: newBook.id,
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async ({ id }, thunkAPI) => {
    try {
      const res = await axios.delete(`http://localhost:3000/books/${id}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const bookSlice = createSlice({
  name: "book",
  initialState: {
    entities: [],
    loading: "idle",
    error: false,
    showModal: false,
    currentBook: null, // Şu an düzenlenen kitabı tutmak için
    addBookModal: false,
  },
  reducers: {
    setModal: (state, action) => {
      state.showModal = action.payload.showModal;
      state.currentBook = action.payload.book || null;
    },
    setAddBookModal: (state, action) => {
      state.addBookModal = action.payload.addBookModal;
    },
    setBooks: (state, action) => {
      state.entities = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
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
      })
      .addCase(putBooks.pending, (state) => {
        state.loading = "pending";
        state.error = false;
      })
      .addCase(putBooks.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.error = false;
        // Kitap listesini güncelle
        const index = state.entities.findIndex(
          (book) => book.id === action.payload.id
        );
        if (index !== -1) {
          state.entities[index] = action.payload;
        }
      })
      .addCase(putBooks.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(deleteBook.pending, (state) => {
        state.loading = "pending";
        state.error = false;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.error = false;
        const index = state.entities.findIndex(
          (e) => e.id === action.payload.id
        );
        if (index !== -1) {
          state.entities.splice(index, 1);
        }
      })
      .addCase(deleteBook.rejected, (state) => {
        state.loading = "failed";
        state.error = true;
      });
  },
});

export const { setBooks, setLoading, setError, setModal } = bookSlice.actions;

export default bookSlice.reducer;
