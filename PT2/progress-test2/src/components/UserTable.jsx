import React from 'react';
import { Card, Spinner, Alert, Table, Button, Image } from 'react-bootstrap';

// Nhận vào 4 props: 
// - loading, error: Để hiển thị trạng thái
// - users: Danh sách user đã lọc để hiển thị
// - onUpdateStatus: Hàm (lấy từ context) để gọi khi nhấn nút Ban/Unban
const UserTable = ({ users, loading, error, onUpdateStatus }) => {

  // Hàm xử lý khi nhấn nút Ban/Unban
  const handleStatusChange = (user) => {
    // Xác định status mới
    const newStatus = user.status === 'active' ? 'locked' : 'active';
    // Gọi hàm từ context (sẽ được truyền vào từ UserListPage)
    onUpdateStatus(user, newStatus);
  };

  return (
    <Card className="shadow-sm">
      <Card.Header as="h5">User List</Card.Header>
      <Card.Body>
        {/* 1. Hiển thị Loading hoặc Error */}
        {loading && (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        )}
        {error && <Alert variant="danger">{error}</Alert>}

        {/* 2. Hiển thị khi không có dữ liệu */}
        {!loading && !error && users.length === 0 && (
          <p className="text-center">No users found.</p>
        )}

        {/* 3. Hiển thị bảng dữ liệu */}
        {!loading && !error && users.length > 0 && (
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Avatar</th>
                <th>Username</th>
                <th>Full Name</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    <Image
                      src={user.avatar || 'https://via.placeholder.com/50'}
                      roundedCircle
                      width="50"
                      height="50"
                      alt={user.username}
                    />
                  </td>
                  <td>{user.username}</td>
                  <td>{user.fullName}</td>
                  <td>
                    {user.role === 'admin'
                      ? <span className="badge bg-primary">Admin</span>
                      : <span className="badge bg-secondary">User</span>
                    }
                  </td>
                  <td>
                    {user.status === 'active'
                      ? <span className="badge bg-success">Active</span>
                      : <span className="badge bg-danger">Locked</span>
                    }
                  </td>
                  <td>
                    {/* Nút View Details (Tạm thời vô hiệu hóa) */}
                    <Button
                      variant="info"
                      size="sm"
                      className="me-2"
                      disabled
                    >
                      View Details
                    </Button>

                    {/* Nút Ban/Unban Account */}
                    <Button
                      variant={user.status === 'active' ? 'danger' : 'success'}
                      size="sm"
                      onClick={() => handleStatusChange(user)}
                    >
                      {user.status === 'active' ? 'Ban Account' : 'Unban Account'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
};

export default UserTable;
