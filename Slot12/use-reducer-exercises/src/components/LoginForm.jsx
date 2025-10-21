//LoginForm component rewritten using useReducer instead of useState
import React, { useReducer } from 'react';
import { Form, Button, Card, Container, Row, Col, Modal } from 'react-bootstrap';

const initialState = {
  username: '',
  password: '',
  errors: {},
  showModal: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_USERNAME': {
      const username = action.payload;
      const errors = { ...state.errors };
      if (username.trim() === '') {
        errors.username = 'Username is required';
      } else {
        delete errors.username;
      }
      return { ...state, username, errors };
    }

    case 'SET_PASSWORD': {
      const password = action.payload;
      const errors = { ...state.errors };
      if (password.trim() === '') {
        errors.password = 'Password is required';
      } else {
        delete errors.password;
      }
      return { ...state, password, errors };
    }

    case 'SUBMIT_FORM': {
      const errors = {};
      if (state.username.trim() === '') errors.username = 'Username is required';
      if (state.password.trim() === '') errors.password = 'Password is required';
      if (Object.keys(errors).length > 0) {
        return { ...state, errors };
      }
      return { ...state, errors: {}, showModal: true };
    }

    case 'CLOSE_MODAL':
      return { ...initialState };

    default:
      return state;
  }
}

function LoginForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { username, password, errors, showModal } = state;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT_FORM' });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Header>
              <h3 className="text-center">Login</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) =>
                      dispatch({ type: 'SET_USERNAME', payload: e.target.value })
                    }
                    isInvalid={!!errors.username}
                    placeholder="Enter username"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) =>
                      dispatch({ type: 'SET_PASSWORD', payload: e.target.value })
                    }
                    isInvalid={!!errors.password}
                    placeholder="Enter password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal hiển thị khi đăng nhập thành công */}
      <Modal show={showModal} onHide={() => dispatch({ type: 'CLOSE_MODAL' })} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Welcome, {username}!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default LoginForm;
