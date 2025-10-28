import { Link } from "react-router-dom";

export default function Products() {
  const products = [101, 102, 103];

  return (
    <div>
      <h2>Danh sách sản phẩm</h2>
      <ul>
        {products.map((id) => (
          <li key={id}>
            <Link to={`/san-pham/${id}`}>Xem sản phẩm {id}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
