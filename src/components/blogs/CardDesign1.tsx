import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import './css/CardDesign1.css';
import { BlogListType, cloudinaryUtilForUrl, getFormatedDate } from '../../util';
import Description from '../common/Description';
import { startCase } from 'lodash';
import { Link } from 'react-router-dom';
import EarlyParallax from '../common/EarlyParallax';

type componentPropType = {
  data: BlogListType[] | undefined;
  id: string;
};
const CardDesign1 = ({ data, id = 'blog_Item' }: componentPropType) => {
  return (
    <Container className="py-4">
      <Row className="gap-5">
        {data.map((item, index) => (
          <Col key={id + index} sm={12}>
            <EarlyParallax opacity={[0.4, 1]} translateY={['100px', '0px']} endAnimation={1.5}>
              <Card className="impact-card radius-0">
                <Card.Img
                  variant="top"
                  src={cloudinaryUtilForUrl({ url: item.url, quality: 'auto' })}
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
                        <div className="h4">{item.title}</div>
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
            </EarlyParallax>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CardDesign1;
