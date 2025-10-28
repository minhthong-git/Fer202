import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <NavLink 
        to="/" 
        className={({ isActive }) => isActive ? "active" : ""}
      >
        Trang Chủ
      </NavLink>{" | "}

      <NavLink 
        to="/san-pham" 
        className={({ isActive }) => isActive ? "active" : ""}
      >
        Sản Phẩm
      </NavLink>{" | "}

      <NavLink 
        to="/lien-he" 
        className={({ isActive }) => isActive ? "active" : ""}
      >
        Liên Hệ
      </NavLink>{" | "}

      {/* 🔥 Thêm link để chạy Bài 3 (Dashboard) */}
      <NavLink 
        to="/dashboard" 
        className={({ isActive }) => isActive ? "active" : ""}
      >
        Dashboard
      </NavLink>
    </nav>
  );
}

export default Navbar;
