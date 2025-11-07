//api.js chứa các hàm gọi API tới JSON Server
import axios from 'axios';
// Cấu hình Base URL cho JSON Server
// Giả định JSON Server đang chạy trên cổng 3001 
const API = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getUsers = async () => {
    try {
        const response = await API.get('/users');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch users');
    }
};

// GET /payments
export const getPayments = async () => {
  const res = await API.get('/payments');
  return res.data;
};

// POST /payments
export const addPayment = async (payment) => {
  const res = await API.post('/payments', payment);
  return res.data;
};

// PUT /payments/:id
export const updatePayment = async (payment) => {
  const res = await API.put(`/payments/${payment.id}`, payment);
  return res.data;
};

// DELETE /payments/:id
export const deletePayment = async (id) => {
  await API.delete(`/payments/${id}`);
};

