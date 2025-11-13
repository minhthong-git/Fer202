import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/api'; // Đảm bảo đường dẫn đúng file api.js của bạn

// 1. GET USERS
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.getUsers(); // Gọi hàm từ file api.js
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 2. UPDATE USER
export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (userData, { rejectWithValue }) => {
    try {
      // userData bao gồm cả id
      const data = await api.updateUser(userData.id, userData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update User
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.list.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      });
  },
});

export default usersSlice.reducer;
