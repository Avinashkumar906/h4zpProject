import { Card, Col, Row } from 'react-bootstrap';
import { JumbotronType, smartParse } from '../../util/mockData.util';
import Description from '../common/Description';
import { getRGBAString } from '../common/ColorField';

function Design1({ data, id }: { data: JumbotronType; id: string }) {
  return (
    <Row className="justify-content-center align-items-center px-2">
      <Col className="w-100">
        <div
          style={{
            backgroundColor: `${getRGBAString(data?.theme) || ''}`,
          }}
          className="rounded-4 shadow-sm bg-light"
        >
          <Card.Body className="py-5 px-2 px-md-5">
            <Card.Text className="h1 text-center">{data?.title}</Card.Text>
            <Description description={data.description} />
            {/* <Buttons id={id} data={data.btnList} /> */}
          </Card.Body>
        </div>
      </Col>
    </Row>
  );
}

export default Design1;
