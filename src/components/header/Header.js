import React from "react";
import { Nav, Offcanvas } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logoSrc from '../../logo.svg' 
import { Link } from "react-router-dom";
// import { scrollTo, scrollIntoView } from 'scroll-js';

const navLinks = [
  {label:'HOME',link:'/home'},
  {label:'BLOG',link:'/blog'},
  {label:'PROJECT',link:'/project'},
  {label:'DONATE',link:'/d'},
  {label:'ABOUT',link:'/c'},
]

function Header(props) {
  // //   scrollTo(window, { top: 100 }).then(function () {
  // //     console.log('Scrolled to 10px')
  // // });
  
  return (
    <Container className={`p-0 ${props.theme}`} fluid>
      <Navbar bg="dark" variant="dark" expand={'md'} fixed="top" className={props.navOnTop ? 'nav-on-top' : 'nav-not-on-top'}>
        <Container>
          <Navbar.Brand>
            <Link style={{textDecoration:'none',color:'inherit'}} to="/home">
              <img alt="logo" src={logoSrc} width="30" height="30" className="d-inline-block align-top rounded-circle"/>
              {' '}H4ZP
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
                        <strong>{m.label}</strong>
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

export default React.memo(Header);