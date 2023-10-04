import { AiOutlineContacts, AiOutlineHome } from "react-icons/ai";
import { BsCalendarDate } from "react-icons/bs";
import { MdOutlineContactSupport } from "react-icons/md";

import logo from "../../assets/logo/logo.png";
import coupole from "../../assets/logo/coupole.jpg";
import Weather from "../Weather/Weather";
// import ModalSkyOfMonth from "./ModalSkyOfMonth";
import Observatoire from "../Observatoire/Observatoire";

import "./Header.css";
import "../../index.css";

function Header() {
  // const [show, setShow] = useState(false);

  return (
    <header id="home" className="w-[95%] h-screen flex flex-col items-center">
      <nav className="w-full flex justify-end mt-4 fixed mr-4">
        <ul className="flex text-white gap-3 z-50">
          <li>
            <a href="#home">
              <AiOutlineHome color="white" size="2rem" />
            </a>
          </li>
          <li>
            <a href="#activity">
              <MdOutlineContactSupport color="white" size="2rem" />
            </a>
          </li>
          <li>
            <a href="#calendar">
              <BsCalendarDate color="white" size="2rem" />
            </a>
          </li>
          <li>
            <a href="#contact">
              <AiOutlineContacts color="white" size="2rem" />
            </a>
          </li>
        </ul>
      </nav>
      <div className="flex items-center gap-[2vw] mb-[2vh]">
        <img
          className="h-[25vh] mt-[1.4vh] z-50"
          src={logo}
          alt="observatoire de Saint Jean Le Blanc"
        />
        <div>
          <h1 className="classHeaderTitle">
            Observatoire <br /> de <br /> Saint Jean Le Blanc
          </h1>
        </div>
      </div>
      <div>
        <h2 className="classHeaderSubtitle">
          Association loi 1901 pour la promotion de l&apos;astronomie amateur
        </h2>
        <div className="classHeaderImgWeatherContainer">
          <img
            className="w-[90vw] h-[40vh] mt-5 mb-5 rounded-xl z-50"
            src={coupole}
            alt="coupole de l'observatoire"
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
      </div>
    </header>
  );
}

export default Header;
