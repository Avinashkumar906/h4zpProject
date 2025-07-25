import { Container, Row } from 'react-bootstrap';
import { CTAGroupType, smartParse } from '../../util';
import DropdownCards from './Card';
import EarlyParallax from '../common/EarlyParallax';
import Title from '../common/Title';
import Description from '../common/Description';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import ModalGroup from './ModalGroup';

type ComponentPropType = {
  data: CTAGroupType;
  id?: string;
};
const CTAGroup = ({ data, id }: ComponentPropType) => {
  const columnBreakpoints = {
    576: 12 / +data.column.sm,
    768: 12 / +data.column.md,
    992: 12 / +data.column.lg,
    1200: 12 / +data.column.xl,
  };

  const content = () => {
    switch (data.ctaMode) {
      case 'dropdown':
        return (
          <Masonry>
            {data.list?.map((item, index) => (
              <DropdownCards key={id + index} data={item} id={id} />
            ))}
          </Masonry>
        );
      case 'modal':
        return <ModalGroup data={data} id={id} />;
      default:
        return (
          <Masonry>
            {data.list?.map((item, index) => (
              <DropdownCards key={id + index} data={item} id={id} />
            ))}
          </Masonry>
        );
    }
  };

  return (
    <Container
      className="py-8 px-2"
      style={{
        backgroundColor: data?.background,
      }}
      fluid
    >
      <Container fluid={smartParse(data.fluid)}>
        <EarlyParallax opacity={[0.4, 1]} endAnimation={1.6}>
          <Row className="justify-content-center pb-3">
            <Title title={data.title} />
          </Row>
          <ResponsiveMasonry columnsCountBreakPoints={columnBreakpoints}>
            {content()}
          </ResponsiveMasonry>
          <Row className=""></Row>
          <Description description={data?.description} />
        </EarlyParallax>
      </Container>
    </Container>
  );
};

export default CTAGroup;
