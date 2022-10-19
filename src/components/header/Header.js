import React from "react";
import { Nav, Offcanvas } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logoSrc from '../../logo.jpg' 

function Header(props) {
  const navLinks = [
    {label:'ABOUT'},
    {label:'PROJECTS'},
    {label:'BLOG'},
    {label:'DONATE'},
    {label:'CONTACT'},
  ]

  return (
    <Container className={`p-0 ${props.theme}`} fluid>
      <Navbar bg="dark" variant="dark" expand={'md'}>
        <Container>
          <Navbar.Brand href="#home">
            <img alt="logo" src={logoSrc} width="30" height="30" className="d-inline-block align-top rounded-circle"/>
            <strong>&nbsp;H4ZP</strong>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
          <Navbar.Offcanvas id={`offcanvasNavbar-expand-md`} placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                H4ZP
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body >
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {
                  navLinks.map((m,index)=>(<Nav.Link key={`Nav-link-ID-${index}`} href="#"><strong>{m.label}</strong></Nav.Link>))
                }
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </Container>
  );
}

export default Header;