import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/api'; // Import file api.js

// 1. FETCH
export const fetchPayments = createAsyncThunk(
  'payments/fetchPayments',
  async (_, { rejectWithValue }) => {
    try {
      return await api.getPayments();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// 2. ADD
export const createPayment = createAsyncThunk(
  'payments/createPayment',
  async (data, { rejectWithValue }) => {
    try {
      return await api.addPayment(data);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// 3. UPDATE
export const updatePayment = createAsyncThunk(
  'payments/updatePayment',
  async (data, { rejectWithValue }) => {
    try {
      return await api.updatePayment(data);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// 4. DELETE
export const deletePayment = createAsyncThunk(
  'payments/deletePayment',
  async (id, { rejectWithValue }) => {
    try {
      await api.deletePayment(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const paymentsSlice = createSlice({
  name: 'payments',
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create
      .addCase(createPayment.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      // Update
      .addCase(updatePayment.fulfilled, (state, action) => {
        const index = state.list.findIndex(p => p.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })
      // Delete
      .addCase(deletePayment.fulfilled, (state, action) => {
        state.list = state.list.filter(p => p.id !== action.payload);
      });
  },
});

export default paymentsSlice.reducer;
