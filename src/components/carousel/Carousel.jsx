import React, { useCallback, useEffect, useState } from "react";
import { client } from "../../client";
import CarouselSlide from "./CarouselSlide";
// core version + navigation, pagination modules:
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
// import Swiper and modules styles
import "swiper/scss";
import "swiper/scss/navigation";
import Loader from "../loader/Loader";

SwiperCore.use([Navigation]);

const Carousel = () => {
  const [isCarouselLoading, setIsCarouselLoading] = useState(false);
  const [carouselSlides, setCarouselSlides] = useState([]);

  const cleanUpCarouselSlides = useCallback((rawData) => {
    const cleanSlides = rawData.map((slide) => {
      const { sys, fields } = slide;
      const { id } = sys;
      const slideTitle = fields.title;
      const slideDescription = fields.description;
      const slideBg = fields.image.fields.file.url;
      const updatedSlide = {
        id,
        slideTitle,
        slideDescription,
        slideBg,
      };

      return updatedSlide;
    });

    setCarouselSlides(cleanSlides);
  });

  const getCarouselSlides = useCallback(async () => {
    setIsCarouselLoading(true);
    try {
      const response = await client.getEntries({
        content_type: "kitchenCarousel",
      });
      const resData = response.items;
      console.log(resData);
      if (resData) {
        cleanUpCarouselSlides(resData);
      } else {
        setCarouselSlides([]);
      }
      setIsCarouselLoading(false);
    } catch (error) {
      console.log(error);
      setIsCarouselLoading(false);
    }
  }, [cleanUpCarouselSlides]);

  useEffect(() => {
    getCarouselSlides();
  }, []);

if (isCarouselLoading) {
  return <Loader />
}


//! if there are no slides to display then do not render the component
if(!Array.isArray(carouselSlides) || !carouselSlides.length) {return null}

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
