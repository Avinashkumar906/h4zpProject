import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

function ImageGallery(props) {
  return (
    <div>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 767: 2, 1199: 3 }}>
        <Masonry></Masonry>
      </ResponsiveMasonry>
    </div>
  );
}

export default ImageGallery;
