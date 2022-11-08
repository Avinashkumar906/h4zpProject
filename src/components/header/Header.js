import React from "react";
import { Nav, NavDropdown, Offcanvas } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logoSrc from '../../logo.svg'
import { NavLink, useLocation } from "react-router-dom";
import Tool from "./Tool";
import { Fragment } from "react";

const navLinks = [
  { label: 'HOME', link: '/home' },
  {
    label: 'PROJECTS', link: '/project',
    children: [
      { label: 'MEDICAL SUPPORT', link: '/medical-support' },
      { label: 'FOOD DISTRIBUTION', link: '/food-distribution' },
      { label: 'EDUCATION SUPPORT', link: '/education-support' },
      { label: 'ESSENTIALS DISTRIBUTION', link: '/essentials-distribution' },
      { label: "TREATS DISTRIBUTION", link: '/treat-distribution' },
      { label: 'CARE CENTER', link: '/care-support' },
    ]
  },
  { label: 'BLOG', link: '/blog' },
  { label: 'ABOUT', link: '/about' },
  { label: 'DONATE', link: '/donate', type: '' },
]

function Header(props) {
  const { search } = useLocation();
  const { editable, isAuth } = props;

  return (
    <Container className={`p-0 ${props.theme}`} fluid>
      <Navbar bg="dark" variant="dark" expand={'md'} fixed="top" className={props.navOnTop ? 'nav-on-top' : 'nav-not-on-top'}>
        <Container>
          <Navbar.Brand>
            <NavLink className="d-flex align-items-center nav-link" to="/home">
              <img alt="logo" src={logoSrc} style={{ height: '48px' }} className="d-inline-block align-top rounded-circle pe-2" />
              <span>H4ZP</span>
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
          <Navbar.Offcanvas id={`offcanvasNavbar-expand-md`} placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body >
              <Nav className="align-items-center justify-content-end flex-grow-1 pe-3 text-center">
                {
                  navLinks.map((m, index) => (
                    m.children ? (
                      <NavDropdown
                        key={`Nav-link-ID-${index}`}
                        title={m.label}
                        id={`offcanvasNavbarLabel-expand-md`}
                        align="start"
                      >
                        {
                          m.children.map((mc, index) => (
                            <Fragment key={`Nav-Drop-link-ID-${index}`}>
                              <NavDropdown.Item as={NavLink} to={mc.link}>{mc.label}</NavDropdown.Item>
                              {/* {
                                m.children.length - 1 !== index && <NavDropdown.Divider />
                              } */}
                            </Fragment>
                          ))
                        }
                      </NavDropdown>
                    ) : (
                      <NavLink key={`Nav-link-ID-${index}`} className={`nav-link ${m.type || ''}`} to={`${m.link}${search}`}>
                        {m.label}
                      </NavLink>
                    )
                  ))
                }

                {
                  editable && <Tool isAuth={isAuth}></Tool>
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