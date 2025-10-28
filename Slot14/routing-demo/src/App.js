import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Products from "./components/Products";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import ProductDetail from "./components/ProductDetail";
import DashboardLayout from "./components/DashboardLayout";
import DashboardHome from "./components/DashboardHome";
import Settings from "./components/Settings";
import Reports from "./components/Reports";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* BÀI 1: Routing cơ bản */}
        <Route path="/" element={<Home />} />
        <Route path="/san-pham" element={<Products />} />
        <Route path="/lien-he" element={<Contact />} />

        {/* BÀI 2: Dynamic Routing */}
        <Route path="/san-pham/:productId" element={<ProductDetail />} />

        {/* BÀI 3: Nested Routing */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="settings" element={<Settings />} />
          <Route path="reports" element={<Reports />} />
        </Route>

        {/* (Optional) Route 404 */}
        {/* <Route path="*" element={<h2>404 - Không tìm thấy trang</h2>} /> */}
      </Routes>
    </>
  );
}

export default App;
