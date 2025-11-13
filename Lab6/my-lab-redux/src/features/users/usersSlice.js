import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// --- PHẦN 1: XỬ LÝ THAO TÁC ĐỌC (ASYNC) ---
// Sử dụng createAsyncThunk để gọi API lấy danh sách người dùng
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers', // Tên action type
  async (_, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:3001/users');
      
      if (!response.ok) {
        throw new Error('Lỗi khi tải danh sách người dùng');
      }
      
      // Dữ liệu trả về (JSON) sẽ được đưa vào action.payload ở trạng thái fulfilled
      return await response.json(); 
    } catch (error) {
      // Trả về lỗi để xử lý ở trạng thái rejected
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// --- PHẦN 2: THIẾT LẬP SLICE & REDUCERS ---
const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],           // Chứa danh sách user từ API
    isLoading: false,   // Trạng thái loading
    error: null,        // Trạng thái lỗi
  },
  
  // A. REDUCERS ĐỒNG BỘ (Thao tác cục bộ)
  reducers: {
    // Action: Toggle Admin Status
    // Yêu cầu: Tìm user theo userId và đảo ngược trạng thái isAdmin
    toggleAdminStatus: (state, action) => {
      const userId = action.payload;
      // Tìm user trong danh sách
      const user = state.list.find((u) => u.id === userId);
      
      if (user) {
        // Thay đổi trực tiếp (ImmerJS sẽ xử lý bất biến ngầm bên dưới)
        user.isAdmin = !user.isAdmin;
      }
    },
  },

  // B. EXTRA REDUCERS (Xử lý Async Thunk)
  extraReducers: (builder) => {
    builder
      // 1. Trạng thái Pending: Đang gọi API
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // 2. Trạng thái Fulfilled: Gọi API thành công
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload; // Cập nhật danh sách users
      })
      // 3. Trạng thái Rejected: Gọi API thất bại
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

// Xuất action đồng bộ để sử dụng trong component
export const { toggleAdminStatus } = usersSlice.actions;

// Xuất reducer để gắn vào store
export default usersSlice.reducer;
