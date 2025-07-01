import { useEffect, useRef, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Parallax } from 'react-parallax';
import { BannerType, cloudinaryUtilFixedHnW, isTrue, smartParse } from '../../util/mockData.util';
import * as React from 'react';
import HTMLReactParser from 'html-react-parser';

type componentPropType = {
  data: BannerType | undefined;
  id: string;
}

function Banner({data,id}: componentPropType) {
  console.log("Banner.",data)
  const [dimention, setDimention] = useState<any>();
  const placeholder = useRef(null);

  useEffect(() => {
    if (placeholder.current?.clientWidth || placeholder.current?.clientHeight) {
      setDimention({
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
        {
          data.url ? (
            <div style={{ height: `${data?.height || 100}vh` }}>
              {
                isTrue(data?.parallax) ? (
                  <Parallax
                    className="d-block h-100 w-100"
                    bgImage={dimention && cloudinaryUtilFixedHnW({ url: data?.url, ...dimention })}
                    bgImageAlt={`Banner url ${data.url}`}
                    strength={300}
                  >
                    <div className='p-8 d-flex w-100 h-100 justify-content-center align-items-end'>
                      <div>{HTMLReactParser(data.description)}</div>
                    </div>
                  </Parallax>
                ) : (
                  <>
                    <div className='p-8 d-flex w-100 h-100 justify-content-center align-items-end'>
                      <div className="text-white">{HTMLReactParser(data.description)}</div>
                      <img
                        className="react-parallax-bgimage"
                        src={data.url}
                        alt={`Banner url ${data.url}`}
                        style={{position:'absolute', inset:'0', zIndex:'-10'}}
                      />
                    </div>
                  </>
                )}
            </div>
          ) : <div>Please add url to see content!</div>
        }
      </Container>
    </Container>
  );
}

export default React.memo(Banner);
