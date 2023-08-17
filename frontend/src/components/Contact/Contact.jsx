import React from "react";
import Leaflet from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { AiOutlineFacebook } from "react-icons/ai";
import { SiMaildotru } from "react-icons/si";
import { GoMail } from "react-icons/go";

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
    <section className="section-contact">
      <h1 className="classTitles">Nous contacter</h1>

      <MapContainer
        className="classContactMap"
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

      <div className="contact-paragraph">
        <p className="classContactParagraph">
          L'observatoire est ouvert tous les vendredis à partir de 21h00
        </p>
        <div className="contact-methods">
          <div className="contact-mail">
            <GoMail />
            <p>obsstjean</p>
            <p>
              <SiMaildotru />
            </p>
            <p>gmail.com</p>
          </div>
          <div className="classContactFacebook">
            <a href="https://www.google.fr" target="_blank" rel="noreferrer">
              <AiOutlineFacebook className="classContactFacebookIcon" />
            </a>
            <p>Obssjean</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
