// import { useState } from "react";
/* eslint-disable react/jsx-no-useless-fragment */
import logo from "../../assets/logo/logo.png";
import coupole from "../../assets/logo/coupole.jpg";
import Weather from "../Weather/Weather";
// import ModalSkyOfMonth from "./ModalSkyOfMonth";
import Observatoire from "../Observatoire/Observatoire";

import "./Header.css";

function Header() {
  // const [show, setShow] = useState(false);

  return (
    <header className="classHeaderContainer">
      <div className="classHeaderLogoTitle">
        <img
          className="classHeaderImg"
          src={logo}
          alt="observatoire de Saint Jean Le Blanc"
        />
        <h1 className="classHeaderTitle">
          Observatoire <br /> de <br /> Saint Jean Le Blanc
        </h1>
      </div>
      <h2 className="classHeaderSubtitle">
        Association loi 1901 pour la promotion de l'astronomie amateur
      </h2>
      <div className="classHeaderImgWeatherContainer">
        <img
          className="classHeaderImgCoupole"
          src={coupole}
          alt="coupole observatoire"
        />
        <Weather />
      </div>
      <Observatoire />
      {/* <button
        className="classHeaderSkyOfMonthButton"
        onClick={() => setShow(true)}
        type="submit"
      >
        Ciel du mois
        <span className="spaned first" />
        <span className="spaned second" />
        <span className="spaned third" />
        <span className="spaned fourth" />
      </button>
      <ModalSkyOfMonth onClose={() => setShow(false)} show={show} /> */}
    </header>
  );
}

export default Header;
