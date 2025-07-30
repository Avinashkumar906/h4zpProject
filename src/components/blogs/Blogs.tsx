import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BlogType, smartParse } from '../../util/mockData.util';
import * as React from 'react';
import Title from '../common/Title';
import CardDesign1 from './CardDesign1';
import CardDesign2 from './CardDesign2';

type componentPropType = {
  data: BlogType | undefined;
  id: string;
};

function Blogs({ data, id }: componentPropType) {
  const content = (data: BlogType, id: string) => {
    switch (data.design) {
      case 'design1':
        return <CardDesign1 data={data.list} id={id} />;
      case 'design2':
        return <CardDesign2 data={data.list} id={id} />;
      default:
        return null;
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
        <Row>
          <Title title={data.title} />
          {content(data, id)}
          <Col xl={12}>
            <div className="text-end">
              <Link to={'/blog'} className="text-dark">
                More..
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default React.memo(Blogs);
