import { useCallback } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { GroupType, smartParse } from '../../util/mockData.util';
import * as React from 'react';
import MinimalCard from './Design1';
import Title from '../common/Title';
import Description from '../common/Description';
import { getRGBAString } from '../common/ColorField';
import EarlyParallax from '../common/EarlyParallax';
import useEmblaCarousel from 'embla-carousel-react';
import useBreakpoint from '../../hook/useBreakpoint';
import { FaChevronLeft } from 'react-icons/fa';
import { FaChevronRight } from 'react-icons/fa';
import Autoplay from 'embla-carousel-autoplay';

type componentPropType = {
  data: GroupType | undefined;
  id: string;
};

function Group({ data, id }: componentPropType) {
  const breakpoint = useBreakpoint();
  const columns = Number(data?.column[breakpoint] || 12);
  const slidesToShow = 12 / columns;

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ playOnInit: true, delay: 3000 }),
  ]);
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const content = () => {
    switch (data.displayMode) {
      case 'grid':
        return (
          <Row className="g-3 text-center">
            {data.list?.map((item, index) => (
              <Col
                key={id + index}
                sm={Number(data.column.sm)}
                md={Number(data.column.md)}
                lg={Number(data.column.lg)}
                xl={Number(data.column.xl)}
                className="d-flex justify-content-center align-items-center"
              >
                <MinimalCard data={item} id={id} />
              </Col>
            ))}
          </Row>
        );
      case 'slide':
        return (
          <Row className="g-3 text-center">
            <div className="embla">
              <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                  {data.list?.map((item, index) => (
                    <div
                      key={id + index}
                      className="embla__slide d-flex justify-content-center align-items-center p-2"
                      style={{ flex: `0 0 ${100 / slidesToShow}%` }}
                    >
                      <MinimalCard data={item} id={id} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="embla__buttons">
                <button className="p-1" onClick={scrollPrev}>
                  <FaChevronLeft style={{ fontSize: '28px' }} />
                </button>
                <button className="p-1" onClick={scrollNext}>
                  <FaChevronRight style={{ fontSize: '28px' }} />
                </button>
              </div>
            </div>
          </Row>
        );
      default:
        return null;
    }
  };

  return (
    <Container
      className="py-8 px-2"
      style={{
        backgroundColor: `${getRGBAString(data?.theme) || ''}`,
      }}
      fluid
    >
      <Container fluid={smartParse(data.fluid)}>
        <EarlyParallax opacity={[0.4, 1]} endAnimation={1.6}>
          <Row className="justify-content-center pb-3">
            <Title title={data.title} />
          </Row>
          {content()}
          <Description description={data?.description} />
        </EarlyParallax>
      </Container>
    </Container>
  );
}

export default React.memo(Group);
