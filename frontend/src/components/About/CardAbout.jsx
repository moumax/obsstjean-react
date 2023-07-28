/* eslint-disable react/prop-types */
import React from "react";

import "./CardAbout.css";

function CardAbout({ data }) {
  return (
    <div className="cardAbout">
      <img className="cardAbout-img" src={data.image} alt={data.alt} />
      <h3 className="cardAbout-title">{data.title}</h3>
      <p className="cardAbout-text">{data.textFr}</p>
    </div>
  );
}

export default CardAbout;
