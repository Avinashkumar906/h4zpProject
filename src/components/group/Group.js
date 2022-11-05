import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { cloudinaryUtilARWidth } from "../../util/util";
import Parser from 'html-react-parser';

function Group(props) {
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
    <Container className={`p-0 ${props.data?.theme}`} fluid >
      <Container className="py-5 overflow-hidden" fluid={props.data?.fluid}>
        <Row className="justify-content-center pb-3">
          {
            props.data?.title && (
              <Col sm={12} data-aos="fade-in">
                <div className="text-center display-2 pb-4">
                  <strong>{props.data?.title}</strong>
                </div>
              </Col>
            )
          }
          {props.data?.list?.map((m, index) => (
            <Col data-aos="fade-up" ref={placeholder} key={`Group-ID-${index}`} md={12 / props.data.itemInRow} className="text-center p-2">
              <img alt="" className={`w-100 mb-2 ${props.data?.style}`} src={dimention && cloudinaryUtilARWidth({ url: m.url, ...dimention, ar: props.data?.imgRatio })} />
              {
                m.title && (
                  <div className={`text-center h5`}>
                    <span>{m.title}</span>
                  </div>
                )
              }
            </Col>
          ))}
        </Row>
        {
          props.data?.description && (
            <Row className="" >
              <div className="h4 my-4" >
                {Parser(props.data?.description)}
              </div>
            </Row>
          )
        }
      </Container>
    </Container>
  )
}

export default React.memo(Group);