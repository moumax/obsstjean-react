/* eslint-disable react/jsx-no-useless-fragment */
import { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineContacts, AiOutlineHome } from "react-icons/ai";
import { BsCalendarDate } from "react-icons/bs";
import { MdOutlineContactSupport } from "react-icons/md";

import logo from "../../assets/logo/logo.png";
import coupole from "../../assets/logo/coupole.jpg";
import Weather from "../Weather/Weather";
// import ModalSkyOfMonth from "./ModalSkyOfMonth";
import Observatoire from "../Observatoire/Observatoire";

import "./Header.css";

function Header() {
  // const [show, setShow] = useState(false);
  const [activeMenu, setActiveMenu] = useState("home");

  const handleMenuItemClick = (pageId) => {
    setActiveMenu(pageId);
  };

  return (
    <header id="home" className="classHeaderContainer">
      <motion.nav
        style={{ filter: "blur(100px)" }}
        animate={{ filter: "blur(0px)" }}
        transition={{ duration: 4 }}
        className="classNavContainer"
      >
        <ul className="classNav">
          <li>
            <a href="#home" onClick={() => handleMenuItemClick("home")}>
              <AiOutlineHome
                size="2rem"
                className={
                  activeMenu === "home" ? "classActive" : "classInactive"
                }
              />
            </a>
          </li>
          <li>
            <a href="#activity" onClick={() => handleMenuItemClick("activity")}>
              <MdOutlineContactSupport
                size="2rem"
                className={
                  activeMenu === "activity" ? "classActive" : "classInactive"
                }
              />
            </a>
          </li>
          <li>
            <a href="#calendar" onClick={() => handleMenuItemClick("calendar")}>
              <BsCalendarDate
                size="2rem"
                className={
                  activeMenu === "calendar" ? "classActive" : "classInactive"
                }
              />
            </a>
          </li>
          <li>
            <a href="#contact" onClick={() => handleMenuItemClick("contact")}>
              <AiOutlineContacts
                style={{ height: "2rem", width: "2.4rem", scale: "1.3" }}
                className={
                  activeMenu === "contact" ? "classActive" : "classInactive"
                }
              />
            </a>
          </li>
        </ul>
      </motion.nav>
      <div className="classHeaderLogoTitle">
        <motion.div
          animate={{
            x: [90, 30, 140, 0],
            y: [250, 450, 200, 0],
            scale: [2, 1],
            opacity: 1,
          }}
          transition={{ ease: "easeInOut", delay: 1, duration: 2 }}
          className="classHeaderImg"
        >
          <img
            className="classHeaderImg"
            src={logo}
            alt="observatoire de Saint Jean Le Blanc"
          />
        </motion.div>
        <motion.div
          style={{ filter: "blur(100px)" }}
          animate={{ filter: "blur(0px)" }}
          transition={{ duration: 4 }}
        >
          <h1 className="classHeaderTitle">
            Observatoire <br /> de <br /> Saint Jean Le Blanc
          </h1>
        </motion.div>
      </div>
      <motion.div
        style={{ filter: "blur(100px)" }}
        animate={{ filter: "blur(0px)" }}
        transition={{ duration: 4 }}
      >
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
      </motion.div>
    </header>
  );
}

export default Header;
