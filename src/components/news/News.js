import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

function News(props) {
  return (
    <Container className={`p-0 ${props.theme}`} fluid>
      <Container className="py-5" fluid={props.fluid}>
        <Row>
          <Col xl={12}>
            <div className="text-center display-2 pb-4">
              <strong>Recent Activities</strong>
            </div>
          </Col>
          {
            props.data?.list?.map((m, index) => (
              <Col key={`News-ID-${index}`} xl={12} className="pb-5">
                <Card style={{overflow:'hidden'}}>
                    <Row>
                      <Col md={6} lg={5} className={`order-0 order-md-${index % 2 === 0 ? 1 : 0}`}>
                        <img alt="" className="w-100" src={m.url}/>
                      </Col>
                      <Col md={6} lg={7} className={`order-0 order-md-${index % 2 === 0 ? 0 : 1}`}>
                        <Card.Body className="h-100">
                          <div className="d-flex flex-column h-100" style={{justifyContent:'space-around'}}>
                            <Card.Title>
                              {m.title.map((m,index)=><div key={`News-ID-title-${index}`} className="mb-2">{m}</div>)}
                            </Card.Title>
                            <Card.Title className="text-center">
                              <a href={m.BtnUrl} className="btn btn-dark">{m.BtnText}</a>
                            </Card.Title>
                            <Card.Text>
                              <span>{m.subtitle}</span><br/>
                            </Card.Text>
                            <Card.Text className={index % 2 === 1 ? 'text-end': ''}>
                              <span className="blockquote-footer">
                                26-Dec-2022
                              </span>
                            </Card.Text>
                          </div>
                        </Card.Body>
                      </Col>
                    </Row>
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

export default News;