import { useEffect, useRef, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Parallax } from 'react-parallax';
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

type componentPropType = {
  data: BannerType | undefined;
  id?: string;
};

function Design1({ data }: componentPropType) {
  console.log(data);
  const [dimension, setDimension] = useState<Pick<CloudinaryParams, 'height' | 'width'>>();
  const placeholder = useRef(null);
  //data.order == 0 && data.height == 100 ? 'dvh' : 'vh';
  const measureUnit = data.order == 0 && data.height == 100 ? 'dvh' : 'vh';
  const descriptionHtml = safeParseHtml(data.description);

  useEffect(() => {
    if (placeholder.current?.clientWidth || placeholder.current?.clientHeight) {
      setDimension({
        height: placeholder.current.clientHeight,
        width: placeholder.current.clientWidth,
      });
    }
  }, []);

  const content = (flag: boolean) => (
    <Container className="p-0" fluid={smartParse(data?.fluid)} ref={placeholder}>
      {data.url ? (
        <div style={{ height: `${data?.height || 100}${measureUnit}` }}>
          <div
            className={`py-8 px-2 d-flex w-100 h-100 ${data.contentPosition?.horizontal} ${data.contentPosition?.verticle}`}
          >
            {descriptionHtml && (
              <div
                className="p-4 glass"
                style={{ backgroundColor: getRGBAString(data?.contentBg) }}
              >
                {descriptionHtml}
              </div>
            )}
            {flag && (
              <img
                className="react-parallax-bgimage"
                src={cloudinaryUtilForUrl({ url: data?.url, ...dimension, crop: 'thumb' })}
                alt={`Banner url ${data.url}`}
                style={{ position: 'absolute', inset: '0' }}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="p-4 text-center h3">Please add url to see content!</div>
      )}
    </Container>
  );

  return isTrue(data?.parallax) ? (
    <Parallax
      // className="d-block h-100 w-100"
      bgImage={cloudinaryUtilForUrl({ url: data?.url, ...dimension, crop: 'thumb' })}
      bgImageAlt={`Banner url ${data.url}`}
      strength={300}
    >
      {content(false)}
    </Parallax>
  ) : (
    content(true)
  );
}

export default React.memo(Design1);
