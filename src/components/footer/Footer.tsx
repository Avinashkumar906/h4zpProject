import { Col, Container, Row } from 'react-bootstrap';
import {
  AiFillFacebook,
  AiOutlineInstagram,
  AiFillYoutube,
  AiFillLinkedin,
  AiFillTwitterSquare,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';

function Footer(props: any) {
  const icons = [
    { icon: <AiFillFacebook fontSize={32} />, to: '//www.facebook.com/h4zp.org' },
    { icon: <AiOutlineInstagram fontSize={32} />, to: '//www.instagram.com/h4zp/' },
    {
      icon: <AiFillLinkedin fontSize={32} />,
      to: '//www.linkedin.com/company/hands-4-zero-poverty/',
    },
    {
      icon: <AiFillYoutube fontSize={32} />,
      to: '//www.youtube.com/channel/UCbuJGROMb59lf8_gDAH_YnA',
    },
    { icon: <AiFillTwitterSquare fontSize={32} />, to: '//twitter.com/hands4zero' },
  ];

  return (
    <footer className="bg-dark text-light pt-4 pb-3 mt-5">
      <Container>
        <Row className="gy-4">
          {/* Left: About */}
          <Col md={4} sm={12}>
            <h5 className="text-uppercase">Hands 4 Zero Poverty Trust</h5>
            <p className="small">PAN:AACTH7197M</p>
            <p className="small">
              Hands 4 Zero Poverty, health, education, empowerment—our core values to success!
            </p>
          </Col>

          {/* Middle: Quick Links */}
          <Col md={4} sm={6}>
            <h6 className="text-uppercase">Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <a href="/privacy-policy" className="text-light text-decoration-none small">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms-and-conditions" className="text-light text-decoration-none small">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="/refund-policy" className="text-light text-decoration-none small">
                  Refund Policy
                </a>
              </li>
              <li>
                <a href="/contact" className="text-light text-decoration-none small">
                  Contact Us
                </a>
              </li>
            </ul>
          </Col>

          {/* Right: Social & Contact */}
          <Col md={4} sm={6}>
            <h6 className="text-uppercase">Contact</h6>
            <p className="small mb-1">Email: info@yourdomain.com</p>
            <p className="small mb-2">Phone: +91-9876543210</p>

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
              {/* <a href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer" className="text-light">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer" className="text-light">
                <FaTwitter />
              </a>
              <a href="https://instagram.com/yourpage" target="_blank" rel="noopener noreferrer" className="text-light">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com/company/yourorg" target="_blank" rel="noopener noreferrer" className="text-light">
                <FaLinkedinIn />
              </a> */}
            </div>
          </Col>
        </Row>

        <hr className="border-light my-4" />

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
