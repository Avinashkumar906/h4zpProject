import { Col, Container, Row } from 'react-bootstrap';
import { DropdownType, smartParse } from '../../util';
import DropdownCards from './Card';
import { getRGBAString } from '../common/ColorField';
import EarlyParallax from '../common/EarlyParallax';
import Title from '../common/Title';
import Description from '../common/Description';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

type ComponentPropType = {
  data: DropdownType;
  id?: string;
};
const Dropdown = ({ data, id }: ComponentPropType) => {
  const columnBreakpoints = {
    576: 12 / +data.column.sm,
    768: 12 / +data.column.md,
    992: 12 / +data.column.lg,
    1200: 12 / +data.column.xl,
  };

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
          <ResponsiveMasonry columnsCountBreakPoints={columnBreakpoints}>
            <Masonry>
              {data.list?.map((item, index) => (
                <DropdownCards key={id + index} data={item} id={id} />
              ))}
            </Masonry>
          </ResponsiveMasonry>
          <Row className=""></Row>
          {/* <DropdownCards data={data.list} id={id}/> */}
          <Description description={data?.description} />
        </EarlyParallax>
      </Container>
    </Container>
  );
};

export default Dropdown;
