import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BiLogoJavascript, BiLogoReact } from "react-icons/bi";
import { SiMysql } from "react-icons/si";
import { TbLogout } from "react-icons/tb";
import { RiAdminLine } from "react-icons/ri";
import { LuLogIn } from "react-icons/lu";
import CurrentUserContext from "../../contexts/userContext";
import axiosAPI from "../../services/axiosAPI";

import "./Footer.css";

function Footer() {
  const { user, setUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const handleDisconnect = () => {
    axiosAPI
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`)
      .then(() => {
        localStorage.clear();
        setUser(undefined);
        toast.warning("Tu es déconnecté !");
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <footer className="footer">
      <div className="footer-informations">
        <p>© 2019 - 2023 -- Marc LANTOL</p>
        <p>Observatoire Astronomique de Saint Jean Le Blanc (V3.0.0)</p>
        <div className="footer-logos">
          <BiLogoReact size="2rem" color="#61DAFB" />
          <BiLogoJavascript size="2rem" color="yellow" />
          <SiMysql size="2rem" color="#3E6E93" />
          <img
            className="footer-img"
            src="src/assets/footer/stjeanleblanc.png"
            alt="Ville de Saint Jean Le Blanc"
          />
        </div>
      </div>
      <div className="footer-buttons">
        {!user && (
          <button
            className="footer-buttons"
            type="submit"
            onClick={() => navigate("/login")}
          >
            <LuLogIn size="2rem" color="white" />
          </button>
        )}
        {user && (
          <>
            <button
              className="footer-buttons"
              type="submit"
              onClick={() => handleDisconnect()}
            >
              <TbLogout size="2rem" color="white" />
            </button>
            <button
              className="footer-buttons"
              type="submit"
              onClick={() => navigate("/administration")}
            >
              <RiAdminLine size="2rem" color="white" />
            </button>
          </>
        )}
      </div>
    </footer>
  );
}

export default Footer;
