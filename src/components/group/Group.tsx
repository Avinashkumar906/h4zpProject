import { useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { cloudinaryUtilARWidth, isTrue } from '../../util/mockData.util';
import Parser from 'html-react-parser';
import LightBox from '../lightbox/LightBox';
import * as React from 'react';

function Group(props: any) {
  const [dimention, setDimention] = useState<any>();
  const [lightBoxState, setLightBoxState] = useState({ show: false, activeIndex: 0 });
  const placeholder = useRef(null);

  useEffect(() => {
    if (placeholder.current?.clientWidth || placeholder.current?.clientHeight) {
      setDimention({
        height: placeholder.current.clientHeight,
        width: placeholder.current.clientWidth,
      });
    }
  }, []);

  const toggleLightBox = (visible, index) => {
    setLightBoxState({ show: visible || !lightBoxState.show, activeIndex: index || 0 });
  };

  return (
    <Container className={`p-0 ${props.data?.theme || ''}`} fluid>
      <Container className="py-5 overflow-hidden" fluid={isTrue(props.data.fluid)}>
        <Row className="justify-content-center pb-3">
          {props.data?.title && (
            <Col sm={12} data-aos="fade-in">
              <div className="text-center display-2 pb-4">
                <strong>{props.data?.title}</strong>
              </div>
            </Col>
          )}
          {props.data?.list?.map((m, index) => (
            <Col
              data-aos="fade-up"
              ref={placeholder}
              key={`Group-ID-${index}`}
              md={12 / props.data.itemInRow}
              className="text-center p-2"
            >
              <img
                onClick={() => isTrue(props.data.clickable) && toggleLightBox(null, index)}
                style={{ cursor: `${isTrue(props.data.clickable) && 'pointer'}` }}
                alt=""
                className={`w-100 mb-2 ${props.data?.style}`}
                src={
                  dimention &&
                  cloudinaryUtilARWidth({ url: m.url, ...dimention, ar: props.data?.imgRatio })
                }
              />
              {m.title && (
                <div className={`text-center h5`}>
                  <span>{m.title}</span>
                </div>
              )}
            </Col>
          ))}
        </Row>
        {props.data?.description && (
          <Row className="">
            <div className="h4 my-4">{Parser(props.data?.description)}</div>
          </Row>
        )}
        {lightBoxState.show && (
          <LightBox
            lightBoxState={lightBoxState}
            toggleLightBox={toggleLightBox}
            data={props.data.list}
          />
        )}
      </Container>
    </Container>
  );
}

export default React.memo(Group);
