/* eslint-disable react/prop-types */
import React from "react";

function CardAbout({ data }) {
  return (
    <div className="w-full flex flex-col items-center">
      <h3 className="text-yellow-500 opacity-70 m-[2vw] mb-[7vh]">
        {data.title}
      </h3>
      <img
        className="w-full h-auto rounded-2xl"
        src={data.image}
        alt={data.alt}
      />
      <p className="w-[90%] text-center text-white opacity-40 mt-[10vh]">
        {data.textFr}
      </p>
    </div>
  );
}

export default CardAbout;
