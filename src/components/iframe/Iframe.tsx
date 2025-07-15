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
    (descriptionHtml && horizontal === 'justify-content-center') || !descriptionHtml ? 12 : 7;
  const isReverse =
    (mdGridSize === 7 && horizontal === 'justify-content-end') ||
    (mdGridSize === 12 && verticle === 'align-items-end');

  useEffect(() => {
    let suffix = src.indexOf('?') === -1 ? '?' : '';
    if (isTrue(autoplay)) suffix += `&autoplay=1`;
    if (isTrue(mute)) suffix += `&mute=1`;
    setIframe(src + suffix);
  }, [autoplay, mute, src]);

  return (
    <Container
      className="py-8 px-2"
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
          <Row>
            {descriptionHtml && (
              <Col
                sm={12}
                md={12 - mdGridSize}
                className={`${isReverse ? 'order-1' : 'order-0'} d-flex ${verticle} p-0`}
              >
                <div
                  className="p-4 shadow-sm w-100 text-center d-flex align-items-center"
                  style={{ zIndex: 0, backgroundColor: getRGBAString(data?.contentBg) }}
                >
                  {descriptionHtml}
                </div>
              </Col>
            )}
            <Col sm={12} md={mdGridSize} className="d-flex align-items-center p-0">
              <iframe
                title={data?.title || 'Random clip.'}
                src={iframe}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="responsive-iframe"
                style={{ height: `${data?.height || 100}vh` }}
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
