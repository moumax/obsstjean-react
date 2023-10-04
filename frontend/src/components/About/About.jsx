import React from "react";
import { Carousel } from "react-responsive-carousel";
import CardAbout from "./CardAbout";
import datasAbout from "../../datas/datasAbout";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./About.css";

function About() {
  return (
    <section
      id="activity"
      className="w-[90%] h-screen flex flex-col items-center"
    >
      <h1 className="classTitles">Nos activités</h1>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <Carousel
          infiniteLoop
          autoPlay
          interval={4000}
          showStatus={false}
          showIndicators
          showThumbs={false}
          className="relative flex w-full h-full"
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
