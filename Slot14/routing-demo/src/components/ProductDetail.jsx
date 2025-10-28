import { useParams, useNavigate } from "react-router-dom";

export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h2>Chi tiết sản phẩm: {productId}</h2>
      <button onClick={() => navigate("/san-pham")}>Quay lại trang sản phẩm</button>
    </div>
  );
}
