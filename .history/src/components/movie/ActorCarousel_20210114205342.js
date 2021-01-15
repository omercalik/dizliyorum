import React from 'react';
import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

export const ActorCarousel = ({ children }) => {
  return (
    <Carousel slidesPerPage={3} arrows itemWidth={220} offset={15}>
      {children}
    </Carousel>
  );
};
