import React from "react";
import { Nav, Offcanvas } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logoSrc from '../../logo.jpg' 
import { Link } from "react-router-dom";

function Header(props) {
  const navLinks = [
    {label:'HOME',link:'/home'},
    {label:'PROJECTS',link:'/project'},
    {label:'BLOG',link:'/blogs'},
    {label:'DONATE',link:'/d'},
    {label:'CONTACT',link:'/c'},
  ]

  return (
    <Container className={`p-0 ${props.theme}`} fluid>
      <Navbar bg="dark" variant="dark" expand={'md'}>
        <Container>
          <Navbar.Brand>
            <Link style={{textDecoration:'none',color:'inherit'}} to="/home">
              <img alt="logo" src={logoSrc} width="30" height="30" className="d-inline-block align-top rounded-circle"/>
              <strong>&nbsp;H4ZP</strong>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
          <Navbar.Offcanvas id={`offcanvasNavbar-expand-md`} placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                {/* H4ZP */}
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body >
              <Nav className="justify-content-end flex-grow-1 pe-3 text-center">
                {
                  navLinks.map((m,index)=>(
                    <Nav.Link as="li" key={`Nav-link-ID-${index}`}>
                      <Link style={{textDecoration:'none',color:'inherit'}} to={m.link}>
                        {m.label}
                      </Link>
                    </Nav.Link>
                  ))
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