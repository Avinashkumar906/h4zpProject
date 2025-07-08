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

  const links = [
    { label: 'Privacy Policy', to: '/privacy-policy' },
    { label: 'Terms & Conditions', to: '/terms-and-conditions' },
    { label: 'Refund Policy', to: '/refund-policy' },
    { label: 'Contact Us', to: '/contact' },
    { label: 'Manage Page', to: '?editable=true' },
  ];

  return (
    <footer className="bg-dark text-light pt-4 pb-3 mt-5">
      <Container>
        <Row className="gy-4">
          {/* Left: About */}
          <Col md={5} sm={12}>
            <h5 className="text-uppercase">Hands 4 Zero Poverty Trust</h5>
            <div className="small">Registered Under Indian Trusts Act, 1882</div>
            {/* <p className="small">
              Hands 4 Zero Poverty, health, education, empowerment—our core values to success!
            </p> */}
          </Col>

          {/* Middle: Quick Links */}
          <Col md={4} sm={6}>
            <h6 className="text-uppercase">Quick Links</h6>
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
            <h6 className="text-uppercase">Contact</h6>
            <p className="small mb-1">Email: info@yourdomain.com</p>
            <p className="small mb-1">Phone: +91-9876543210</p>
            <p className="small mb-2">PAN: AACTH7197M</p>

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

        <hr className="border-light my-4" />

        <Row>
          <Col className="text-center small">
            {/* <br/> */}© {new Date().getFullYear()} Hands4ZeroPoverty Trust. All rights reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
