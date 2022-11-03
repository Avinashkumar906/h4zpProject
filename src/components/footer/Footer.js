import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AiFillFacebook,AiOutlineInstagram, AiFillYoutube, AiFillLinkedin, AiFillTwitterSquare } from 'react-icons/ai';
import { Link } from "react-router-dom";


function Footer(props) {
  const icons = [
    {icon:<AiFillFacebook/>,to:"//www.facebook.com/h4zp.org"},
    {icon:<AiOutlineInstagram/>,to:'//www.instagram.com/h4zp/'},
    {icon:<AiFillLinkedin/>,to:'//www.linkedin.com/company/hands-4-zero-poverty/'},
    {icon:<AiFillYoutube/>,to:'//www.youtube.com/channel/UCbuJGROMb59lf8_gDAH_YnA'},
    {icon:<AiFillTwitterSquare/>,to:'//twitter.com/hands4zero'},
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
                <Link target={'_blank'} to={m.to} className="social-icon h2 text-light" key={`Icon-ID-${index}`}>
                  {m.icon}
                </Link>
              ))
            }
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default Footer;