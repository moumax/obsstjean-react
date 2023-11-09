import logo from "../../assets/logo/logo.png";
import coupole from "../../assets/logo/coupole.jpg";
// eslint-disable-next-line import/no-named-as-default
import Weather from "../Weather/Weather";
// import ModalSkyOfMonth from "./ModalSkyOfMonth";
import Observatoire from "../Observatoire/Observatoire";

import "./Header.css";
import "../../index.css";
import Navbar from "../Navbar/Navbar";

function Header() {
  return (
    <header id="home" className="w-[95%] h-screen flex flex-col items-center">
      <Navbar />
      <div className="flex items-center gap-[2vw] mb-[2vh]">
        <img
          className="h-[25vh] mt-4 z-50"
          src={logo}
          alt="observatoire de Saint Jean Le Blanc"
        />
        <div>
          <h1 className="text-xl bg-gradient-to-r from-[#fffc08] to-[#575506] bg-clip-text text-transparent font-extralight mt-12">
            Observatoire <br /> de <br /> Saint Jean Le Blanc
          </h1>
        </div>
      </div>
      <div>
        <h2 className="text-white opacity-50 text-[0.875rem] text-center">
          Association loi 1901 pour la promotion de l&apos;astronomie amateur
        </h2>
        <div className="block relative text-center">
          <div className="absolute left-1/2 -translate-x-1/2 mt-2">
            <Weather />
          </div>
          <img
            className="w-[90vw] h-[40vh] mt-5 mb-5 rounded-xl z-50 mx-auto"
            src={coupole}
            alt="coupole de l'observatoire"
          />
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
