import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

function Blogs(props) {
  return (
    <Container className={`p-0 ${props.theme}`} fluid>
      <Container className="py-5" fluid={props.fluid}>
        <Row>
          <Col xl={12}>
            <div className="text-center display-2 pb-4">
              <strong>{props.data?.title}</strong>
            </div>
          </Col>
          {
            props.data?.list?.map((m,index) => (
              <Col key={`Blogs-ID-${index}`} lg={6} sm={12} className="pb-5">
                <Card>
                  <Card.Img variant="top" className="h-100 w-100" src={m.url} />
                  <Card.Body className="card-overlay-body text-light">
                    <Card.Title>
                      <div className="h4">
                        <span>{m.title}</span>
                      </div>
                    </Card.Title>
                    <Card.Text className="mb-2 h5">
                        <span>{m.subtitle}</span>
                    </Card.Text>
                    <Card.Text className="mb-2 h5">
                        <a href={m.BtnUrl}>{m.BtnText}</a>
                    </Card.Text>
                    <Card.Text className="text-end">
                      <span className="blockquote-footer">
                        26-Dec-2022
                      </span>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          }
          <Col xl={12}>
            <div className="text-end">
              <a href="/">more activities</a>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default Blogs;