import { Col, Container, Row } from 'react-bootstrap';
import {
  AiFillFacebook,
  AiOutlineInstagram,
  AiFillYoutube,
  AiFillLinkedin,
  AiFillTwitterSquare,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import DynamicIcon from '../common/DynamicIcon';

function Footer(props: any) {
  const icons = [
    {
      icon: <DynamicIcon fullName="ai:AiFillFacebook" size={32} color="#f8f9fa" />,
      to: '//www.facebook.com/h4zp.org',
    },
    {
      icon: <DynamicIcon fullName="ai:AiOutlineInstagram" size={32} color="#f8f9fa" />,
      to: '//www.instagram.com/h4zp/',
    },
    {
      icon: <DynamicIcon fullName="ai:AiFillLinkedin" size={32} color="#f8f9fa" />,
      to: '//www.linkedin.com/company/hands-4-zero-poverty/',
    },
    {
      icon: <DynamicIcon fullName="ai:AiFillYoutube" size={32} color="#f8f9fa" />,
      to: '//www.youtube.com/channel/UCbuJGROMb59lf8_gDAH_YnA',
    },
    {
      icon: <DynamicIcon fullName="ai:AiFillTwitterSquare" size={32} color="#f8f9fa" />,
      to: '//twitter.com/hands4zero',
    },
  ];

  const links = [
    { label: 'Privacy Policy', to: '/privacy-policy' },
    { label: 'Terms & Conditions', to: '/terms-and-conditions' },
    { label: 'Contact Us', to: '/contact-us' },
    { label: 'Refund Policy', to: '/refund-policy' },
    { label: 'About Us', to: '/about' },
    // { label: 'Manage Page', to: '?editable=true' },
  ];

  return (
    <footer className="bg-dark text-light pt-4 pb-2">
      <Container fluid="xl" className="p-0">
        <Row className="gy-4 px-2">
          {/* Left: About */}
          <Col md={5} sm={12}>
            <div className="text-uppercase h3">Hands 4 Zero Poverty Trust</div>
            <div className="small">Registered Under Indian Trusts Act, 1882</div>
            <p className="small mb-2 text-decoration-none">PAN: AACTH7197M</p>
          </Col>

          {/* Middle: Quick Links */}
          <Col md={4} sm={6}>
            <div className="text-uppercase h5">Quick Links</div>
            <div>
              {links.map((m, index, arr) => (
                <div className="d-inline" key={`footerlink-${index}`}>
                  <Link to={m.to} className="text-light text-decoration-none small">
                    {m.label} {arr.length - 1 !== index ? ' | ' : ''}
                  </Link>
                </div>
              ))}
            </div>
          </Col>

          {/* Right: Social & Contact */}
          <Col md={3} sm={6}>
            <div className="text-uppercase h5">Contact</div>
            <a className="small mb-1 text-decoration-none d-block" href="mailto:info@h4zpindia.org">
              Email: info@h4zpindia.org
            </a>

            <a className="small mb-1 text-decoration-none d-block" href="tel:+919876543210">
              Phone: +91-9876543210
            </a>

            <div className="d-flex gap-1">
              {icons.map((m, index) => (
                <Link
                  target={'_blank'}
                  to={m.to}
                  rel="noopener noreferrer"
                  className="text-light text-decoration-none"
                  key={`Icon-ID-${index}`}
                >
                  {m.icon}
                </Link>
              ))}
            </div>
          </Col>
        </Row>

        <hr className="border-light mb-2" />

        <Row>
          <Col className="text-center small">
            © {new Date().getFullYear()} Hands4ZeroPoverty Trust. All rights reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
