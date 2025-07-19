import { GalleryType } from '../../util';
import Carousel from './Carousel';
import Design1 from './Design1';

type componentPropType = {
  data: GalleryType | undefined;
  id?: string;
};

function Gallery({ data, id }: componentPropType) {
  const content = () => {
    switch (data.design) {
      case 'design1':
        return <Design1 data={data} id={id}></Design1>;
      case 'design2':
        return <Carousel data={data} id={id}></Carousel>;
      default:
        return <Design1 data={data} id={id}></Design1>;
    }
  };

  return content();
}

export default Gallery;
