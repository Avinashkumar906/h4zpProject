import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
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
        <EarlyParallax opacity={[0.4, 1]} endAnimation={1.6}>
          <Row className="justify-content-center pb-3">
            <Title title={data.title} />
            <Row className="g-3 text-center">
              {data.list?.map((item, index) => (
                <Col
                  key={id + index}
                  className={`col-sm-${data.column.sm} col-md-${data.column.md} col-lg-${data.column.lg} col-xl-${data.column.xl}
                     d-flex justify-content-center align-items-center`}
                  // className=""
                >
                  <MinimalCard data={item} id={id} />
                </Col>
              ))}
            </Row>
          </Row>
          <Description description={data?.description} />
        </EarlyParallax>
      </Container>
    </Container>
  );
}

export default React.memo(Group);
