import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Jumbotron(props) {
  return (
    <Container className={`p-0 ${props.data?.theme}`} fluid>
      <Container fluid={props.data?.fluid}>
        <Row className="py-5">
          <Col className="py-5 text-center">
            <div>
              <div className="display-2">
                <strong>{props.data?.title}</strong>
              </div>
              <div className=" my-4">
                {
                  props.data?.subTitle.split('\n').map((m, index) =>
                    <div key={`${props.id}-${index}`} className="h4 my-2">{m}</div>
                  )
                }
              </div>
              <div className="pt-4">
                {
                  props.data?.btnList.map((m, index) =>
                    <a key={`${props.id}-btn-${index}`} href={m.btnLink} className="btn btn-dark m-2">
                      {m.btnText}
                    </a>
                  )
                }
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default Jumbotron