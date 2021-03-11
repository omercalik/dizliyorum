import React from 'react';

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper-bundle.css';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export const ActorCarousel = ({ children }) => {
  return (
    <Swiper
      style={{ marginLeft: '15px' }}
      slidesPerView={7}
      slidesPerGroup={7}
      spaceBetween={50}
      navigation
    >
      {children}
    </Swiper>
  );
};
