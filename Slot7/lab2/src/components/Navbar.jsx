export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        {/* Vẫn giữ Brand/Logo */}
        <a className="navbar-brand fw-bold" href="#">🍕 Pizza House</a>
        
        {/* Button toggler cho di động */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navMenu">
          
          {/* Menu Items (Điều chỉnh theo ảnh mẫu nếu cần) */}
          <ul className="navbar-nav ms-auto me-4"> {/* ms-auto và me-4 để đẩy menu items sang trái một chút */}
            <li className="nav-item"><a className="nav-link active" href="#home">Home</a></li>
            {/* Bạn có thể thay đổi các mục này để khớp với ảnh mẫu (ví dụ: About Us, Contact) */}
            <li className="nav-item"><a className="nav-link" href="#menu">Menu</a></li>
            <li className="nav-item"><a className="nav-link" href="#order">Order</a></li>
            <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
          </ul>
          
          {/* THÊM Thanh Search Bar */}
          {/* Dùng form-inline để đặt input và button cạnh nhau, sử dụng Bootstrap utilities */}
          <form className="d-flex" role="search">
            <input 
              className="form-control me-2" 
              type="search" 
              placeholder="Search" 
              aria-label="Search" 
              // Thêm style cho input để có nền trắng và kích thước như ảnh mẫu
              style={{ width: '180px', backgroundColor: 'white' }}
            />
            {/* Nút search màu đỏ (dùng btn-danger cho màu đỏ) */}
            <button className="btn btn-danger" type="submit">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398l3.65 3.65a1 1 0 0 0 1.415-1.414l-3.65-3.65Z"/>
              </svg>
            </button>
          </form>
          
        </div>
      </div>
    </nav>
  );
}