import { Card, Col, Row } from 'react-bootstrap';
import HTMLReactParser from 'html-react-parser';
import Buttons from './Buttons';
import { JumbotronType } from '../../util/mockData.util';

function Design1({ data, id }: { data: JumbotronType; id: string }) {
  return (
    <Row className="h-100 justify-content-center align-items-center">
      <Col className="w-100">
        <Card className="text-center rounded-4 shadow-sm bg-light" data-aos="fade-in">
          <Card.Body className="p-5">
            <Card.Title className="display-2">
              <strong>{data?.title}</strong>
            </Card.Title>
            <Card.Text className="lead" style={{ whiteSpace: 'pre-wrap' }}>
              {HTMLReactParser(data?.description || '')}
            </Card.Text>
            {<Buttons id={id} data={data.btnList} />}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default Design1;
