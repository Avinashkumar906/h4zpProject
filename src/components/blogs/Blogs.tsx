import { useEffect, useRef, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { cloudinaryUtilARWidth, isTrue } from '../../util/mockData.util';
import Parser from 'html-react-parser';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import * as React from 'react';

function Blogs(props: any) {
  const [dimention, setDimention] = useState<any>();
  const placeholder = useRef(null);

  useEffect(() => {
    if (placeholder.current?.clientWidth || placeholder.current?.clientHeight) {
      setDimention({
        height: placeholder.current.clientHeight,
        width: placeholder.current.clientWidth,
      });
    }
  }, []);

  return (
    <Container className={`p-0 ${props.data?.theme || ''}`} fluid>
      <Container className="py-5" fluid={isTrue(props.data.fluid)}>
        <Row>
          {props.data?.title && (
            <Col xl={12} data-aos="fade-in">
              <div className="text-center display-2 pb-4">
                <strong>{props.data?.title}</strong>
              </div>
            </Col>
          )}
          {
            <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 767: 2, 1199: 3 }}>
              <Masonry>
                {props.data?.list?.map((m, index) => (
                  <Col
                    key={`Blogs-ID-${index}`}
                    className="pb-5 m-auto"
                    ref={placeholder}
                    style={{ maxWidth: '36rem' }}
                  >
                    <Card data-aos="fade-up" className={`h-100 border-0 ${props.data?.theme}`}>
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
                      {/* <div className="border-bottom-2 w-100 ms-auto" ></div> */}
                    </Card>
                  </Col>
                ))}
              </Masonry>
            </ResponsiveMasonry>
          }
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
