import { useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
// import { Parallax } from 'react-parallax';
import {
  BannerType,
  CloudinaryParams,
  cloudinaryUtilForUrl,
  isTrue,
  smartParse,
} from '../../util/mockData.util';
import * as React from 'react';
import { safeParseHtml } from '../editor/rte.util';
import { getRGBAString } from '../common/ColorField';
import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';
import Description from '../common/Description';

type componentPropType = {
  data: BannerType | undefined;
  id?: string;
};

function design2({ data }: componentPropType) {
  const descriptionHtml = safeParseHtml(data.description);
  const { horizontal, verticle } = data.contentPosition;
  const mdGridSize = horizontal === 'justify-content-center' ? 12 : 6;
  const isReverse =
    (mdGridSize === 6 && horizontal === 'justify-content-end') ||
    (mdGridSize === 12 && verticle === 'align-items-end');

  // useEffect(() => {
  //   if (placeholder.current?.clientWidth || placeholder.current?.clientHeight) {
  //     setDimension({
  //       height: placeholder.current.clientHeight,
  //       width: placeholder.current.clientWidth,
  //     });
  //   }
  // }, []);

  const content = () =>
    data.url ? (
      <div className="h-100">
        <div
          className={`py-8 px-2 d-flex w-100 h-100 ${data.contentPosition?.horizontal} ${data.contentPosition?.verticle}`}
        >
          {descriptionHtml && (
            <div className="p-4 glass" style={{ backgroundColor: getRGBAString(data?.contentBg) }}>
              {descriptionHtml}
            </div>
          )}
        </div>
      </div>
    ) : (
      <div className="p-4 text-center h3">Please add url to see content!</div>
    );

  return (
    <Container
      className="py-8 px-2"
      style={{
        backgroundColor: `${getRGBAString(data?.theme) || ''}`,
      }}
      fluid
    >
      <Container fluid={smartParse(data.fluid)}>
        <Row className="">
          <Col sm={12} md={mdGridSize} className={isReverse ? 'order-1' : 'order-0'}>
            <Description description={data?.description} />
          </Col>
          <Col sm={12} md={mdGridSize}>
            {/* Image place holder! */}
            <img
              className="h-100 w-100 object-fit-cover"
              src={cloudinaryUtilForUrl({ url: data?.url, quality: 'auto' })}
              alt={`Banner url ${data.url}`}
            />
          </Col>
          {/* <MinimalCard data={data.list} id={id} /> */}
        </Row>
      </Container>
    </Container>
    // <Container className="p-0 h-100" fluid={smartParse(data?.fluid)} ref={placeholder}>
    //   <ParallaxBanner>
    //     <ParallaxBannerLayer speed={isTrue(data?.parallax) ? -30 : 0}>
    //     </ParallaxBannerLayer>
    //     <ParallaxBannerLayer speed={isTrue(data?.parallax) ? -20 : 0}>
    //       {content()}
    //     </ParallaxBannerLayer>
    //     <div style={{ height: `${data?.height || 100}${measureUnit}` }}></div>
    //   </ParallaxBanner>
    // </Container>
  );
}

export default React.memo(design2);
