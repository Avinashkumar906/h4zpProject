import React from "react";
import { Nav } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logoSrc from '../../logo.jpg' 

function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <img alt="logo" src={logoSrc} width="30" height="30" className="d-inline-block align-top rounded-circle"/>
          <strong>&nbsp;H4ZP</strong>
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">ABOUT</Nav.Link>
          <Nav.Link href="#features">PROJECTS</Nav.Link>
          <Nav.Link href="#pricing">BLOG</Nav.Link>
          <Nav.Link href="#features">DONATE</Nav.Link>
          <Nav.Link href="#pricing">CONTACT</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;