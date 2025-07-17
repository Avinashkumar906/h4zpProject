import Container from 'react-bootstrap/Container';
import { JumbotronType, smartParse } from '../../util/mockData.util';
import Design1 from './design1';
import Design2 from './design2';
import EarlyParallax from '../common/EarlyParallax';
import { getRGBAString } from '../common/ColorField';

type componentPropType = {
  data: JumbotronType | undefined;
  id: string;
};

function Jumbotron({ data, id }: componentPropType) {
  const content = (design) => {
    switch (design) {
      case 'design1':
        return <Design1 data={data} id={id} />;
      case 'design2':
        return <Design2 data={data} id={id} />;
      default:
        return <Design1 data={data} id={id} />;
    }
  };

  return (
    <Container
      className="py-8 px-2"
      fluid
      style={{
        backgroundColor: `${data.design === 'design2' ? getRGBAString(data?.theme) || '' : ''}`,
      }}
    >
      <Container fluid={smartParse(data.fluid)}>
        <EarlyParallax opacity={[0.4, 1]} endAnimation={1.7}>
          {content(data.design)}
        </EarlyParallax>
      </Container>
    </Container>
  );
}

export default Jumbotron;
