import { useEffect, useRef, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import { Parallax } from 'react-parallax';
import { cloudinaryUtilFixedHnW, isTrue } from '../../util/mockData.util';
import * as React from 'react';

function Banner(props: any) {
  const [dimention, setDimention] = useState<any>();
  const placeholder = useRef(null);

  useEffect(() => {
    if (placeholder.current?.clientWidth || placeholder.current?.clientHeight) {
      setDimention({
        height: placeholder.current.clientHeight,
        width: placeholder.current.clientWidth,
      });
    }
  }, []);

  return (
    <Container className={`p-0 ${props.data?.theme || ''}`} fluid>
      <Container
        className="p-0"
        fluid={isTrue(props.data?.fluid)}
        ref={placeholder}
        data-aos="fade-in"
      >
        <div className="loader-container">
          <Spinner animation="border" />
        </div>
        <Carousel
          fade
          variant="light"
          indicators={props.data?.list?.length > 1}
          controls={props.data?.list?.length > 1}
        >
          {props.data?.list?.map((m, index) => (
            <Carousel.Item
              key={`${props.id}-${index}`}
              style={{ height: `${props.data?.height || 100}vh` }}
            >
              {props.data?.parallax ? (
                <Parallax
                  className="d-block h-100 w-100"
                  bgImage={dimention && cloudinaryUtilFixedHnW({ url: m.url, ...dimention })}
                  bgImageAlt="the cat"
                  strength={300}
                >
                  {/* Content goes here. Parallax height grows with content height. */}
                </Parallax>
              ) : (
                <img
                  className="react-parallax-bgimage"
                  // style={{ objectPosition: 'center center', objectFit: 'cover', backgroundAttachment: 'fixed' }}
                  src={m.url}
                  alt={`slide ${index}`}
                />
              )}
              {/* style={{background:'rgba(0,0,0,0.4)'}} */}
              <Carousel.Caption>
                <div className="h1 m-0 p-2">{m.title}</div>
                <div className="h3 m-0 p-2">{m.subTitle}</div>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </Container>
  );
}

export default React.memo(Banner);
