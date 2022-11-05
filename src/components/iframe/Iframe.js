import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Parser from 'html-react-parser';

function Iframe(props) {
  const [iframe, setIframe] = useState();
  const [src] = useState(props.data?.url);
  const [autoplay] = useState(props.data?.autoplay);
  const [mute] = useState(props.data?.mute);

  useEffect(() => {
    let suffix = src.indexOf('?') === -1 ? '?' : '';
    if (autoplay) suffix += `&autoplay=1`;
    if (mute) suffix += `&mute=1`;
    setIframe(src + suffix);
  }, [autoplay, mute, src])

  return (
    <Container className={`p-0 ${props.data?.theme}`} fluid data-aos="fade-up">
      <Container fluid={props.data?.fluid}>
        <Row >
          {
            props.data?.title && (
              <Col sm={12} data-aos="fade-in" className="py-5">
                <div className="text-center display-2 pt-5">
                  <strong>{props.data?.title}</strong>
                </div>
              </Col>
            )
          }
          <Col data-aos="fade-up" style={{ minHeight: '560px' }} className="my-3">
            <iframe title={props.data?.title || 'Random clip.'} src={iframe} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" className="w-100 h-100" scrolling="no" frameBorder="0" allowFullScreen></iframe>
          </Col>

          {
            props.data?.description && (
              <Col sm="12" data-aos="fade-in" className="pb-5">
                <div className="h4" style={{ whiteSpace: 'pre-wrap' }}>
                  {Parser(props.data?.description)}
                </div>
              </Col>
            )
          }
        </Row>
      </Container>
    </Container>
  )
}

export default Iframe;