import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { IframeType, isTrue, smartParse } from '../../util/mockData.util';
import Title from '../common/Title';
import Description from '../common/Description';
import { safeParseHtml } from '../editor/rte.util';
type componentPropType = {
  data: IframeType | undefined;
  id: string;
};

function Iframe({ data }: componentPropType) {
  const [iframe, setIframe] = useState<string>();
  const [src] = useState(data?.url);
  const [autoplay] = useState(data?.autoplay);
  const [mute] = useState(data?.mute);
  const [fluid] = useState(data?.fluid);

  useEffect(() => {
    let suffix = src.indexOf('?') === -1 ? '?' : '';
    if (isTrue(autoplay)) suffix += `&autoplay=1`;
    if (isTrue(mute)) suffix += `&mute=1`;
    setIframe(src + suffix);
  }, [autoplay, mute, src]);

  return (
    <Container
      style={{
        backgroundColor: `${data?.theme || ''}`,
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
          <Col sm={12} data-aos="slide-up" className="">
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
          {safeParseHtml(data.description) && (
            <Col className="pb-8">
              <Description description={data.description} />
            </Col>
          )}
        </Row>
      </Container>
    </Container>
  );
}

export default Iframe;
