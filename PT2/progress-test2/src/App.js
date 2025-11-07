import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { PaymentProvider } from './contexts/PaymentContext';
import { UserProvider } from './contexts/UserContext'; // <-- Import UserProvider
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <PaymentProvider>
        {/* Bọc UserProvider ở đây để chia sẻ state người dùng */}
        <UserProvider>
          <AppRoutes />
        </UserProvider>
      </PaymentProvider>
    </AuthProvider>
  );
}

export default App;
