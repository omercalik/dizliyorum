import React from 'react';
import Carousel, { arrowsPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

export const ActorCarousel = ({ children }) => {
  return (
    <Carousel
      slidesPerPage={3}
      itemWidth={220}
      offset={15}
      plugins={[
        {
          resolve: arrowsPlugin,
          options: {
            arrowLeft: (
              <button>
                <i class="material-icons">chevron_left</i>
              </button>
            ),
            arrowLeftDisabled: null,
            arrowRight: (
              <button>
                <i class="material-icons">chevron_right</i>
              </button>
            ),
            arrowRightDisabled: null,
            addArrowClickHandler: true,
          },
        },
      ]}
    >
      {children}
    </Carousel>
  );
};
