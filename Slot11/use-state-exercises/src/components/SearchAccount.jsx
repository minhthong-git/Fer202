import React, { useState } from 'react';
import { Container, Form, Row, Col, Card } from 'react-bootstrap';

// Dữ liệu mẫu về các tài khoản
const accounts = [
  { id: 1, username: 'traltb', password: '123', avatar: 'https://i.pravatar.cc/150?u=traltb' },
  { id: 2, username: 'john_doe', password: '456', avatar: 'https://i.pravatar.cc/150?u=john_doe' },
  { id: 3, username: 'jane_smith', password: '789', avatar: 'https://i.pravatar.cc/150?u=jane_smith' },
  { id: 4, username: 'admin_user', password: 'abc', avatar: 'https://i.pravatar.cc/150?u=admin_user' },
];

function SearchAccount() {
  // State để lưu trữ giá trị của ô tìm kiếm
  const [searchTerm, setSearchTerm] = useState('');

  // Lọc danh sách tài khoản dựa trên searchTerm.
  // Chuyển cả username và searchTerm về chữ thường để tìm kiếm không phân biệt hoa/thường.
  const filteredAccounts = accounts.filter(account =>
    account.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Tìm kiếm tài khoản</h2>
      <Row className="justify-content-md-center mb-4">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Nhập username để tìm kiếm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
      </Row>

      <Row>
        {/* Nếu có kết quả thì hiển thị, ngược lại thì thông báo */}
        {filteredAccounts.length > 0 ? (
          filteredAccounts.map(account => (
            <Col md={4} key={account.id} className="mb-3">
              <Card>
                <Card.Img variant="top" src={account.avatar} />
                <Card.Body>
                  <Card.Title>{account.username}</Card.Title>
                  <Card.Text>
                    ID: {account.id}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col className="text-center">
            <p>Không tìm thấy kết quả</p>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default SearchAccount;