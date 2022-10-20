import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

function Iframe(props) {
  const [src,setSrc] = useState(props.data?.src);
  
  useEffect(() => {
    let suffix = src.indexOf('?') === -1 ? '?': '';

    if(props.data?.autoplay)
      suffix+=`&autoplay=1`;
    if(props.data?.mute)
      suffix+=`&mute=1`;

    setSrc(src+suffix);
    return () => console.log('clean iframe')
  }, [])
  
  return (
    <Container className={`p-0 ${props.data?.theme}`} fluid>
      <Container fluid={props.data?.fluid}>
        <Row style={{ minHeight: '560px' }}>
          <Col>
            <iframe title="this is iframe" src={src} allow='autoplay' className="w-100 h-100" scrolling="no" frameBorder="0" allowFullScreen></iframe>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default Iframe;