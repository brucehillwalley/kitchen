import React, { useContext } from "react";
import Loader from "../loader/Loader";
import { Context } from "../../context/Context";

const About = () => {
  const { about, isAboutLoading } = useContext(Context);

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
