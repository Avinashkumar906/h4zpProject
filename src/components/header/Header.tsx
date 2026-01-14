import { useEffect, useState } from 'react';
import { Nav, Offcanvas } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logoSrc from '../../logo.svg';
import { NavLink, useLocation } from 'react-router-dom';
import Tool from './Tool';
import { signOut } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../firebase/firebase';
import DynamicIcon from '../common/DynamicIcon';

const navLinks = [
  { label: 'HOME', link: '/index' },
  { label: 'PROJECTS', link: '/project' },
  { label: 'BLOGS', link: '/blog' },
  { label: 'ABOUT', link: '/about' },
];

function Header(props: any) {
  const { search, pathname } = useLocation();
  const { editable, isAuth } = props;

  const [show, setShow] = useState(false);

  // ✅ CLOSE NAVBAR ON ROUTE CHANGE
  useEffect(() => {
    setShow(false);
  }, [pathname]);

  return (
    <Container className={`p-0 ${props.theme}`} fluid>
      <Navbar
        bg="dark"
        variant="dark"
        expand="md"
        fixed="top"
        expanded={show}
        className={props.navOnTop ? 'nav-on-top' : 'nav-not-on-top'}
      >
        <Container className="h-100" fluid="xxl">
          <Navbar.Brand className="h-100">
            <NavLink className="d-flex align-items-center nav-link h-100" to="/index">
              <img
                alt="logo"
                src={logoSrc}
                style={{ height: '90%' }}
                className="d-inline-block align-top rounded-circle pe-2"
              />
            </NavLink>
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="offcanvasNavbar-expand-md"
            onClick={() => setShow((prev) => !prev)}
          />

          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-md"
            placement="end"
            show={show}
            onHide={() => setShow(false)}
          >
            <Offcanvas.Header closeButton />
            <Offcanvas.Body>
              <Nav className="align-items-center gap-2 justify-content-end flex-grow-1 text-center">
                {navLinks.map((m, index) => (
                  <NavLink
                    key={`Nav-link-ID-${index}`}
                    className="nav-link"
                    to={`${m.link}${search}`}
                  >
                    {m.label}
                  </NavLink>
                ))}

                {editable && !isAuth && <Tool isAuth={isAuth} />}

                {editable && isAuth && (
                  <div className="btn btn-dark py-1" onClick={() => signOut(FIREBASE_AUTH)}>
                    Logout
                  </div>
                )}

                <NavLink className="btn btn-lime py-1" to="/donate">
                  Contribute <DynamicIcon fullName="lu:LuHandHeart" color="#f8f9fa" />
                </NavLink>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </Container>
  );
}

export default Header;
