import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Container, Row, Col, Modal, Toast, ToastContainer } from 'react-bootstrap';

function RegistrationForm() {
  // State cho dữ liệu form, gom tất cả vào 1 object
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // State cho các lỗi validate
  const [errors, setErrors] = useState({});
  // State để kiểm soát việc disable nút submit
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  // State cho modal và toast
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // useEffect sẽ chạy mỗi khi formData thay đổi để kiểm tra validation
  useEffect(() => {
    const validate = () => {
      const newErrors = {};
      // Username validation
      if (formData.username.length < 3 || !/^[a-zA-Z0-9_.]+$/.test(formData.username)) {
        newErrors.username = 'Username phải có ít nhất 3 ký tự và không chứa ký tự đặc biệt.';
      }
      // Email validation
      if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = 'Email không hợp lệ.';
      }
      // Password validation
      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(formData.password)) {
        newErrors.password = 'Password phải có ít nhất 8 ký tự, bao gồm chữ hoa, thường, số và ký tự đặc biệt.';
      }
      // Confirm Password validation
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp.';
      }
      
      setErrors(newErrors);
      // Nút submit sẽ được enable nếu không có lỗi và tất cả các trường đã được điền
      setIsSubmitDisabled(Object.keys(newErrors).length > 0 || !formData.username || !formData.email || !formData.password || !formData.confirmPassword);
    };
    validate();
  }, [formData]);


  // Xử lý khi input thay đổi
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value.trim() }));
  };

  // Xử lý reset form
  const handleCancel = () => {
    setFormData({ username: '', email: '', password: '', confirmPassword: '' });
    setErrors({});
  };

  // Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn trang reload
    if (!isSubmitDisabled) {
      setShowToast(true);  // Hiển thị toast
      setShowModal(true);  // Hiển thị modal
    }
  };

  // Đóng modal và reset form
  const handleCloseModal = () => {
    setShowModal(false);
    handleCancel();
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Header>
              <h3 className="text-center">Đăng Ký Tài Khoản</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                {/* Username */}
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} isInvalid={!!errors.username} />
                  <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                </Form.Group>
                {/* Email */}
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} isInvalid={!!errors.email} />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>
                {/* Password */}
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} isInvalid={!!errors.password} />
                  <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>
                {/* Confirm Password */}
                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} isInvalid={!!errors.confirmPassword} />
                  <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                </Form.Group>
                {/* Buttons */}
                <div className="d-grid gap-2">
                    <Button variant="primary" type="submit" disabled={isSubmitDisabled}>Submit</Button>
                    <Button variant="secondary" type="button" onClick={handleCancel}>Cancel</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Toast thông báo thành công */}
      <ToastContainer position="top-end" className="p-3">
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Thông báo</strong>
          </Toast.Header>
          <Toast.Body>Submitted successfully!</Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Modal hiển thị thông tin đã đăng ký */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Đăng Ký Thành Công</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Card>
                <Card.Body>
                    <Card.Title>Thông tin tài khoản</Card.Title>
                    <Card.Text><strong>Username:</strong> {formData.username}</Card.Text>
                    <Card.Text><strong>Email:</strong> {formData.email}</Card.Text>
                </Card.Body>
            </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default RegistrationForm;