import React from "react";
import { Carousel } from "react-responsive-carousel";
import CardAbout from "./CardAbout";
import datasAbout from "../../datas/datasAbout";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Carousel.css";

function About() {
  return (
    <section id="activity" className="w-[90%] h-screen flex items-center">
      <Carousel
        infiniteLoop
        autoPlay
        interval={4000}
        showStatus={false}
        showIndicators
        showThumbs={false}
        className="w-full h-fit"
      >
        {datasAbout.map((data) => (
          <CardAbout data={data} key={data.id} />
        ))}
      </Carousel>
    </section>
  );
}

export default About;
