import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { IframeType, isTrue, smartParse } from '../../util/mockData.util';
import Title from '../common/Title';
import Description from '../common/Description';
import { safeParseHtml } from '../editor/rte.util';
import { getRGBAString } from '../common/ColorField';
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
    (descriptionHtml && horizontal === 'justify-content-center') || !descriptionHtml ? 12 : 6;
  const isReverse =
    (mdGridSize === 6 && horizontal === 'justify-content-end') ||
    (mdGridSize === 12 && verticle === 'align-items-end');

  useEffect(() => {
    let suffix = src.indexOf('?') === -1 ? '?' : '';
    if (isTrue(autoplay)) suffix += `&autoplay=1`;
    if (isTrue(mute)) suffix += `&mute=1`;
    setIframe(src + suffix);
  }, [autoplay, mute, src]);

  return (
    <Container
      className="px-2"
      style={{
        backgroundColor: `${getRGBAString(data?.theme) || ''}`,
      }}
      fluid
    >
      <Container fluid={smartParse(fluid)}>
        <Row>
          {data?.title && (
            <Col className="pt-8">
              <Title title={data?.title} />
            </Col>
          )}
          <Row>
            {descriptionHtml && (
              <Col
                sm={12}
                md={mdGridSize}
                className={`${isReverse ? 'order-1' : 'order-0'} d-flex ${verticle} `}
                style={{ minHeight: '10rem' }}
              >
                <div
                  className="p-4 shadow-sm glass w-100 text-center"
                  style={{ zIndex: 0, backgroundColor: getRGBAString(data?.contentBg) }}
                >
                  {descriptionHtml}
                </div>
              </Col>
            )}
            <Col sm={12} md={mdGridSize} className="d-flex align-items-center">
              <iframe
                title={data?.title || 'Random clip.'}
                src={iframe}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="responsive-iframe"
                scrolling="no"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </Col>
          </Row>
        </Row>
      </Container>
    </Container>
  );
}

export default Iframe;
