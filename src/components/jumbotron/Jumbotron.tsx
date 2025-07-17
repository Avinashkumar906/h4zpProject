import Container from 'react-bootstrap/Container';
import { JumbotronType, smartParse } from '../../util/mockData.util';
import Design1 from './design1';
import EarlyParallax from '../common/EarlyParallax';

type componentPropType = {
  data: JumbotronType | undefined;
  id: string;
};

function Jumbotron({ data, id }: componentPropType) {
  return (
    <Container className="py-8 px-2" fluid>
      <Container fluid={smartParse(data.fluid)}>
        <EarlyParallax opacity={[0.4, 1]} endAnimation={1.7}>
          <Design1 data={data} id={id} />
        </EarlyParallax>
      </Container>
    </Container>
  );
}

export default Jumbotron;
