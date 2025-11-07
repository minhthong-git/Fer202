import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import UserListPage from '../pages/UserListPage'; // Import trang User Management

// Component bảo vệ route (PrivateRoute)
const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                {/* 1️⃣ Trang mặc định: điều hướng đến /home */}
                <Route path="/" element={<Navigate to="/home" replace />} />

                {/* 2️⃣ Trang đăng nhập */}
                <Route path="/login" element={<LoginPage />} />

                {/* 3️⃣ Route bảo vệ cho Dashboard (Payment) */}
                <Route
                    path="/home"
                    element={
                        <PrivateRoute>
                            <DashboardPage />
                        </PrivateRoute>
                    }
                />

                {/* 4️⃣ Route bảo vệ cho User Management */}
                <Route
                    path="/users"
                    element={
                        <PrivateRoute>
                            <UserListPage />
                        </PrivateRoute>
                    }
                />

                {/* 5️⃣ Bắt tất cả route không xác định */}
                <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
