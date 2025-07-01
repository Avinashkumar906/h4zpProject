import Container from 'react-bootstrap/Container';
import { JumbotronType, smartParse } from '../../util/mockData.util';
import Design1 from './design1';

type componentPropType = {
  data: JumbotronType | undefined;
  id: string;
};

function Jumbotron({ data, id }: componentPropType) {
  return (
    <Container
      className="p-8"
      style={{
        backgroundColor: `${data?.theme || ''}`,
      }}
      fluid
    >
      <Container fluid={smartParse(data.fluid)}>
        <Design1 data={data} id={id} />
      </Container>
    </Container>
  );
}

export default Jumbotron;
