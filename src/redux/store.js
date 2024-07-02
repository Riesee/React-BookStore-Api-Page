import { configureStore } from '@reduxjs/toolkit'
import booksReducer from './bookSlice'
// import loginReducer from './loginSlice'

export default configureStore({
  reducer: {
    bookSlice: booksReducer,
    // loginSlice: loginReducer,
  },
})