import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Jumbotron(props) {
  return (
    <Container className={`p-0 ${props.theme}`} fluid>
      <Container fluid={props.fluid}>
        <Row className="py-5">
          <Col className="py-5 text-center">
            <div>
              <div className="display-2">
                <strong>{props.data?.title}</strong>
              </div>
              <div>
                <div className="h4 my-4">{props.data?.subTitle}</div>
              </div>
              <div>
                {props.data?.btnList.map(
                  (m,index) => 
                    <a key={`jumbotron-Id-${index}`} href={m.btnLink} className="btn btn-dark m-2">
                      {m.btnText}
                    </a>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default Jumbotron