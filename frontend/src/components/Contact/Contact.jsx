import React from "react";
import Leaflet from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { AiOutlineFacebook } from "react-icons/ai";
import { SiMaildotru } from "react-icons/si";
import { GoMail } from "react-icons/go";

import Footer from "../Footer/Footer";
import iconUrl from "../../assets/contact/marker.webp";

import "./Leaflet.css";
import "./Contact.css";

function Contact() {
  const position = [47.891346, 1.917617];

  const newIcon = new Leaflet.Icon({
    iconUrl,
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [35, 45],
  });

  return (
    <section id="contact" className="w-[90%] flex flex-col items-center h-screen">
      <h1 className="classTitles">Nous contacter</h1>

      <MapContainer
        className="h-[14rem] w-[90%] overflow-hidden rouned-xl mb-[3vh]"
        center={position}
        zoom={17}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenstreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org./{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={newIcon}>
          <Popup>Observatoire de Saint Jean Le Blanc</Popup>
        </Marker>
      </MapContainer>

      <div className="flex flex-col items-center text-white mb-[4rem]">
        <p className="mb-[2vh]">
          L'observatoire est ouvert tous les vendredis à partir de 21h00
        </p>
        <div className="flex flex-col items-center gap-[10px] justify-center w-full">
          <div className="text-yellow-400 flex gap-[5px]">
            <GoMail />
            <p>obsstjean</p>
            <p>
              <SiMaildotru />
            </p>
            <p>gmail.com</p>
          </div>
          <div className="text-yellow-400 flex items-center gap-[1vw]">
            <a href="https://www.google.fr" target="_blank" rel="noreferrer">
              <AiOutlineFacebook className="text-yellow-400 text-[1.2rem]" />
            </a>
            <p>Obssjean</p>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default Contact;
