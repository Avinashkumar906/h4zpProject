import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { IframeType, isTrue, smartParse } from '../../util/mockData.util';
import Title from '../common/Title';
import Description from '../common/Description';
import { safeParseHtml } from '../editor/rte.util';
import { getRGBAString } from '../common/ColorField';
import EarlyParallax from '../common/EarlyParallax';
type componentPropType = {
  data: IframeType;
  id?: string;
};

function Iframe({ data }: componentPropType) {
  const [iframe, setIframe] = useState<string>();
  const [src] = useState(data?.iframeUrl);
  const [autoplay] = useState(data?.youtube?.autoplay);
  const [mute] = useState(data?.youtube?.mute);
  const [fluid] = useState(data?.fluid);
  const descriptionHtml = safeParseHtml(data.description);
  const { horizontal, verticle } = data.contentPosition ?? {};
  const mdGridSize =
    (descriptionHtml && horizontal === 'justify-content-center') || !descriptionHtml
      ? 12
      : Number(data.contentWidth);
  const isReverse =
    (mdGridSize === Number(data.contentWidth) && horizontal === 'justify-content-end') ||
    (mdGridSize === 12 && verticle === 'align-items-end');

  useEffect(() => {
    let suffix = src.indexOf('?') === -1 ? '?' : '';
    if (isTrue(autoplay)) suffix += `&autoplay=1`;
    if (isTrue(mute)) suffix += `&mute=1`;
    setIframe(src + suffix);
  }, [autoplay, mute, src]);

  return (
    <Container
      className="py-8 px-3"
      style={{
        backgroundColor: `${getRGBAString(data?.theme) || ''}`,
      }}
      fluid
    >
      <Container fluid={smartParse(fluid)}>
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
                style={{ zIndex: 10, backgroundColor: getRGBAString(data?.contentBg) }}
              >
                {descriptionHtml}
              </EarlyParallax>
            </Col>
          )}
          <Col
            sm={12}
            md={12 - mdGridSize}
            className="d-flex justify-content-center align-items-center p-0"
          >
            <EarlyParallax scale={[0.7, 1]} endAnimation={1.6} className="w-100">
              <iframe
                title={data?.title || 'Random clip.'}
                src={iframe}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="responsive-iframe rounded shadow-sm"
                style={{ height: `${data?.height || 100}vh` }}
                scrolling="no"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </EarlyParallax>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Iframe;
