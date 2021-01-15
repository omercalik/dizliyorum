import React from 'react';
import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

export const ActorCarousel = ({ children }) => {
  return (
    <Carousel
      plugins={[
        {
          resolve: arrowsPlugin,
          options: {
            arrowLeft: (
              <button>
                <i class="material-icons">chevron_left</i>
              </button>
            ),
            arrowLeftDisabled: (
              
            ),
            arrowRight: (
              <button>
                <i class="material-icons">chevron_right</i>
              </button>
            ),
            arrowRightDisabled: (
             
            ),
            addArrowClickHandler: true,
          },
        },
      ]}
    >
      {children}
    </Carousel>
  );
};
