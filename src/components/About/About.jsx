import React, { useCallback, useEffect, useState } from "react";
import { client } from "../../client";
import Loader from "../loader/Loader";
import { marked } from "marked";
import DOMPurify from "dompurify";

const getHTMLData = (rawData) => {
  const htmlString = marked(rawData);
  const sanitizedHTMLString = DOMPurify.sanitize(htmlString);
  return sanitizedHTMLString;
};

const About = () => {
  const [about, setAbout] = useState({});
  const [isAboutLoading, setIsAboutLoading] = useState(false);

  const cleanUpAbout = useCallback((rawData) => {
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
    setAbout(cleanAbout);
  }, []);

  const getAbout = async () => {
    setIsAboutLoading(true);
    try {
      const response = await client.getEntry("4cPys3SxoWXRlkt3wOrWtf");

      console.log(response);
      setIsAboutLoading(false);

      if (response) {
        cleanUpAbout(response);
      } else {
        setAbout({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAbout();
  }, []);

  if (isAboutLoading) {
    return <Loader />;
  }

  const { aboutTitle, aboutContent, aboutImage } = about;

  return (
    <section className="about" id="about">
      <div className="row">
        <div className="column">
          <h2 className="titleText">{aboutTitle}</h2>
          <div dangerouslySetInnerHTML={{ __html: aboutContent }} />
        </div>
        <div className="column">
          <div className="imgWrap">
            <img src={aboutImage} alt={aboutTitle} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
