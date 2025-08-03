import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { GalleryType, smartParse } from '../../util';
import { Container, Row } from 'react-bootstrap';
import Title from '../common/Title';
import Description from '../common/Description';
import EarlyParallax from '../common/EarlyParallax';
import useBreakpoint from '../../hook/useBreakpoint';
import DynamicIcon from '../common/DynamicIcon';

type componentPropType = {
  data: GalleryType | undefined;
  id?: string;
};
const Carousel = ({ data, id }: componentPropType) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const itemToShow = useBreakpoint() === 'sm' ? 1 : 3;
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <Container
      className="py-8 px-2"
      fluid
      style={{
        backgroundColor: data?.background,
      }}
    >
      <Container fluid={smartParse(data.fluid)}>
        <Row>
          <Title title={data?.title} />
        </Row>
        <EarlyParallax opacity={[0.6, 1]} translateY={['100px', '0px']} endAnimation={1.5}>
          <Row>
            <div className="embla">
              <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                  {data.list.map((src, index) => (
                    <div
                      className="embla__slide p-2"
                      key={index}
                      // style={{ flex: `0 0 ${100 / itemToShow}%` }}
                    >
                      <img
                        className="embla__slide__img"
                        src={src.url}
                        alt={`Slide ${id} ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="embla__buttons">
                <button className="p-1" onClick={scrollPrev}>
                  <DynamicIcon fullName="fa:FaChevronLeft" size={28} color="#6c757d" />
                </button>
                <button className="p-1" onClick={scrollNext}>
                  <DynamicIcon fullName="fa:FaChevronRight" size={28} color="#6c757d" />
                </button>
              </div>
            </div>
          </Row>
        </EarlyParallax>
        <Description description={data?.description} />
      </Container>
    </Container>
  );
};

export default Carousel;
