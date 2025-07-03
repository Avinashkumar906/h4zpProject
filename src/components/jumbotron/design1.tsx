import { Card, Col, Row } from 'react-bootstrap';
import Buttons from './Buttons';
import { JumbotronType, smartParse } from '../../util/mockData.util';
import Description from '../common/Description';

function Design1({ data, id }: { data: JumbotronType; id: string }) {
  return (
    <Row className="justify-content-center align-items-center">
      <Col className="w-100">
        <Card className="text-center rounded-4 shadow-sm bg-light" data-aos="slide-up">
          <Card.Body className="p-5">
            <Card.Text className="h1">{data?.title}</Card.Text>
            <Description description={data.description} />
            <Buttons id={id} data={data.btnList} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default Design1;
