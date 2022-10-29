import React, { useEffect, useRef, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { cloudinaryUtilARWidth } from "../../util/util";

function Blogs(props) {
  const [dimention, setDimention] = useState();
  const placeholder = useRef(null);

  useEffect(() => {
    if(placeholder.current?.clientWidth || placeholder.current?.clientHeight){
      setDimention(
        {height:placeholder.current.clientHeight,width:placeholder.current.clientWidth}
      )
    }
  }, [])

  return (
    <Container className={`p-0 ${props.data?.theme}`} fluid >
      <Container className="py-5" fluid={props.data?.fluid}>
        <Row>
          {
            props.data?.title && (
              <Col xl={12} data-aos="fade-in">
                <div className="text-center display-2 pb-4">
                  <strong>{props.data?.title}</strong>
                </div>
              </Col>
            )
          }
          {
            props.data?.list?.map((m,index) => (
              <Col key={`Blogs-ID-${index}`} lg={6} sm={12} className="pb-5"  ref={placeholder}>
                <Card data-aos="fade-up" className={`h-100 border-0 ${props.data?.theme}`}>
                  <Card.Body className="rounded h-100">
                    <Card.Title className="text-justify">
                      <div className="h4 mb-2">
                        <span>{m.title}</span>
                      </div>
                      <div className="border-bottom-2 w-50 ms-auto" ></div>
                    </Card.Title>
                    <div className="mb-3">
                      <Card.Img className="h-100 w-100" src={dimention && cloudinaryUtilARWidth({url:m.url, ...dimention, ar:'4:3'})} />
                    </div>
                    <Card.Text className="mb-3 h5 text-justify">
                        <span>{m.subtitle}</span>
                    </Card.Text>
                    <Card.Text className="mb-2 h5 text-end">
                        <a className="btn btn-dark" href={m.BtnUrl}>{m.BtnText}</a>
                    </Card.Text>
                    <Card.Text className="text-end">
                      <span className="blockquote-footer">
                        {m.credit || 'Unknown'}
                      </span>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          }
          <Col xl={12}>
            <div className="text-end">
              <a href="/" className="text-dark">More..</a>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default React.memo(Blogs);