import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAccounts = createAsyncThunk("accounts/getAll", async () => {

  try {
    const res = await axios.get("http://localhost:3000/accounts");
    return res.data;
  } catch (error) {
    throw Error("Failed to fetch accounts");
  }
});

export const putAccount = createAsyncThunk(
  "accounts/putAccount",
  async ({ id }, thunkAPI) => {
    try {
      const res = await axios.put(`http://localhost:3000/accounts/${id}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const postAccount = createAsyncThunk(
  "accounts/postAccount",
  async ({ newAccount }, thunkAPI) => {
    try {
      const res = await axios.post(`http://localhost:3000/accounts/`, {
        name: newAccount.name,
        surname: newAccount.surname,
        username: newAccount.username,
        email: newAccount.email,
        password: newAccount.password,
        id: newAccount.id,
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteAccount = createAsyncThunk(
  "accounts/deleteAccount",
  async ({ id }, thunkAPI) => {
    try {
      const res = await axios.delete(`http://localhost:3000/accounts/${id}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getTheAccount = createAsyncThunk(
  "accounts/getTheAccount",
  async ( id , thunkAPI) => {
    try {
      const res = await axios.get(`http://localhost:3000/account/${id}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const loginSlice = createSlice({
  name: "accounts",
  initialState: {
    
  },
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAccounts.pending, (state) => {
        state.loading = "pending";
        state.error = false;
      })
      .addCase(getAccounts.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.error = false;
        state.entities = action.payload.reverse();
      })
      .addCase(getAccounts.rejected, (state) => {
        state.loading = "failed";
        state.error = true;
      })
      .addCase(putAccount.pending, (state) => {
        state.loading = "pending";
        state.error = false;
      })
      .addCase(putAccount.fulfilled, (state, action) => {
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
      .addCase(putAccount.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(deleteAccount.pending, (state) => {
        state.loading = "pending";
        state.error = false;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.error = false;
        const index = state.entities.findIndex(
          (e) => e.id === action.payload.id
        );
        if (index !== -1) {
          state.entities.splice(index, 1);
        }
      })
      .addCase(deleteAccount.rejected, (state) => {
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
        // Kitap Ekle
        state.entities.unshift(action.payload);
      })
      .addCase(postAccount.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(getTheAccount.pending, (state) => {
        state.loading = "pending";
        state.error = false;
      })
      .addCase(getTheAccount.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.error = false;
        state.currentBook = action.payload;
      })
      .addCase(getTheAccount.rejected, (state) => {
        state.loading = "failed";
        state.error = true;
      })
  },
});

// export const {  } = loginSlice.actions;

export default loginSlice.reducer;
