import { Fragment, useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DynamicComponent from '../components/Component';
import { getFormatedDate, optimizeData } from '../util/mockData.util';
import Parser from 'html-react-parser';
import { startCase } from 'lodash';
import { subscribeBlogList, subscribePageComponents } from '../firebase/getFromFirestore';
import NotFound from './NotFound';

function Blog() {
  const [data, setData] = useState([]);
  const [dataState, setDataState] = useState('pending');
  const [blogList, setBlogList] = useState([]);
  const nodata = () => {
    const contentMap = {
      offline: 'You are offline.',
      pending: 'Loading Data',
    };

    return (
      <NotFound>
        <div>{contentMap[dataState] || 'Something went wrong, please try after some time!'}</div>
      </NotFound>
    );
  };
  useEffect(() => {
    let unsubscribePage, unsubscribeBlogs;

    const init = async () => {
      // subscribe to page components
      unsubscribePage = await subscribePageComponents('blog', (res) => {
        setDataState(res.status); // offline, success, etc.
        setData(res.data || []); // always an array
      });

      // subscribe to blog list
      unsubscribeBlogs = subscribeBlogList((res) => {
        setBlogList(res);
      });
    };

    init();

    return () => {
      if (unsubscribePage) unsubscribePage();
      if (unsubscribeBlogs) unsubscribeBlogs();
    };
  }, []);

  return dataState === 'success' ? (
    <Fragment>
      {data.map((m) => (
        <div key={m.id} style={{ position: 'relative' }}>
          <DynamicComponent data={m.data} id={m.id}></DynamicComponent>
        </div>
      ))}
      {blogList.length !== 0 && (
        <Row className="mt-5">
          <Col xl={12}>
            <div className="text-center display-2 pt-3">
              <strong>Our Recent Activities</strong>
            </div>
          </Col>
          {blogList.map((m, index) => (
            <Container key={m.id} fluid className={index % 2 === 0 ? 'pt-4' : 'bg-light pt-4'}>
              <Container className="py-5">
                <Card
                  className="b-radius-0"
                  style={{ border: '0', background: 'transparent', overflow: 'hidden' }}
                >
                  <Row>
                    <Col sm="12" style={{ maxHeight: '75vh' }}>
                      <Card.Img
                        className="react-parallax-bgimage b-radius-0"
                        src={optimizeData({ url: m.data.imageUrl })}
                      />
                    </Col>
                    <Col className="text-left mt-3">
                      <div className="blockquote-footer mt-3 mb-0">
                        {startCase(m.data?.createdBy.toLowerCase()) || 'Anonymous'}
                      </div>
                    </Col>
                    <Col className="text-end mt-3">
                      <span className="btn btn-dark">
                        <Link to={`/${m.id}`}>Read More</Link>
                      </span>
                    </Col>
                  </Row>
                  <hr />
                  <Row style={{ maxHeight: '23vh', textOverflow: 'elipses' }}>
                    <Col sm={5} md={4}>
                      <div className="d-flex justify-content-arround flex-column">
                        <Card.Text className="h2">
                          <strong>{m.data.title}</strong>
                        </Card.Text>
                        <div className="text-muted">
                          {getFormatedDate(m.data?.date, 'DD MMMM, YYYY')}
                        </div>
                      </div>
                    </Col>
                    <Col sm={7} md={8}>
                      <Card.Title className="h3 text-justify" style={{ whiteSpace: 'pre-wrap' }}>
                        {Parser(m.data?.description || '')}
                      </Card.Title>
                    </Col>
                  </Row>
                </Card>
              </Container>
            </Container>
          ))}
        </Row>
      )}
    </Fragment>
  ) : (
    <Fragment>{nodata()}</Fragment>
  );
}

export default Blog;
