import React from "react";
import Leaflet from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { CiFacebook } from "react-icons/ci";
import { SiMaildotru } from "react-icons/si";

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
      <h1 className="contact-title">Nous contacter</h1>

      <MapContainer
        className="contact-map"
        center={position}
        zoom={12}
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
        <p>L'observatoire est ouvert tous les vendredis à partir de 21h00</p>
        <div className="contact-methods">
          <div className="contact-mail">
            <p>obsstjean</p>
            <p>
              <SiMaildotru />
            </p>
            <p>gmail.com</p>
          </div>
          <div>
            <a href="https://www.google.fr" target="_blank" rel="noreferrer">
              <CiFacebook />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
