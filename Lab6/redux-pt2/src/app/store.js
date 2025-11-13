// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice';
import paymentsReducer from '../features/payments/paymentsSlice'; // Import paymentsSlice

// Tạo Redux store và gắn các slice reducer vào
export const store = configureStore({
  reducer: {
    users: usersReducer,
    payments: paymentsReducer, // Gắn reducer vào store
  },
});
