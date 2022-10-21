import React, { useEffect, useRef, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { optimizeData } from "../../util/util";

function News(props) {
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
          <Col xl={12} data-aos="fade-in">
            <div className="text-center display-2 pb-4">
              <strong>{props.data?.title}</strong>
            </div>
          </Col>
          {
            props.data?.list?.map((m, index) => (
              <Col key={`${props.id}-${index}`} xl={12} className="pb-5 mb-5" >
                <Card style={{overflow:'hidden'}} ref={dimention} data-aos="fade-up">
                    <Row>
                      <Col sm={12} lg={5} className={`order-0 order-lg-${index % 2 === 0 ? 1 : 0}`}>
                        <img alt="" className="react-parallax-bgimage" src={optimizeData({url:m.url})}/>
                        {/* <img alt="" className="w-100" src={m.url}/> */}
                      </Col>
                      <Col sm={12} lg={7} className={`order-0 order-lg-${index % 2 === 0 ? 0 : 1}`}>
                        <Card.Body className="h-100">
                          <div className="d-flex flex-column h-100" style={{justifyContent:'space-around'}}>
                            <Card.Title>
                              {
                                m.title.split('\n').map((m,index)=>
                                  <div key={`${props.id}-title-${index}`} className="mb-2">{m}</div>
                                )
                              }
                            </Card.Title>
                            <Card.Title className="text-center">
                              <a href={m.BtnUrl} className="btn btn-dark">{m.BtnText}</a>
                            </Card.Title>
                            <Card.Text>
                              <span>{m.subtitle}</span><br/>
                            </Card.Text>
                            <Card.Text className={'text-end'}>
                              <span className="blockquote-footer">
                                {m.credit || 'Unknown'}
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
          <Col xl={12} data-aos="fade-up">
            <div className="text-end">
              <a href="/" className="text-dark">More..</a>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default News;