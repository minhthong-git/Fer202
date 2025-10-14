import React from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container } from 'react-bootstrap';

export default function AppNavBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand href="#home">MovieApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
          
          <Form className="d-flex mx-auto">
            <FormControl
              type="search"
              placeholder="Quick search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>

          <Nav>
            <Nav.Link href="#favorites" className="d-flex align-items-center">
                <i className="bi bi-heart-fill me-1"></i> Favourites
            </Nav.Link>
            <Nav.Link href="#login" className="d-flex align-items-center">
                <i className="bi bi-box-arrow-in-right me-1"></i> Login
            </Nav.Link>
            <NavDropdown title={<><i className="bi bi-person-circle"></i> Accounts</>} id="basic-nav-dropdown" align="end">
              <NavDropdown.Item href="#action/3.1">Manage Your Profiles</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Build your Account</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Change Password</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}