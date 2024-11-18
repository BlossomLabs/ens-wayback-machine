import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

import { LuGlobe } from 'react-icons/lu';


type FaviconProps = {
    src: string;
} & ImageProps;

const Favicon = ({ src, ...props }: FaviconProps) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [errorCount, setErrorCount] = useState(0);

  const handleError = () => {
    if (errorCount === 0) {
      const fallbackSrc = src.replace(/\.ico$/, '.png');
      setImageSrc(fallbackSrc);
      setErrorCount(1);
    } else if (errorCount === 1) {
      setImageSrc('/public/default-favicon.png');
      setErrorCount(2);
    }
  };

  return (
    <>
      {errorCount === 2 ? <LuGlobe size={16} /> :
        <Image
          src={imageSrc}
          onError={handleError}
          {...props}
        />
      }
    </>
  );
};

export default Favicon;
