import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AiFillFacebook,AiOutlineInstagram,AiFillLinkedin } from 'react-icons/ai';


function Footer(props) {
  const icons = [
    {icon:<AiFillFacebook/>},{icon:<AiOutlineInstagram/>},{icon:<AiFillLinkedin/>},
  ];

  return (
    <Container fluid className={`p-0 ${props.theme}`}>
      <Container className="text-center text-light py-5">
        <Row>
          <Col>
            <div className="h4 p-2">HANDS 4 ZERO POVERTY</div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="h5 p-2">"Hands 4 Zero Poverty: health, education, empowerment, - our core values to success"</div>
          </Col>
        </Row>
        <Row className="text-center">
          <Col className="social-icon-container">
            {
              icons.map((m,index)=>(
                <a href="/" className="social-icon h2 text-light" key={`Icon-ID-${index}`}>
                  {m.icon}
                </a>
              ))
            }
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default Footer;