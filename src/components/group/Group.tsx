import { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { GroupType, smartParse } from '../../util/mockData.util';
import * as React from 'react';
import MinimalCard from './Design1';
import Title from '../common/Title';
import Description from '../common/Description';
import { getRGBAString } from '../common/ColorField';
import EarlyParallax from '../common/EarlyParallax';

type componentPropType = {
  data: GroupType | undefined;
  id: string;
};

function Group({ data, id }: componentPropType) {
  const [lightBoxState, setLightBoxState] = useState({ show: false, activeIndex: 0 });

  const toggleLightBox = (visible, index) => {
    setLightBoxState({ show: visible || !lightBoxState.show, activeIndex: index || 0 });
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
        <EarlyParallax opacity={[0, 1]} endAnimation={1.6}>
          <Row className="justify-content-center pb-3">
            <Title title={data.title} />
            <MinimalCard data={data.list} id={id} />
          </Row>
          <Description description={data?.description} />
        </EarlyParallax>
      </Container>
    </Container>
  );
}

export default React.memo(Group);
