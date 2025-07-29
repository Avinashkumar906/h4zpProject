import { Container, Row } from 'react-bootstrap';
import { smartParse, TimelineType } from '../../util';
import EarlyParallax from '../common/EarlyParallax';
import CronoTimeline from './CronoTimeline';
import Title from '../common/Title';
import Description from '../common/Description';

type componentPropsType = {
  data: TimelineType;
  id?: string;
};

const Timeline = ({ data, id }: componentPropsType) => {
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
          <CronoTimeline data={data} id={id} />
          <Description description={data?.description} />
        </EarlyParallax>
      </Container>
    </Container>
  );
};

export default Timeline;
