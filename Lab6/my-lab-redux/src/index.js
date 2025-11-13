import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './app/store'; // Import store vừa tạo
import { Provider } from 'react-redux'; // Import Provider từ react-redux

// Tạo root để render ứng dụng React
const root = ReactDOM.createRoot(document.getElementById('root'));

// Bọc toàn bộ ứng dụng trong <Provider> để Redux hoạt động
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
