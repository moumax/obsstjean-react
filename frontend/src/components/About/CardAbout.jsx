/* eslint-disable react/prop-types */
import React from "react";

import "./CardAbout.css";

function CardAbout({ data }) {
  return (
    <div className="cardAbout">
      <h3 className="classAboutTitle">{data.title}</h3>
      <img className="cardAbout-img" src={data.image} alt={data.alt} />
      <p className="classAboutText">{data.textFr}</p>
    </div>
  );
}

export default CardAbout;
