import { useEffect, useRef, useState } from 'react';
import { Container } from 'react-bootstrap';
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

type componentPropType = {
  data: BannerType | undefined;
  id?: string;
};

function Design1({ data }: componentPropType) {
  // const measureUnit = data.order == 0 && data.height == 100 ? 'dvh' : 'vh';
  const measureUnit = 'vh';
  const descriptionHtml = safeParseHtml(data.description);

  const content = () =>
    // <Container className="p-0 h-100" fluid={smartParse(data?.fluid)} ref={placeholder}>
    data.url ? (
      <div className="h-100">
        <div
          className={`py-8 px-2 d-flex w-100 h-100 ${data.contentPosition?.horizontal} ${data.contentPosition?.verticle}`}
        >
          {descriptionHtml && (
            <div
              className={`p-4 glass col-sm-${data.contentWidth}`}
              style={{ backgroundColor: getRGBAString(data?.contentBg) }}
            >
              {descriptionHtml}
            </div>
          )}
        </div>
      </div>
    ) : (
      <div className="p-4 text-center h3">Please add url to see content!</div>
    );
  // </Container>

  return (
    <Container className="p-0 h-100" fluid={smartParse(data?.fluid)}>
      <ParallaxBanner>
        <ParallaxBannerLayer speed={-40}>
          <img
            className="h-100 w-100 object-fit-cover"
            src={cloudinaryUtilForUrl({ url: data?.url, quality: 'auto' })}
            alt={`Banner url ${data.url}`}
          />
        </ParallaxBannerLayer>
        <ParallaxBannerLayer speed={-20}>{content()}</ParallaxBannerLayer>
        <div style={{ height: `${data?.height || 100}${measureUnit}` }}></div>
      </ParallaxBanner>
    </Container>
  );
}

export default React.memo(Design1);
