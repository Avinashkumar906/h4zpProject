import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { GalleryType, smartParse } from '../../util';
import { Container, Row } from 'react-bootstrap';
import Title from '../common/Title';
import { getRGBAString } from '../common/ColorField';
import Description from '../common/Description';
import EarlyParallax from '../common/EarlyParallax';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

type componentPropType = {
  data: GalleryType | undefined;
  id?: string;
};
const Carousel = ({ data, id }: componentPropType) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <Container
      className="py-8 px-2"
      fluid
      style={{
        backgroundColor: `${getRGBAString(data?.theme) || ''}`,
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
                    <div className="embla__slide" key={index}>
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
                  <FaChevronLeft style={{ fontSize: '28px' }} />
                </button>
                <button className="p-1" onClick={scrollNext}>
                  <FaChevronRight style={{ fontSize: '28px' }} />
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
