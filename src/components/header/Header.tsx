import { Nav, Offcanvas } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logoSrc from '../../logo.svg';
import { NavLink, useLocation } from 'react-router-dom';
import Tool from './Tool';
import { LuHandHeart } from 'react-icons/lu';
import { signOut } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../firebase/firebase';

const navLinks = [
  { label: 'HOME', link: '/index' },
  {
    label: 'PROJECTS',
    link: '/project',
  },
  { label: 'BLOGS', link: '/blog' },
  { label: 'ABOUT', link: '/about' },
];

function Header(props: any) {
  const { search } = useLocation();
  const { editable, isAuth } = props;

  return (
    <Container className={`p-0 ${props.theme}`} fluid>
      <Navbar
        bg="dark"
        variant="dark"
        expand={'md'}
        fixed="top"
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
              {/* <span>H4ZP</span> */}
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
          <Navbar.Offcanvas id={`offcanvasNavbar-expand-md`} placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="align-items-center gap-2 justify-content-end flex-grow-1 text-center">
                {navLinks.map((m, index) => (
                  <NavLink
                    key={`Nav-link-ID-${index}`}
                    className={'nav-link'}
                    to={`${m.link}${search}`}
                  >
                    {m.label}
                  </NavLink>
                ))}

                {editable && !isAuth ? <Tool isAuth={isAuth}></Tool> : ''}
                {isAuth && (
                  <div className="btn btn-dark py-1" onClick={() => signOut(FIREBASE_AUTH)}>
                    Logout
                  </div>
                )}
                <NavLink className={'btn btn-lime py-1'} to={`/donate`}>
                  Contribute <LuHandHeart />
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
