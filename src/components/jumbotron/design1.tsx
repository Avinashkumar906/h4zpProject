import { Card, Col, Row } from 'react-bootstrap';
import Buttons from './Buttons';
import { JumbotronType, smartParse } from '../../util/mockData.util';
import Description from '../common/Description';

function Design1({ data, id }: { data: JumbotronType; id: string }) {
  return (
    <Row className="justify-content-center align-items-center">
      <Col className="w-100">
        <Card
          style={{
            backgroundColor: `${data?.theme || ''}`,
          }}
          className="rounded-4 shadow-sm bg-light"
        >
          <Card.Body className="py-5 p-md-5 p-sm-2">
            <Card.Text className="h1 text-center">{data?.title}</Card.Text>
            <Description description={data.description} />
            <Buttons id={id} data={data.btnList} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default Design1;
