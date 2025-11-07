import React from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';

const UserFilter = ({ filter, onFilterChange, sort, onSortChange }) => {
  // Lấy giá trị filter hiện tại
  const { search = '', role = '', status = '' } = filter;

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Header as="h5">Bộ lọc, Tìm kiếm & Sắp xếp User</Card.Header>
      <Card.Body>
        <Form>
          <Row className="g-3">
            {/* 1. Search (theo Username/Full Name) */}
            <Col xs={12} lg={4}>
              <Form.Group>
                <Form.Label>Tìm kiếm (Username/Full Name)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Search by username or full name"
                  value={search}
                  onChange={e =>
                    onFilterChange({ ...filter, search: e.target.value })
                  }
                />
              </Form.Group>
            </Col>

            {/* 2. Filter by Role */}
            <Col xs={6} md={4} lg={2}>
              <Form.Group>
                <Form.Label>Lọc theo Role</Form.Label>
                <Form.Select
                  value={role}
                  onChange={e =>
                    onFilterChange({ ...filter, role: e.target.value })
                  }
                >
                  <option value="">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </Form.Select>
              </Form.Group>
            </Col>

            {/* 3. Filter by Status */}
            <Col xs={6} md={4} lg={2}>
              <Form.Group>
                <Form.Label>Lọc theo Status</Form.Label>
                <Form.Select
                  value={status}
                  onChange={e =>
                    onFilterChange({ ...filter, status: e.target.value })
                  }
                >
                  <option value="">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="locked">Locked</option>
                </Form.Select>
              </Form.Group>
            </Col>

            {/* 4. Sort */}
            <Col xs={12} md={4} lg={4}>
              <Form.Group>
                <Form.Label>Sắp xếp theo:</Form.Label>
                <Form.Select
                  value={sort}
                  onChange={e => onSortChange(e.target.value)}
                >
                  <option value="username_asc">Username ascending</option>
                  <option value="username_desc">Username descending</option>
                  <option value="fullName_asc">Full Name ascending</option>
                  <option value="fullName_desc">Full Name descending</option>
                  <option value="role_asc">Role ascending</option>
                  <option value="role_desc">Role descending</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default UserFilter;
