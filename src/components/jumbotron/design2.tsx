import { Card, Col, Row } from 'react-bootstrap';
import { JumbotronType } from '../../util/mockData.util';
import Description from '../common/Description';

function Design2({ data }: { data: JumbotronType; id: string }) {
  return (
    <Row className="justify-content-center align-items-center">
      <Col className="w-100">
        <div className="rounded-0 border-0">
          <Card.Body className="py-5 p-md-5 p-sm-2">
            <Card.Text className="h1 text-center">{data?.title}</Card.Text>
            <Description description={data.description} />
            {/* <Buttons id={id} data={data.btnList} /> */}
          </Card.Body>
        </div>
      </Col>
    </Row>
  );
}

export default Design2;
