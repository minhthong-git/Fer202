import React, { createContext, useState, useContext } from 'react';

// 1. Khởi tạo context với giá trị mặc định
export const ThemeContext = createContext({
  theme: 'light', // giá trị mặc định
  toggleTheme: () => {}, // hàm mặc định
});

// 2. Tạo Provider để bao bọc ứng dụng
export const ThemeProvider = ({ children }) => {
  // State quản lý theme hiện tại 
  const [theme, setTheme] = useState('light');

  // Hàm chuyển đổi theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Giá trị truyền xuống context
  const contextValue = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// 3. Custom hook để sử dụng context dễ dàng hơn
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
