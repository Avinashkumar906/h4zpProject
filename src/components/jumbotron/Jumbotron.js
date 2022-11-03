import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Parser from 'html-react-parser';
import { Link } from "react-router-dom";

function Jumbotron(props) {
  return (
    <Container className={`p-0 ${props.data?.theme}`} fluid>
      <Container fluid={props.data?.fluid}>
        <Row className="py-5">
          <Col className="py-5 text-center">
            <div>
              <div className="display-2" data-aos="fade-in">
                <strong>{props.data?.title}</strong>
              </div>
              <div className=" my-4" data-aos="fade-up">
                <div className="h4 my-2" style={{whiteSpace:'pre-wrap'}}>
                  {Parser(props.data?.description || '')}
                </div>
              </div>
              {
                props.data?.btnList.length ? (
                  <div className="pt-4" data-aos="fade-up">
                    {
                      props.data?.btnList?.map((m, index) =>
                        <Link key={`${props.id}-btn-${index}`} to={m.btnLink} className="btn btn-dark m-2">
                          {m.btnText}
                        </Link>
                      )
                    }
                  </div>
                ) : ''
              }
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default Jumbotron