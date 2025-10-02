export default function Banner() {
  const bannerStyle = {
    // Đường dẫn ảnh và lớp phủ không thay đổi
    backgroundImage: 'url("/images/main-pizza-banner.png")', 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
    
    // Giữ giá trị lớn: 200px
    paddingTop: '150px', 
    paddingBottom: '150px', 
    
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    backgroundBlendMode: 'darken', 
  };

  return (
    // THAY ĐỔI: XÓA class "py-5" - Chỉ giữ "text-center" và style={bannerStyle}
    <header id="home" className="text-center" style={bannerStyle}> 
      <div className="container">
        <h1 className="display-3 fw-bold">Neapolitan Pizza</h1> 
        <p className="lead">If you are looking for a traditional Italian pizza, the Neapolitan is the best option!</p>
      </div>
    </header>
  );
}