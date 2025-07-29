// TimelineCard.js
import { Card, Row, Col } from 'react-bootstrap';
import { TimelineListType } from '../../util';
import Description from '../common/Description';

type componentPropsType = {
  data: TimelineListType;
  id?: string;
  position?: string;
};

const TimelineCard = ({ data, position }: componentPropsType) => {
  const hasImage = Boolean(data.url);
  const hasContent = Boolean(data.title || data.description);

  return (
    <div className="border-0 w-100 d-flex justify-content-center my-3">
      <div style={{ maxWidth: '900px' }} className="w-100">
        <Row className="g-2 align-items-center">
          {hasImage && (
            <Col md={hasContent ? 4 : 12} className={`text-center ${position || ''}`}>
              <Card.Img
                src={data.url}
                alt="Timeline"
                style={{ maxHeight: '30vh', objectFit: 'cover' }}
                className="img-fluid"
              />
            </Col>
          )}

          {hasContent && (
            <Col
              md={hasImage ? 8 : 12}
              className={`d-flex flex-column justify-content-center ${hasImage ? 'ps-md-4 ps-3 pt-3 pt-md-0' : 'p-3'}`}
            >
              <Card.Body className="p-0">
                {data.title && <Card.Title className="h5 fw-bold mb-2">{data.title}</Card.Title>}
                {data.description && <Description description={data.description} />}
              </Card.Body>
            </Col>
          )}
        </Row>
      </div>
    </div>
  );
};

export default TimelineCard;
