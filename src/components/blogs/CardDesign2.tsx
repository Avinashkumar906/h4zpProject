import { Container, Row, Col, Button } from 'react-bootstrap';
import './css/CardDesign2.css';
import { BlogListType, CloudinaryParams, cloudinaryUtilForUrl } from '../../util';
import Description from '../common/Description';
import { useEffect, useRef, useState } from 'react';
import EarlyParallax from '../common/EarlyParallax';

type componentPropType = {
  data: BlogListType[] | undefined;
  id: string;
};

const CardDesign2 = ({ data, id }: componentPropType) => {
  return (
    <Container className="">
      {data.map((item, idx) => (
        <div key={id + idx} className="py-5">
          <EarlyParallax opacity={[0.4, 1]} translateY={['100px', '0px']} endAnimation={1.5}>
            <Row className="align-items-center g-4">
              {/* IMAGE always on top in mobile */}
              <Col xs={12} md={5} className={idx % 2 === 0 ? 'order-md-2' : 'order-md-1'}>
                <img
                  src={cloudinaryUtilForUrl({ url: item.url, quality: 'auto' })}
                  alt={item.title}
                  className="img-fluid rounded shadow-sm impact-img"
                />
              </Col>

              {/* TEXT */}
              <Col xs={12} md={7} className={idx % 2 === 0 ? 'order-md-1' : 'order-md-2'}>
                <div className="h3 fw-semibold mb-3">{item.title}</div>
                <Description description={item.description} />
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <Button href={item.BtnUrl} className={item.btnColor} size="sm">
                    {item.BtnText}
                  </Button>
                  <small className="text-muted">
                    — {item.credit || 'Anonymous'}, {item.date}
                  </small>
                </div>
              </Col>
            </Row>
          </EarlyParallax>
        </div>
      ))}
    </Container>
  );
};

export default CardDesign2;
