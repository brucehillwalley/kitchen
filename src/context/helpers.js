import DOMPurify from "dompurify";
import { marked } from "marked";

export const cleanUpAbout = (rawData) => {
  const { sys, fields } = rawData;
  const { id } = sys;
  const aboutTitle = fields.title;
  const aboutContent = getHTMLData(fields.content);
  const aboutImage = fields.image.fields.file.url;
  const cleanAbout = {
    id,
    aboutTitle,
    aboutContent,
    aboutImage,
  };

  return cleanAbout;
};

export const getHTMLData = (rawData) => {
  const htmlString = marked(rawData);
  const sanitizedHTMLString = DOMPurify.sanitize(htmlString);
  return sanitizedHTMLString;
};

export const cleanUpCarouselSlides = (rawData) => {
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

  return cleanSlides;
};
