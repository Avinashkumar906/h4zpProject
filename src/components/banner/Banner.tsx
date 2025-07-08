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
  id: string;
};

function Banner({ data }: componentPropType) {
  const [dimension, setDimension] = useState<Pick<CloudinaryParams, 'height' | 'width'>>();
  const placeholder = useRef(null);
  const measureUnit = data.order === 0 && data.height == 100 ? 'dvh' : 'vh';
  // console.log(data.contentBg)
  useEffect(() => {
    if (placeholder.current?.clientWidth || placeholder.current?.clientHeight) {
      setDimension({
        height: placeholder.current.clientHeight,
        width: placeholder.current.clientWidth,
      });
    }
  }, []);

  return (
    <Container
      className="p-0"
      style={{
        backgroundColor: `${data?.theme || ''}`,
      }}
      fluid
    >
      <Container
        className="p-0"
        fluid={smartParse(data?.fluid)}
        ref={placeholder}
        data-aos="fade-in"
      >
        {data.url ? (
          <div style={{ height: `${data?.height || 100}${measureUnit}` }}>
            {isTrue(data?.parallax) ? (
              <Parallax
                className="d-block h-100 w-100"
                bgImage={cloudinaryUtilForUrl({ url: data?.url, ...dimension, crop: 'thumb' })}
                bgImageAlt={`Banner url ${data.url}`}
                strength={300}
              >
                <div
                  className={`py-8 px-2 d-flex w-100 h-100 ${data.contentPosition?.horizontal} ${data.contentPosition?.verticle}`}
                >
                  <div
                    className="p-4 rounded"
                    style={{ backgroundColor: getRGBAString(data?.contentBg) }}
                  >
                    {safeParseHtml(data.description)}
                  </div>
                </div>
              </Parallax>
            ) : (
              <>
                <div
                  className={`py-8 px-2 d-flex w-100 h-100 ${data.contentPosition.horizontal} ${data.contentPosition.verticle}`}
                >
                  <div
                    className="p-4 rounded"
                    style={{ backgroundColor: getRGBAString(data?.contentBg) }}
                  >
                    {safeParseHtml(data.description)}
                  </div>
                  <img
                    className="react-parallax-bgimage"
                    src={data.url}
                    alt={`Banner url ${data.url}`}
                    style={{ position: 'absolute', inset: '0', zIndex: '-10' }}
                  />
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="p-4 text-center h3">Please add url to see content!</div>
        )}
      </Container>
    </Container>
  );
}

export default React.memo(Banner);
