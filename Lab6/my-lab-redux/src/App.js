import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Import các action và selector từ Redux Toolkit
import { fetchUsers, toggleAdminStatus } from './features/users/usersSlice';
import { createPayment, selectSuccessfulPayments } from './features/payments/paymentsSlice';

function App() {
  const dispatch = useDispatch();

  // --- LẤY DỮ LIỆU TỪ STORE ---
  const { list: users, isLoading, error } = useSelector((state) => state.users);
  const successfulPayments = useSelector(selectSuccessfulPayments);
  const { status: paymentStatus, error: paymentError } = useSelector((state) => state.payments);

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial' }}>
      <h1>Kiểm Tra Lab 6 - Redux Toolkit</h1>

      {/* --- PHẦN 1: QUẢN LÝ USERS (Bài 1) --- */}
      <div
        style={{
          border: '2px solid #007bff',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px',
        }}
      >
        <h2 style={{ color: '#007bff' }}>Bài 1: Quản lý Users</h2>

        <button
          onClick={() => dispatch(fetchUsers())}
          style={{
            padding: '10px 20px',
            cursor: 'pointer',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          Gọi API lấy Users
        </button>

        {isLoading && <p>⏳ Đang tải dữ liệu...</p>}
        {error && <p style={{ color: 'red' }}>❌ Lỗi: {error} (Do chưa có server thật)</p>}

        <ul style={{ marginTop: '20px' }}>
          {users.length === 0 && !isLoading && <p>Chưa có user nào.</p>}
          {users.map((user) => (
            <li key={user.id} style={{ marginBottom: '10px' }}>
              {user.name} - <strong>{user.isAdmin ? 'ADMIN' : 'MEMBER'}</strong>
              <button
                onClick={() => dispatch(toggleAdminStatus(user.id))}
                style={{ marginLeft: '10px', padding: '5px 10px' }}
              >
                Đổi quyền Admin
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* --- PHẦN 2: QUẢN LÝ PAYMENTS (Bài 2) --- */}
      <div
        style={{
          border: '2px solid #28a745',
          padding: '20px',
          borderRadius: '8px',
        }}
      >
        <h2 style={{ color: '#28a745' }}>Bài 2: Quản lý Payments</h2>

        <button
          onClick={() =>
            dispatch(createPayment({ id: Date.now(), amount: 100000, status: 'SUCCESS' }))
          }
          style={{
            padding: '10px 20px',
            cursor: 'pointer',
            background: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          Test Thanh Toán Thành Công
        </button>

        <button
          onClick={() =>
            dispatch(createPayment({ id: Date.now(), amount: 50000, status: 'FAILED' }))
          }
          style={{
            padding: '10px 20px',
            cursor: 'pointer',
            background: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            marginLeft: '10px',
          }}
        >
          Test Thanh Toán Thất Bại
        </button>

        <p>
          Trạng thái hiện tại: <strong>{paymentStatus}</strong>
        </p>
        {paymentError && <p style={{ color: 'red' }}>❌ Lỗi: {paymentError}</p>}

        <h3>Danh sách thanh toán thành công (Selector lọc):</h3>
        <ul>
          {successfulPayments.map((p) => (
            <li key={p.id}>
              Giao dịch #{p.id}: {p.amount} VND
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
