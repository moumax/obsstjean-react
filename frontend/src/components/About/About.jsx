import React from "react";
import { Carousel } from "react-responsive-carousel";
import CardAbout from "./CardAbout";
import datasAbout from "../../datas/datasAbout";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./About.css";

function About() {
  return (
    <section className="section-about">
      <h1 className="classTitles">Nos activités</h1>
      <div className="about-card-display">
        <Carousel
          infiniteLoop
          autoPlay
          interval={4000}
          showStatus
          showIndicators
          showThumbs={false}
          className="about-card-carousel"
        >
          {datasAbout.map((data) => (
            <CardAbout data={data} key={data.id} />
          ))}
        </Carousel>
      </div>
    </section>
  );
}

export default About;
