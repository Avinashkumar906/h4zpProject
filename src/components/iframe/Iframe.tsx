import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { IframeType, isTrue, smartParse } from '../../util/mockData.util';
import { safeParseHtml } from '../editor/rte.util';
type componentPropType = {
  data: IframeType | undefined;
  id: string;
};

function Iframe({data,id}: componentPropType) {
  console.log(data)
  const [iframe, setIframe] = useState<any>();
  const [src] = useState(data?.url);
  const [autoplay] = useState(data?.autoplay);
  const [mute] = useState(data?.mute);
  const [fluid] = useState(data?.fluid);
  const [description] = useState(safeParseHtml(data?.description));

  useEffect(() => {
    let suffix = src.indexOf('?') === -1 ? '?' : '';
    if (isTrue(autoplay)) suffix += `&autoplay=1`;
    if (isTrue(mute)) suffix += `&mute=1`;
    setIframe(src + suffix);
  }, [autoplay, mute, src]);

  return (
    <Container className="p-8" 
      style={{
        backgroundColor: `${data?.theme || ''}`,
      }}
      fluid >
      <Container fluid={smartParse(fluid)}>
        <Row>
          {data?.title && (
            <Col sm={12} data-aos="fade-in" className="my-2">
              <div className="text-center h1">
                <strong>{data?.title}</strong>
              </div>
            </Col>
          )}
          <Col sm={12} data-aos="fade-in" className="">
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

          {description && (
            <Col sm="12" data-aos="fade-in">
              <div className="lead" style={{ whiteSpace: 'pre-wrap' }}>
                {description}
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </Container>
  );
}

export default Iframe;
