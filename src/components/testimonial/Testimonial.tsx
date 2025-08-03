import { Card, Container, Row } from 'react-bootstrap';
import { smartParse, TestimonialListType, TestimonialType } from '../../util';
import EarlyParallax from '../common/EarlyParallax';
import Title from '../common/Title';
import Description from '../common/Description';
import useBreakpoint from '../../hook/useBreakpoint';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback } from 'react';
import DynamicIcon from '../common/DynamicIcon';

type ComponentPropType = {
  data: TestimonialType;
  id?: string;
};

const TestimonialCard = ({ name, title, quote }: TestimonialListType) => (
  <Card className="m-2 shadow-sm border-0 flex-grow-1 p-2">
    <Card.Body className="d-flex flex-column">
      <div className="mb-2">
        <DynamicIcon fullName="fa:FaQuoteLeft" size={36} color="#6c757d" />
      </div>
      <div className="fst-italic flex-grow-1 d-flex justify-content-center flex-column card-text">
        <Description description={quote}></Description>
      </div>
      <Card.Title className="mt-2 mb-1 text-end">{name}</Card.Title>
      <Card.Subtitle className="text-muted text-end">{title}</Card.Subtitle>
    </Card.Body>
  </Card>
);

const Testimonial = ({ data, id }: ComponentPropType) => {
  const breakpoint = useBreakpoint();
  const columns = Number(data?.column[breakpoint] || 12);
  const slidesToShow = 12 / columns;

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ playOnInit: false, delay: 5000 }),
  ]);
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  return (
    <Container
      className="py-8 px-2"
      style={{
        backgroundColor: data?.background,
      }}
      fluid
    >
      <Container fluid={smartParse(data.fluid)}>
        <EarlyParallax opacity={[0.4, 1]} endAnimation={1.6}>
          <Row className="justify-content-center">
            <Title title={data.title} />
          </Row>
          <Row className="">
            <div className="embla">
              <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                  {data.list?.map((item, index) => (
                    <div
                      key={id + index}
                      className="embla__slide d-flex justify-content-center align-items-stretch"
                      style={{ flex: `0 0 ${100 / slidesToShow}%` }}
                    >
                      <TestimonialCard {...item} />
                    </div>
                  ))}
                </div>
              </div>
              {slidesToShow < data.list.length && (
                <div className="embla__buttons">
                  <button className="p-1" onClick={scrollPrev}>
                    <DynamicIcon fullName="fa:FaChevronLeft" size={28} color="#6c757d" />
                  </button>
                  <button className="p-1" onClick={scrollNext}>
                    <DynamicIcon fullName="fa:FaChevronRight" size={28} color="#6c757d" />
                  </button>
                </div>
              )}
            </div>
          </Row>
          {/* {content()} */}
          <Description description={data?.description} />
        </EarlyParallax>
      </Container>
    </Container>
    // <Container className="py-5">
    //   <Row className="justify-content-center">
    //     {data.list.map((testimonial, idx) => (
    //       <Col key={idx} md={4}>
    //         <TestimonialCard {...testimonial} />
    //       </Col>
    //     ))}
    //   </Row>
    // </Container>
  );
};

export default Testimonial;
