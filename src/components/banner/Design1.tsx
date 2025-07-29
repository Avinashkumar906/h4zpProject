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
import CloudinaryImg from '../common/Image';

type componentPropType = {
  data: BannerType | undefined;
  id?: string;
};

function Design1({ data }: componentPropType) {
  const toolbarMargin = data.order == 0 && data.height == 100 ? '4rem 0' : '0';
  const measureUnit = 'vh';
  const descriptionHtml = safeParseHtml(data.description);

  const content = () =>
    data.url ? (
      <div className="h-100">
        <div
          className={`py-8 px-2 d-flex w-100 h-100 ${data.contentPosition?.horizontal} ${data.contentPosition?.verticle}`}
        >
          {descriptionHtml && (
            <div
              className={`p-4 glass col-sm-${data.contentWidth}`}
              style={{ backgroundColor: data.background, margin: toolbarMargin }}
            >
              {descriptionHtml}
            </div>
          )}
        </div>
      </div>
    ) : (
      <div className="p-4 text-center h3">Please add url to see content!</div>
    );

  return (
    <Container className="p-0 h-100" fluid={smartParse(data?.fluid)}>
      <ParallaxBanner>
        <ParallaxBannerLayer speed={-20}>
          <img
            src={cloudinaryUtilForUrl({ url: data?.url, quality: 'auto' })}
            className="h-100 w-100 object-fit-cover"
            // src={data.url}
            // alt={`Banner url ${data.url}`}
          />
        </ParallaxBannerLayer>
        {/* <ParallaxBannerLayer speed={-20}></ParallaxBannerLayer> */}
        <div style={{ height: `${data?.height || 100}${measureUnit}` }}>{content()}</div>
      </ParallaxBanner>
    </Container>
  );
}

export default React.memo(Design1);
