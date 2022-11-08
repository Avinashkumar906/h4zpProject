import React, { useEffect, useRef, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { isTrue, optimizeData } from "../../util/util";
import Parser from 'html-react-parser';
import { Link } from "react-router-dom";

function News(props) {
  const [dimention, setDimention] = useState();
  const placeholder = useRef(null);

  useEffect(() => {
    if (placeholder.current?.clientWidth || placeholder.current?.clientHeight) {
      setDimention(
        { height: placeholder.current.clientHeight, width: placeholder.current.clientWidth }
      )
    }
  }, [])

  return (
    <Container className={`p-0 ${props.data?.theme || ''}`} fluid >
      <Container className="py-5" fluid={isTrue(props.data.fluid)}>
        <Row>
          <Col xl={12} data-aos="fade-in">
            <div className="text-center display-2 pb-4">
              <strong>{props.data?.title}</strong>
            </div>
          </Col>
          {
            props.data?.list?.map((m, index) => (
              <Col key={`${props.id}-${index}`} xl={12} className="pb-5 mb-5" >
                <Card style={{ overflow: 'hidden' }} className={`border-0 ${props.data?.theme}`} ref={dimention} data-aos="fade-up">
                  <Row>
                    <Col sm={12} lg={5} className={`order-0 order-lg-${index % 2 === 0 ? 1 : 0}`}>
                      <Card.Img variant="right" alt="" className="react-parallax-bgimage" src={optimizeData({ url: m.url })} />
                      {/* <img alt="" className="w-100" src={m.url}/> */}
                    </Col>
                    <Col sm={12} lg={7} className={`order-0 order-lg-${index % 2 === 0 ? 0 : 1}`}>
                      <Card.Body className="h-100">
                        <div className="d-flex flex-column h-100" style={{ justifyContent: 'space-around' }}>
                          {m.title && <Card.Text className="text-center h3">{m.title}</Card.Text>}
                          <Card.Title className="" style={{ whiteSpace: 'pre-wrap' }}>
                            {Parser(m.description || '')}
                          </Card.Title>
                          <Card.Title className="text-center mb-2">
                            <Link to={m.BtnUrl} className="btn btn-dark">{m.BtnText}</Link>
                          </Card.Title>
                          <Card.Text className={'text-end'}>
                            <span className="blockquote-footer">
                              {m.credit || 'Anonymous'}, {m.date}
                            </span>
                          </Card.Text>
                          <Card.Text className="text-center">
                            <span>{Parser(m.footer || '')}</span><br />
                          </Card.Text>
                        </div>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))
          }
          <Col xl={12} data-aos="fade-up">
            <div className="text-end">
              <Link to="/blog" className="text-dark">More..</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default News;