import React from "react";
import { Container } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';

function Banner(props) {
  return (
    <Container className={`p-0 ${props.data?.theme}`} fluid>
      <Container className="p-0" fluid={props.data?.fluid}>
        <Carousel>
          {
            props.data?.list?.map((m, index) => (
              <Carousel.Item key={`${props.id}-${index}`} style={{ height: 'calc(100vh - 56px)' }}>
                <img
                  className="d-block h-100 w-100"
                  style={{ objectPosition: 'center center', objectFit: 'cover' }}
                  src={m.url}
                  alt={`slide ${index}`} />
                <Carousel.Caption>
                  <h3>{m.title}</h3>
                  <p>{m.subTitle}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))
          }
        </Carousel>
      </Container>
    </Container>
  )
}

export default Banner;