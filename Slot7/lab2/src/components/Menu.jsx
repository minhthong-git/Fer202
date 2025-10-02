export default function Menu() {
  const imagePath = "/images/"; 

  return (
    <section id="menu" className="bg-dark py-5 text-white"> 
      <div className="container">
        <h2 className=" mb-4">Our Menu</h2> 
        <div className="row g-4">
          
          {/* Pizza 1: Margherita (SALE) */}
          <div className="col-md-3">
            <div className="card h-100 bg-white text-dark shadow-sm"> 
              <span className="badge bg-danger position-absolute top-0 start-0 m-1">SALE</span>
              {/* THAY ĐỔI: THÊM STYLE CHO ẢNH */}
              <img 
                src={`${imagePath}Margherita.png`} 
                className="card-img-top" 
                alt="Margherita Pizza" 
                style={{ height: '200px', objectFit: 'cover' }} // Đặt chiều cao cố định và fill
              />
              <div className="card-body text-center">
                <h5 className="card-title">Margherita Pizza</h5>
                <p className="card-text">Classic delight with fresh mozzarella and basil.</p>
                <p className="fw-bold"><del>$40.00</del> $24.00</p>
                <button className="btn btn-dark">Buy</button> 
              </div>
            </div>
          </div>
          
          {/* Pizza 2: Mushroom */}
          <div className="col-md-3">
            <div className="card h-100 bg-white text-dark shadow-sm">
              {/* THAY ĐỔI: THÊM STYLE CHO ẢNH */}
              <img 
                src={`${imagePath}Mushroom.png`} 
                className="card-img-top" 
                alt="Mushroom Pizza" 
                style={{ height: '200px', objectFit: 'cover' }} // Đặt chiều cao cố định và fill
              />
              <div className="card-body text-center">
                <h5 className="card-title">Mushroom Pizza</h5>
                <p className="card-text">Fresh mushrooms with cheese and herbs.</p>
                <p className="fw-bold">$25.00</p>
                <button className="btn btn-dark">Buy</button>
              </div>
            </div>
          </div>
          
          {/* Pizza 3: Hawaiian (NEW) */}
          <div className="col-md-3">
            <div className="card h-100 bg-white text-dark shadow-sm">
              <span className="badge bg-success position-absolute top-0 start-0 m-1">NEW</span>
              {/* THAY ĐỔI: THÊM STYLE CHO ẢNH */}
              <img 
                src={`${imagePath}Hawaiian.png`} 
                className="card-img-top" 
                alt="Hawaiian Pizza" 
                style={{ height: '200px', objectFit: 'cover' }} // Đặt chiều cao cố định và fill
              />
              <div className="card-body text-center">
                <h5 className="card-title">Hawaiian Pizza</h5>
                <p className="card-text">Ham, pineapple and cheese for a tropical taste.</p>
                <p className="fw-bold"><del>$30.00</del></p>
                <button className="btn btn-dark">Buy</button>
              </div>
            </div>
          </div>
          
          {/* Pizza 4: Pesto (SALE) */}
          <div className="col-md-3">
            <div className="card h-100 bg-white text-dark shadow-sm">
              <span className="badge bg-danger position-absolute top-0 start-0 m-1">SALE</span>
              {/* THAY ĐỔI: THÊM STYLE CHO ẢNH */}
              <img 
                src={`${imagePath}Pesto.png`} 
                className="card-img-top" 
                alt="Pesto Pizza" 
                style={{ height: '200px', objectFit: 'cover' }} // Đặt chiều cao cố định và fill
              />
              <div className="card-body text-center">
                <h5 className="card-title">Pesto Pizza</h5>
                <p className="card-text">Fresh basil pesto with cheese and tomatoes.</p>
                <p className="fw-bold"><del>$30.00</del> $26.00</p>
                <button className="btn btn-dark">Buy</button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}