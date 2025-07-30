import Container from 'react-bootstrap/Container';
import { GalleryType, smartParse } from '../../util/mockData.util';
import { Image, Gallery as ReactGallery } from 'react-grid-gallery';
import { useEffect, useState } from 'react';
import { getImageSize } from '../../util';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { Row } from 'react-bootstrap';
import Title from '../common/Title';
import Description from '../common/Description';

type componentPropType = {
  data: GalleryType | undefined;
  id?: string;
};

function Design1({ data }: componentPropType) {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<Image[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleImageClick = (index: number, item: Image) => {
    setSelectedIndex(index);
    setOpen(true);
  };

  useEffect(() => {
    const prepareImages = async () => {
      const imagesWithSize = await Promise.all(
        data.list.map(async (m) => {
          const { width, height } = await getImageSize(m.url);
          return {
            src: m.url,
            width,
            height,
          };
        }),
      );
      setImages(imagesWithSize);
    };

    prepareImages();
  }, [data.list.length]);

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
        <ReactGallery
          images={images}
          onClick={handleImageClick}
          enableImageSelection={false}
        ></ReactGallery>
        <Lightbox open={open} index={selectedIndex} close={() => setOpen(false)} slides={images} />
        <Description description={data?.description} />
      </Container>
    </Container>
  );
}

export default Design1;
