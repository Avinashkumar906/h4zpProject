import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import { Parallax } from 'react-parallax';
import { cloudinaryUtilFixedHnW } from "../../util/util";

function Banner(props) {
  const [dimention, setDimention] = useState();
  const placeholder = useRef(null);

  useEffect(() => {
    if(placeholder.current?.clientWidth || placeholder.current?.clientHeight){
      setDimention(
        {height:placeholder.current.clientHeight,width:placeholder.current.clientWidth}
      )
    }
  }, [])
  console.log(props.data?.fluid)
  
  return (
    <Container className={`p-0 ${props.data?.theme}`} fluid >
      <Container className="p-0" fluid={props.data.fluid === true} ref={placeholder} data-aos="fade-in">
        <Carousel interval={10000} fade variant="light" indicators={props.data?.list?.length > 1} controls={props.data?.list?.length > 1}>
          {
            props.data?.list?.map((m, index) => (
              <Carousel.Item key={`${props.id}-${index}`} style={{ height: '100vh' }} >
                {
                  props.data?.parallax ? (
                    <Parallax className="d-block h-100 w-100" bgImage={dimention && cloudinaryUtilFixedHnW({url:m.url,...dimention})} bgImageAlt="the cat" strength={300}>
                      {/* Content goes here. Parallax height grows with content height. */}
                    </Parallax>
                  ) : (
                    <img
                      className="react-parallax-bgimage"
                      // style={{ objectPosition: 'center center', objectFit: 'cover', backgroundAttachment: 'fixed' }}
                      src={m.url}
                      alt={`slide ${index}`} />
                  )
                }
                 {/* style={{background:'rgba(0,0,0,0.4)'}} */}
                <Carousel.Caption>
                  <div className="h1 m-0 p-2">{m.title}</div>
                  <div className="h3 m-0 p-2">{m.subTitle}</div>
                </Carousel.Caption>
              </Carousel.Item>
            ))
          }
        </Carousel>
      </Container>
    </Container>
  )
}

export default React.memo(Banner);