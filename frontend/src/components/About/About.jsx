import React from "react";
import CardAbout from "./CardAbout";
import datasAbout from "../../datas/datasAbout";

import "./About.css";

function About() {
  return (
    <section className="section-about">
      <h1 className="section-title">Nos activités</h1>
      <div className="about-card-display">
        {datasAbout.map((data) => (
          <CardAbout data={data} key={data.id} />
        ))}
      </div>
    </section>
  );
}

export default About;
