import React from "react";

import logo from "../../assets/logo/logo.png";
import coupole from "../../assets/logo/coupole.jpg";
import "./Header.css";

function Header() {
  return (
    <header className="container-header">
      <img
        className="img-header"
        src={logo}
        alt="observatoire de Saint Jean Le Blanc"
      />
      <h1>Observatoire de Saint Jean Le Blanc</h1>
      <h2>Association loi 1901 pour la promotion de l'astronomie amateur</h2>
      <img
        className="img-coupole-header"
        src={coupole}
        alt="coupole observatoire"
      />
    </header>
  );
}

export default Header;
