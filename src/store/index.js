import { configureStore } from '@reduxjs/toolkit';
import itemReducer from './slices/itemSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    item: itemReducer,
    user: userReducer,
  },
});
