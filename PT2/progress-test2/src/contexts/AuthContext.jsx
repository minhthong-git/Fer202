import React, { createContext, useContext, useReducer } from 'react';
import * as api from '../services/api';

// 1. Tạo Context
const AuthContext = createContext();

// 2. Trạng thái khởi tạo (Initial State)
const initialAuthState = {
    isAuthenticated: false,
    user: null,
    isLoading: false,
    error: null,
};

// 3. Hàm reducer
const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_START':
            return { ...state, isLoading: true, error: null };

        case 'LOGIN_SUCCESS':
            localStorage.setItem('user', JSON.stringify(action.payload));
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                user: action.payload,
                error: null,
            };

        case 'LOGIN_FAILURE':
            return { ...state, isLoading: false, error: action.payload };

        case 'LOGOUT':
            localStorage.removeItem('user');
            return { ...initialAuthState, isAuthenticated: false, user: null };

        case 'CLEAR_ERROR':
            return { ...state, error: null };

        default:
            return state;
    }
};

// 4. Tạo AuthProvider
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialAuthState);

    const clearError = () => {
        dispatch({ type: 'CLEAR_ERROR' });
    };

    // Hàm login có kiểm tra role và status
    const login = async ({ usernameOrEmail, password }) => {
        dispatch({ type: 'LOGIN_START' });

        try {
            const accounts = await api.getUsers();

            const user = accounts.find(
                (acc) =>
                    (acc.username === usernameOrEmail ||
                        (acc.email && acc.email === usernameOrEmail)) &&
                    acc.password === password
            );

            // 1️⃣ Không tìm thấy user
            if (!user) {
                const errorMessage = 'Invalid username/email or password!';
                dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
                return { success: false, error: errorMessage };
            }

            // 2️⃣ Kiểm tra Status (Trạng thái)
            if (user.status !== 'active') {
                const errorMessage = 'Tài khoản của bạn đã bị khóa!';
                dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
                return { success: false, error: errorMessage };
            }

            // 3️⃣ Kiểm tra Role (Quyền)
            if (user.role !== 'admin') {
                const errorMessage =
                    'Bạn không có quyền truy cập (Admin role required)!';
                dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
                return { success: false, error: errorMessage };
            }

            // 4️⃣ Thành công
            dispatch({ type: 'LOGIN_SUCCESS', payload: user });
            return { success: true, user };
        } catch (error) {
            const errorMessage =
                error.message || 'Login failed due to a network error.';
            dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
            return { success: false, error: errorMessage };
        }
    };

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    const contextValue = {
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.isLoading,
        error: state.error,
        login,
        logout,
        clearError,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// 5. Custom Hook
export const useAuth = () => useContext(AuthContext);
