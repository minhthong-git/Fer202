export default function OrderForm() {
  return (
    // THAY ĐỔI: bg-light => bg-dark và thêm text-white
    <section id="order" className="bg-dark py-5 text-white">
      <div className="container">
        {/* Tiêu đề Book Your Table */}
        <h2 className="text-center mb-4">Book Your Table</h2>
        
        <form className="row g-3">
          
          {/* Hàng 1: Your Name, Your Email, Select a Service (3 cột) */}
          {/* Dùng col-md-4 để chia thành 3 cột ngang */}
          
          {/* 1. Your Name */}
          <div className="col-md-4">
            <label className="form-label">Your Name *</label>
            {/* Input giữ form-control (nền trắng) */}
            <input type="text" className="form-control" placeholder="Your Name" />
          </div>
          
          {/* 2. Your Email */}
          <div className="col-md-4">
            <label className="form-label">Your Email *</label>
            <input type="email" className="form-control" placeholder="Your Email *" />
          </div>
          
          {/* 3. Select a Service */}
          <div className="col-md-4">
            <label className="form-label">Select a Service</label>
            <select className="form-select">
              <option>Margherita</option>
              <option>Mushroom</option>
              <option>Hawaiian</option>
              <option>Pesto</option>
            </select>
          </div>
          
          {/* Hàng 2: Message (textarea) */}
          <div className="col-12">
            <label className="form-label">Please write your comment</label>
            {/* Giữ form-control (nền trắng) */}
            <textarea className="form-control" rows="5" placeholder="Please write your comment"></textarea>
          </div>
          
          {/* Hàng 3: Nút Send Message */}
          <div className="col-12">
            {/* Nút màu vàng (btn-warning) */}
            <button type="submit" className="btn btn-warning">Send Message</button>
          </div>
        </form>
      </div>
    </section>
  );
}