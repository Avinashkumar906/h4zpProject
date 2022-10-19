import React from "react";
import { Container } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';

function Banner(props) {
  return (
    <Container className={`p-0 ${props.theme}`} fluid>
      <Container className="p-0" fluid={props.fluid}>
        <Carousel>
          {
            props.data?.list?.map((m,index) => (
              <Carousel.Item key={`carousel-${index}`} style={{height:'calc(100vh - 56px)'}}>
                <img
                  className="d-block h-100 w-100"
                  style={{objectPosition:'center center',objectFit:'cover'}}
                  src="https://images.squarespace-cdn.com/content/v1/572e314422482e952aae8c6c/1496011701472-N1ESFLMYP39Z983OCUVV/header-%28reduced%29.jpg?format=2500w"
                  alt="First slide"/>
                <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
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