import { useState } from 'react';
import Lightbox from 'react-spring-lightbox';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { HiOutlineXCircle } from 'react-icons/hi';

const actionStyle = {
  zIndex: '99',
  cursor: 'pointer',
};

function LightBox({ data, lightBoxState, toggleLightBox }: any) {
  console.log(data);
  const [lightBoxData] = useState(data?.map((m) => ({ src: m.url, loading: 'lazy' })));
  const [currentImageIndex, setCurrentIndex] = useState(lightBoxState.activeIndex);

  const gotoPrevious = () => currentImageIndex > 0 && setCurrentIndex(currentImageIndex - 1);

  const gotoNext = () =>
    currentImageIndex + 1 < lightBoxData.length && setCurrentIndex(currentImageIndex + 1);

  const closeLightBox = () => {
    toggleLightBox(0);
  };

  return lightBoxState.show ? (
    <Lightbox
      isOpen={lightBoxState.show}
      onPrev={gotoPrevious}
      onNext={gotoNext}
      style={{ background: 'rgba(0, 0, 0, 0.9)', zIndex: 999999 }}
      renderHeader={() => (
        <div className="h4 text-end p-2 text-light">
          <div onClick={closeLightBox} style={actionStyle}>
            <HiOutlineXCircle />
          </div>
        </div>
      )}
      renderPrevButton={() => (
        <div onClick={gotoPrevious} className="h3 text-light" style={actionStyle}>
          <GrPrevious />
        </div>
      )}
      renderNextButton={() => (
        <div onClick={gotoNext} className="h3 text-light" style={actionStyle}>
          <GrNext />
        </div>
      )}
      images={lightBoxData}
      currentIndex={currentImageIndex}
    />
  ) : null;
}

export default LightBox;
