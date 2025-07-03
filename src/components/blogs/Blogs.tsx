import { useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BlogType, smartParse } from '../../util/mockData.util';
// import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
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
        backgroundColor: `${data?.theme || ''}`,
      }}
      fluid
    >
      <Container fluid={smartParse(data.fluid)}>
        <Row>
          <Title title={data.title} />
          {content(data, id)}
          {/* {
            <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 767: 2, 1199: 3 }}>
              <Masonry>
                {props.data?.list?.map((m, index) => (
                  <Col
                    key={`Blogs-ID-${index}`}
                    className="pb-5 m-auto"
                    ref={placeholder}
                    style={{ maxWidth: '36rem' }}
                  >
                    <Card data-aos="slide-up" className={`h-100 border-0 ${props.data?.theme}`}>
                      <Card.Body className="rounded h-100">
                        {m.title && (
                          <Card.Title className="text-center">
                            <div className="h3 mb-2">
                              <span>{m.title}</span>
                            </div>
                          </Card.Title>
                        )}
                        <div className="mb-3">
                          <Card.Img
                            className="h-100 w-100"
                            src={
                              dimention &&
                              cloudinaryUtilARWidth({ url: m.url, ...dimention, ar: '4:3' })
                            }
                          />
                        </div>
                        {m.description && (
                          <Card.Text as="div" className="mb-3 h5">
                            {Parser(m.description)}
                          </Card.Text>
                        )}
                        <Card.Text className="mb-2 h5 text-end">
                          <Link className="btn btn-dark" to={m.BtnUrl}>
                            {m.BtnText}
                          </Link>
                        </Card.Text>
                        <Card.Text className="text-end">
                          <span className="blockquote-footer">
                            {m.credit || 'Anonymous'}, {m.date}
                          </span>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Masonry>
            </ResponsiveMasonry>
          } */}
          <Col xl={12}>
            <div className="text-end">
              <Link to="/blog" className="text-dark">
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
