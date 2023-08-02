import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CurrentUserContext from "../../contexts/userContext";
import axiosAPI from "../../services/axiosAPI";

import "./Footer.css";

function Footer() {
  const { setUser } = useContext(CurrentUserContext);
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
      </div>
      <div className="footer-buttons">
        <button
          className="footer-button-login"
          type="submit"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <button
          className="footer-button-logout"
          type="submit"
          onClick={() => handleDisconnect()}
        >
          Logout
        </button>
      </div>
    </footer>
  );
}

export default Footer;
