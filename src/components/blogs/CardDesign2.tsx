import { Container, Row, Col, Button } from 'react-bootstrap';
import './css/CardDesign2.css';
import { BlogListType, CloudinaryParams, cloudinaryUtilForUrl } from '../../util';
import Description from '../common/Description';
import { useEffect, useRef, useState } from 'react';

type componentPropType = {
  data: BlogListType[] | undefined;
  id: string;
};

const CardDesign2 = ({ data, id }: componentPropType) => {
  const [dimention, setDimention] = useState<Pick<CloudinaryParams, 'width'>>();
  const placeholder = useRef(null);

  useEffect(() => {
    if (placeholder.current?.clientWidth || placeholder.current?.clientHeight) {
      setDimention({
        // height: placeholder.current.clientHeight,
        width: placeholder.current.clientWidth,
      });
    }
  }, []);

  return (
    <Container className="">
      {data.map((item, idx) => (
        <Row key={id + idx} className="align-items-center g-4">
          {/* IMAGE always on top in mobile */}
          <Col
            xs={12}
            md={5}
            ref={placeholder}
            className={idx % 2 === 0 ? 'order-md-2' : 'order-md-1'}
          >
            <img
              src={cloudinaryUtilForUrl({ url: item.url, ...dimention, crop: 'fit' })}
              alt={item.title}
              className="img-fluid rounded shadow-sm impact-img"
            />
          </Col>

          {/* TEXT */}
          <Col xs={12} md={7} className={idx % 2 === 0 ? 'order-md-1' : 'order-md-2'}>
            <h3 className="fw-semibold mb-3">{item.title}</h3>
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
          <div className="p-4"></div>
        </Row>
      ))}
    </Container>
  );
};

export default CardDesign2;
