import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { AuthProvider } from './contexts/AuthContext'; // Giữ lại Auth
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Provider>
  );
}

export default App;
