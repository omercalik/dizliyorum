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
                <Icon name="angle-double-left" />
              </button>
            ),
            arrowLeftDisabled: (
              <button>
                <Icon name="angle-left" />
              </button>
            ),
            arrowRight: (
              <button>
                <Icon name="angle-double-right" />
              </button>
            ),
            arrowRightDisabled: (
              <button>
                <Icon name="angle-right" />
              </button>
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
