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
      className="p-4"
      style={{
        backgroundColor: `${data?.theme || ''}`,
        height: `${data?.height ? data.height + 'vh' : '100%'}`,
      }}
      fluid
    >
      <Container className="h-100" fluid={smartParse(data.fluid)}>
        <Design1 data={data} id={id} />
      </Container>
    </Container>
  );
}

export default Jumbotron;
