import React, { useCallback, useContext, useEffect, useState } from "react";
import CarouselSlide from "./CarouselSlide";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/scss";
import "swiper/scss/navigation";
import Loader from "../loader/Loader";
import { Context } from "../../context/Context";

SwiperCore.use([Navigation]);

const Carousel = () => {
  const { carouselSlides, isCarouselLoading } = useContext(Context);

  if (isCarouselLoading) {
    return <Loader />;
  }

  //! if there are no slides to display then do not render the component
  if (!Array.isArray(carouselSlides) || !carouselSlides.length) {
    return null;
  }

  return (
    <div className="carousel">
      <Swiper navigation>
        {carouselSlides.map((item) => {
          const { id, slideTitle, slideDescription, slideBg } = item;
          return (
            <SwiperSlide key={id}>
              <CarouselSlide
                slideTitle={slideTitle}
                slideDescription={slideDescription}
                slideBg={slideBg}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Carousel;
