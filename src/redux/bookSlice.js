import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import db from "../../server/db.json"; // JSON Server veri tabanı


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

export const postBooks = createAsyncThunk(
  "books/postBook",
  async ({ newBook }, thunkAPI) => {
    try {
      const res = await axios.post(`http://localhost:3000/books/`, {
        name: newBook.name,
        author: newBook.author,
        year: newBook.year,
        pageNumber: newBook.pageNumber,
        publicationType: newBook.publicationType,
        price: newBook.price,
        category: newBook.category,
        description: newBook.description,
        id: newBook.id,
        image: newBook.image,
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

export const getTheBook = createAsyncThunk(
  "books/getTheBook",
  async ( id , thunkAPI) => {
    try {
      const res = await axios.get(`http://localhost:3000/books/${id}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


// //////////////////////////////////////////////// login
export const getAccounts = createAsyncThunk("accounts/getAll", async () => {

  try {
    const res = await axios.get("http://localhost:3000/accounts");
    return res.data;
  } catch (error) {
    throw Error("Failed to fetch accounts");
  }
});

export const postAccount = createAsyncThunk(
  "accounts/postAccount",
  async ({ newAccount }, thunkAPI) => {
    try {
      const res = await axios.post(`http://localhost:3000/accounts`, {
        name: newAccount.name,
        surname: newAccount.surname,
        username: newAccount.username,
        email: newAccount.email,
        password: newAccount.password,
        id: newAccount.id,
      });
      console.log("çalıştı");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const findUserByEmailAndPassword = (email, password) => {
  return db.accounts.find(
    (account) => account.email === email && account.password === password
  );
};

export const loginUser = ({ email, password }) => async (dispatch) => {

    const user = findUserByEmailAndPassword(email, password);

    if (user) {
      // Kullanıcı doğrulandıysa başarılı döner
      return { success: true, user };
    } else {
      // Kullanıcı bulunamazsa hata döner
      throw new Error("Wrong username or password");
    }
  }



export const bookSlice = createSlice({
  name: "book",
  initialState: {
    entities: [],
    loading: "idle",
    error: false,
    showModal: false,
    currentBook: null, // Şu an düzenlenen kitabı tutmak için
    isLoggedIn: false,
    loginRegister: "idle",
    // login işlemleri
    accounts: [],
  },
  reducers: {
    changeLoginRegister: (state, action) => {
      state.loginRegister = action.payload; // idle login register
    },
    changeLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload; 
    },
    changeCurrentBook: (state, action) => {
      state.currentBook = action.payload;
    },
    setModal: (state, action) => {
      state.showModal = action.payload.showModal;
      state.currentBook = action.payload.book || null;
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
        state.entities = action.payload.reverse();
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
      })
      .addCase(postBooks.pending, (state) => {
        state.loading = "pending";
        state.error = false;
      })
      .addCase(postBooks.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.error = false;
        // Kitap Ekle
        state.entities.unshift(action.payload);
      })
      .addCase(postBooks.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(getTheBook.pending, (state) => {
        state.loading = "pending";
        state.error = false;
      })
      .addCase(getTheBook.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.error = false;
        state.currentBook = action.payload;
      })
      // ACCOUNTS İŞLEMLERİ
      .addCase(getTheBook.rejected, (state) => {
        state.loading = "failed";
        state.error = true;
      })
      .addCase(getAccounts.pending, (state) => {
        state.loading = "pending";
        state.error = false;
      })
      .addCase(getAccounts.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.error = false;
        state.accounts = action.payload;
      })
      .addCase(getAccounts.rejected, (state) => {
        state.loading = "failed";
        state.error = true;
      })
      .addCase(postAccount.pending, (state) => {
        state.loading = "pending";
        state.error = false;
      })
      .addCase(postAccount.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.error = false;
        // account Ekle
        state.accounts.unshift(action.payload);
      })
      .addCase(postAccount.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload || action.error.message;
      })
  },
});

export const { setBooks, setLoading, setError, setModal, changeCurrentBook, changeLoggedIn, changeLoginRegister } = bookSlice.actions;

export default bookSlice.reducer;



