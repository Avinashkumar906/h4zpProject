import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Jumbotron(props) {
  return (
    <Container>
      <Row className="py-5">
        <Col className="py-5 text-center">
          <div>
            <div className="display-2">
              <strong>WE ARE BACK!</strong>
            </div>
            <div>
              <div className="h4 my-4">Supporting medical camps, food and shoe distributions, medical and school supplies, and much more. Help us expand our reach by donating today using Fundly or the H4ZP website. </div>
            </div>
            <div>
              <a href="#" className="btn btn-dark m-2">FUNDLY</a>
              <a href="#" className="btn btn-dark m-2">H4ZP</a>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Jumbotron