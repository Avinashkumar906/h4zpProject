import CountUp from 'react-countup';
import { MOCK_STATISTICS } from '../../mockdata/component.default';
import { smartParse, StatisticsType } from '../../util';
import { Col, Container, Row } from 'react-bootstrap';
import { getRGBAString } from '../common/ColorField';
import Title from '../common/Title';
import { safeParseHtml } from '../editor/rte.util';
import EarlyParallax from '../common/EarlyParallax';

type componentPropType = {
  data?: StatisticsType;
  id?: string;
};
const Statistics = ({ data, id }: componentPropType) => {
  const descriptionHtml = safeParseHtml(data.description);
  const { horizontal, verticle } = data.contentPosition ?? {};
  const mdGridSize =
    (descriptionHtml && horizontal === 'justify-content-center') || !descriptionHtml
      ? 12
      : +data.contentWidth;
  const isReverse =
    (mdGridSize === +data.contentWidth && horizontal === 'justify-content-end') ||
    (mdGridSize === 12 && verticle === 'align-items-end');

  return (
    <Container
      className="py-8 px-2"
      style={{
        backgroundColor: `${getRGBAString(data?.theme) || ''}`,
      }}
      fluid
    >
      <Container fluid={smartParse(data.fluid)}>
        <Row>
          {data?.title && (
            <Col className="my-2">
              <Title title={data?.title} />
            </Col>
          )}
        </Row>
        <Row>
          {descriptionHtml && (
            <Col
              sm={12}
              md={mdGridSize}
              className={`${isReverse ? 'order-1' : 'order-0'} d-flex ${verticle} p-0`}
            >
              <EarlyParallax
                opacity={[0.4, 1]}
                endAnimation={1.6}
                className="p-4 w-100 h-100 d-flex align-items-center"
                style={{ zIndex: 10 }}
              >
                {descriptionHtml}
              </EarlyParallax>
            </Col>
          )}
          <Col sm={12} md={12 - mdGridSize}>
            <Row className="justify-content-center align-items-center">
              {data.list.map((item, index) => (
                <Col
                  key={id + index}
                  className={`col-sm-${data.column.sm} col-md-${data.column.md} col-lg-${data.column.lg} col-xl-${data.column.xl}`}
                >
                  <div className="p-4 d-flex flex-column align-items-center justify-content-center">
                    <h4 className="mb-1">
                      <CountUp
                        end={item.value}
                        duration={2}
                        separator=","
                        enableScrollSpy
                        scrollSpyOnce
                      />
                      +
                    </h4>
                    <div className="text-muted mb-0 h6">{item.label}</div>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Statistics;
