import { Col, Container, Row } from 'react-bootstrap';
import { BannerType, cloudinaryUtilForUrl, isTrue, smartParse } from '../../util/mockData.util';
import * as React from 'react';
import { safeParseHtml } from '../editor/rte.util';
import { getRGBAString } from '../common/ColorField';
import EarlyParallax from '../common/EarlyParallax';

type componentPropType = {
  data: BannerType | undefined;
  id?: string;
};

function design2({ data }: componentPropType) {
  const descriptionHtml = safeParseHtml(data.description);
  const { horizontal, verticle } = data.contentPosition ?? {};
  const mdGridSize =
    (descriptionHtml && horizontal === 'justify-content-center') || !descriptionHtml ? 12 : 5;
  const isReverse =
    (mdGridSize === 5 && horizontal === 'justify-content-end') ||
    (mdGridSize === 12 && verticle === 'align-items-end');

  // useEffect(() => {
  //   if (placeholder.current?.clientWidth || placeholder.current?.clientHeight) {
  //     setDimension({
  //       height: placeholder.current.clientHeight,
  //       width: placeholder.current.clientWidth,
  //     });
  //   }
  // }, []);

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
          <Col
            sm={12}
            md={12 - mdGridSize}
            className={`${isReverse ? 'order-1' : 'order-0'} ${verticle} p-0`}
          >
            <EarlyParallax
              disabled={!isTrue(data.parallax)}
              translateX={[30, 0]}
              // shouldAlwaysCompleteAnimation
              className="p-4 w-100 h-100 text-center d-flex align-items-center"
              style={{ zIndex: 10, backgroundColor: getRGBAString(data?.contentBg) }}
            >
              {descriptionHtml}
            </EarlyParallax>
          </Col>
          <Col sm={12} md={mdGridSize} className="p-0 h-100 d-flex justify-content-center">
            <img
              className="w-100 object-fit-contain"
              src={cloudinaryUtilForUrl({ url: data?.url, quality: 'auto' })}
              alt={`Banner url ${data.url}`}
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default React.memo(design2);
