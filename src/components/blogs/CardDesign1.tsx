import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './css/CardDesign1.css';
import { BlogListType, cloudinaryUtilForUrl } from '../../util';
import Description from '../common/Description';
import { useEffect, useRef, useState } from 'react';

type componentPropType = {
  data: BlogListType[] | undefined;
  id: string;
};
const CardDesign1 = ({ data, id }: componentPropType) => {
  const [dimention, setDimention] = useState<{ height: number; width: number }>();
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
    <Container className="py-4">
      <Row className="g-3">
        {data.map((item, index) => (
          <Col key={id + index} xs={12} md={4}>
            <Card ref={placeholder} className="impact-card h-100">
              <Card.Img
                variant="top"
                src={cloudinaryUtilForUrl({ url: item.url, ...dimention, crop: 'fit' })}
                // src={item.url}
                alt={item.title}
                className="impact-card-img"
              />
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title className="fs-5">{item.title}</Card.Title>
                  <Description description={item.description} />
                </div>
                <div className="mt-3 gap-2 d-flex justify-content-between">
                  <Button className={item.btnColor} size="sm" href={item.BtnUrl}>
                    {item.BtnText}
                  </Button>
                  <small className="text-muted text-end">
                    — {item.credit || 'Anonymous'}, {item.date}
                  </small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CardDesign1;
