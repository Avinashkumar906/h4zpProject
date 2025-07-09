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
            <Card className="minimal-card">
              <Card.Img variant="top" src={item.url} alt={'Card' + index} />
              {safeParseHtml(item.description) && (
                <div className="card-body">{safeParseHtml(item.description)}</div>
              )}
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MinimalCard;
