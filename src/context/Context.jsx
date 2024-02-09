import React, { useCallback, useEffect, useState } from "react";
import { client } from "./client";
import { cleanUpAbout, cleanUpCarouselSlides } from "./helpers";

export const Context = React.createContext();

export const Provider = (props) => {
  const [about, setAbout] = useState({});
  const [isAboutLoading, setIsAboutLoading] = useState(false);

  const [isCarouselLoading, setIsCarouselLoading] = useState(false);
  const [carouselSlides, setCarouselSlides] = useState([]);

  const saveAboutData = (rawData) => {
    const cleanAboutData = cleanUpAbout(rawData);
    setAbout(cleanAboutData);
  };

  const getAbout = async () => {
    setIsAboutLoading(true);
    try {
      const response = await client.getEntry("4cPys3SxoWXRlkt3wOrWtf");

      console.log(response);
      setIsAboutLoading(false);

      if (response) {
        saveAboutData(response);
      } else {
        setAbout({});
      }
    } catch (error) {
      console.log(error);
      setIsAboutLoading(false);
    }
  };

  useEffect(() => {
    getAbout();
  }, []);

  const saveCarouselData=(rawData)=>{
    const cleanCarouselData = cleanUpCarouselSlides(rawData);
    setCarouselSlides(cleanCarouselData);
  }


  const getCarouselSlides = useCallback(async () => {
    setIsCarouselLoading(true);
    try {
      const response = await client.getEntries({
        content_type: "kitchenCarousel",
      });
      const resData = response.items;
    
      if (resData) {
        saveCarouselData(resData);
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



  const contextData = {
    about,
    isAboutLoading,
    carouselSlides,
    isCarouselLoading,
  };
  return (
    <Context.Provider value={contextData}>{props.children}</Context.Provider>
  );
};
