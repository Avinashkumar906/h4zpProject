import { Col, Container, Row } from 'react-bootstrap';
import { DropdownType, smartParse } from '../../util';
import DropdownCards from './Card';
import { getRGBAString } from '../common/ColorField';
import EarlyParallax from '../common/EarlyParallax';
import Title from '../common/Title';
import Description from '../common/Description';

type ComponentPropType = {
  data: DropdownType;
  id?: string;
};
const Dropdown = ({ data, id }: ComponentPropType) => {
  return (
    <Container
      className="py-8 px-2"
      style={{
        backgroundColor: `${getRGBAString(data?.theme) || ''}`,
      }}
      fluid
    >
      <Container fluid={smartParse(data.fluid)}>
        <EarlyParallax opacity={[0.4, 1]} endAnimation={1.6}>
          <Row className="justify-content-center pb-3">
            <Title title={data.title} />
          </Row>
          <Row className="">
            {data.list?.map((item, index) => (
              <Col
                key={id + index}
                sm={Number(data.column.sm)}
                md={Number(data.column.md)}
                lg={Number(data.column.lg)}
                xl={Number(data.column.xl)}
                className="d-flex justify-content-center align-items-start"
              >
                <DropdownCards data={item} id={id} />
              </Col>
            ))}
          </Row>
          {/* <DropdownCards data={data.list} id={id}/> */}
          <Description description={data?.description} />
        </EarlyParallax>
      </Container>
    </Container>
  );
};

export default Dropdown;
