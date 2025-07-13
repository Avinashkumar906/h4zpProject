import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './css/CardDesign1.css';
import { BlogListType, cloudinaryUtilForUrl, getFormatedDate } from '../../util';
import Description from '../common/Description';
import { useEffect, useRef, useState } from 'react';
import { startCase } from 'lodash';
import { Link } from 'react-router-dom';

type componentPropType = {
  data: BlogListType[] | undefined;
  id: string;
};
const CardDesign1 = ({ data, id = 'blog_Item' }: componentPropType) => {
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
      <Row className="gap-4">
        {data.map((item, index) => (
          <Col key={id + index} sm={12}>
            <Card ref={placeholder} className="impact-card radius-0">
              <Card.Img
                variant="top"
                src={cloudinaryUtilForUrl({ url: item.url, ...dimention, crop: 'fit' })}
                // src={item.url}
                alt={item.title}
                className="impact-card-img"
              />
              <Card.Body className="d-flex flex-column ">
                <Row className="align-items-end">
                  <Col className="text-start">
                    — {startCase(item.credit.toLowerCase()) || 'Anonymous'}
                  </Col>
                  <Col className="text-end">
                    <Link className={item.btnColor || 'btn-primary'} to={item.BtnUrl}>
                      {item.BtnText || 'Read more'}
                    </Link>
                  </Col>
                </Row>
                <hr></hr>
                <Row style={{ textOverflow: 'elipses' }}>
                  <Col md={5} lg={4}>
                    <div className="d-flex justify-content-arround flex-column">
                      <Card.Text className="h2">{item.title}</Card.Text>
                      <div className="text-muted">
                        {getFormatedDate(item?.date, 'DD MMMM, YYYY')}
                      </div>
                    </div>
                  </Col>
                  <Col md={7} lg={8}>
                    <Description description={item.description} />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CardDesign1;
