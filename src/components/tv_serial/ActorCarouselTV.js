import React from 'react';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

export const ActorCarouselTV = ({ children }) => {
  return (
    <Carousel infinite slidesPerPage={3} arrows itemWidth={220} offset={15}>
      {children}
    </Carousel>
  );
};
