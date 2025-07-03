import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './css/MinimalCard.css';
import { GroupListType } from '../../util';
import { Col, Container, Row } from 'react-bootstrap';
import { useState } from 'react';
import { safeParseHtml } from '../editor/rte.util';

type componentPropType = {
  data: GroupListType[] | undefined;
  id: string;
};

const MinimalCard = ({ data, id }: componentPropType) => {
  // const [parsed] = useState()
  return (
    <Container className="">
      <Row className="g-3 text-center">
        {data.map((item, index) => (
          <Col
            key={id + index}
            xs={12}
            sm={4}
            className="d-flex justify-content-center align-items-center"
          >
            <Card className="minimal-card" data-aos="fade-up" data-aos-duration="600">
              <Card.Img variant="top" src={item.url} alt={'Card' + index} />
              <Card.Body>
                {safeParseHtml(item.description) && <div>{safeParseHtml(item.description)}</div>}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MinimalCard;
