import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});


// GET /users
export const getUsers = async () => {
  try {
    const response = await API.get('/users');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};

// PUT /users/:id — cập nhật thông tin người dùng (ví dụ: thay đổi status, role)
export const updateUser = async (userId, userData) => {
  try {
    const response = await API.put(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update user ${userId}`);
  }
};

// GET /payments
export const getPayments = async () => {
  try {
    const response = await API.get('/payments');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch payments');
  }
};

// POST /payments — thêm thanh toán mới
export const addPayment = async (payment) => {
  try {
    const response = await API.post('/payments', payment);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add payment');
  }
};

// PUT /payments/:id — cập nhật thanh toán
export const updatePayment = async (payment) => {
  try {
    const response = await API.put(`/payments/${payment.id}`, payment);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update payment ${payment.id}`);
  }
};

// DELETE /payments/:id — xóa thanh toán
export const deletePayment = async (id) => {
  try {
    await API.delete(`/payments/${id}`);
  } catch (error) {
    throw new Error(`Failed to delete payment ${id}`);
  }
};
