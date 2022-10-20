import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function Group(props) {
  return (
    <Container className={`p-0 ${props.data?.theme}`} fluid>
      <Container className="py-5 overflow-hidden" fluid={props.data?.fluid}>
        <Row className="justify-content-center pb-5">
          {props.data?.list?.map((m,index) => (
            <Col key={`Group-ID-${index}`} xl={props.data?.xl} lg={props.data?.lg} md={props.data?.md} sm={props.data?.sm} className="text-center py-2">
              <img alt="" className={`w-100 ${props.data?.style}`} src={m.url}/>
            </Col> 
          ))}
        </Row>
        <Row className="text-center">
            <div className="h4 my-4">
              {
                props.data?.description.split('\n')
                  .map((m,index)=>
                    <div key={`${props.id}-${index}`} className="mb-2">{m}</div>
                  )
              }
            </div>
        </Row>
      </Container>
    </Container>
  )
}

export default Group;