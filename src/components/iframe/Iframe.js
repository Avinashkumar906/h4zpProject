import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function Iframe(props) {
  return (
    <Container className={`p-0 ${props.theme}`} fluid>
      <Container fluid={props.fluid}>
        <Row style={{ minHeight: '560px' }}>
          <Col>
            <iframe title="this is iframe" src={props.data.src} allow='autoplay' className="w-100 h-100" scrolling="no" frameBorder="0" allowFullScreen></iframe>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default Iframe;