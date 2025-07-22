import React, { useEffect, useRef, useState } from 'react';
import { cloudinaryUtilForUrl } from '../../util';

type componentPropType = {
  src: string;
  className: string;
  style?: Record<string, string>;
  alt?: string;
};
const CloudinaryImg = ({ src, className = '', style = {} }: componentPropType) => {
  const imgRef = useRef(null);
  const [transformedUrl, setTransformedUrl] = useState(src);

  useEffect(() => {
    if (!src || !imgRef.current) return;

    const timeoutId = setTimeout(() => {
      if (!imgRef.current) return;

      const rect = imgRef.current.getBoundingClientRect();
      const adjustedWidth = Math.round(rect.width * 1.5);
      const adjustedHeight = Math.round(rect.height * 1.5);

      const newUrl = cloudinaryUtilForUrl({
        url: src,
        width: adjustedWidth,
        height: adjustedHeight,
        crop: 'fill',
        quality: 'auto',
      });

      setTransformedUrl(newUrl);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [src]);

  return (
    <img
      ref={imgRef}
      src={transformedUrl}
      className={className}
      // style={style}
      alt={`Banner ${src}`}
      loading={'lazy'}
      //   width: '100%', height: 'auto'
      style={{ objectFit: 'cover', ...style }}
    />
  );
};

export default CloudinaryImg;
