import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';

// --- 1. THAO TÁC GHI (ASYNC THUNK) ---
export const createPayment = createAsyncThunk(
  'payments/createPayment', // Tên action type
  async (paymentData, { rejectWithValue }) => {
    
    // --- [ĐOẠN CODE HỖ TRỢ TEST] ---
    // Giả lập lỗi nếu input đầu vào có status là 'FAILED'
    // (Vì json-server mặc định luôn trả về thành công cho POST)
    if (paymentData.status === 'FAILED') {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Đợi 0.5s cho giống thật
      return rejectWithValue('Giao dịch bị từ chối (Test Lỗi)');
    }
    // -------------------------------

    try {
      // Gọi API tới json-server (chạy ở cổng 3001)
      const response = await fetch('http://localhost:3001/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      // Xử lý lỗi đặc biệt: 402 Payment Required
      if (response.status === 402) {
        return rejectWithValue('Tài khoản không đủ tiền');
      }

      // Xử lý các lỗi HTTP khác
      if (!response.ok) {
        throw new Error('Thanh toán thất bại');
      }

      // Trả về dữ liệu JSON khi thành công
      return await response.json();
    } catch (error) {
      // Trả về thông báo lỗi tuỳ chỉnh
      return rejectWithValue(error.message || 'Lỗi kết nối server');
    }
  }
);

// --- 2. TẠO SLICE ---
const paymentsSlice = createSlice({
  name: 'payments',
  initialState: {
    list: [],           // Danh sách thanh toán
    status: 'idle',     // Trạng thái: idle | loading | succeeded | failed
    error: null,        // Lưu thông báo lỗi
  },
  reducers: {
    // Reducers đồng bộ (nếu cần) có thể thêm ở đây
  },
  extraReducers: (builder) => {
    builder
      // Khi đang gọi API (Pending)
      .addCase(createPayment.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      // Khi gọi API thành công (Fulfilled)
      .addCase(createPayment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Thêm thanh toán mới vào danh sách
        state.list.push(action.payload);
      })
      // Khi gọi API thất bại (Rejected)
      .addCase(createPayment.rejected, (state, action) => {
        state.status = 'failed';
        // Lấy message lỗi từ rejectWithValue (nếu có)
        state.error = action.payload || action.error.message;
      });
  },
});

export default paymentsSlice.reducer;

// --- 3. SELECTORS (BỘ CHỌN) ---

// Selector cơ bản: Lấy toàn bộ danh sách thanh toán
export const selectAllPayments = (state) => state.payments.list;

// Selector nâng cao (Reselect): Lấy danh sách thanh toán có status 'SUCCESS'
export const selectSuccessfulPayments = createSelector(
  [selectAllPayments],
  (payments) => payments.filter((payment) => payment.status === 'SUCCESS')
);
