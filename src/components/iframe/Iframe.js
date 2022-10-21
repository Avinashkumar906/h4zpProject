import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

function Iframe(props) {
  const [iframe, setIframe] = useState();
  const [src] = useState(props.data?.src);
  const [ autoplay ] = useState(props.data?.autoplay);
  const [ mute ] = useState(props.data?.mute);
  
  useEffect(() => {
    let suffix = src.indexOf('?') === -1 ? '?': '';
    if(autoplay) suffix+=`&autoplay=1`;
    if(mute) suffix+=`&mute=1`;
    setIframe(src+suffix);
    return () => console.log('clean iframe')
  }, [autoplay, mute, src])
  
  return (
    <Container className={`p-0 ${props.data?.theme}`} fluid data-aos="fade-up">
      <Container fluid={props.data?.fluid}>
        <Row style={{ minHeight: '560px' }}>
          <Col data-aos="fade-up">
            <iframe title="this is iframe" src={iframe} allow='autoplay' className="w-100 h-100" scrolling="no" frameBorder="0" allowFullScreen></iframe>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default Iframe;