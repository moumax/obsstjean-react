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

  // const handleDisconnect = () => {
  //   axiosAPI
  //     .get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`)
  //     .then(() => {
  //       localStorage.clear();
  //       setUser(undefined);
  //       toast.warning("Tu es déconnecté !");
  //     })
  //     .catch((err) => toast.error(err.message));
  // };

  return (
    <footer className="flex flex-col h-[20vh]">
      <div className="flex flex-col text-white opacity-40 items-center text-[0.8rem]">
        <p>© 2019 - 2023 -- Marc LANTOL</p>
        <p>Observatoire Astronomique de Saint Jean Le Blanc (V3.0.0)</p>
        <div className="mt-[1rem] mb-[1rem] flex self-start gap-[10px]">
          <BiLogoReact size="2rem" color="#61DAFB" />
          <BiLogoJavascript size="2rem" color="yellow" />
          <SiMysql size="2rem" color="#3E6E93" />
          <img
            className="w-[2rem]"
            src="src/assets/footer/stjeanleblanc.png"
            alt="Ville de Saint Jean Le Blanc"
          />
        </div>
      </div>
      <div className="border-none bg-transparent">
        {!user && (
          <button
            className="border-none bg-transparent"
            type="submit"
            onClick={() => navigate("/login")}
          >
            <LuLogIn size="2rem" color="white" />
          </button>
        )}
        {user && (
          <>
            <button
              className="border-none bg-transparent"
              type="submit"
              onClick={() => handleDisconnect()}
            >
              <TbLogout size="2rem" color="white" />
            </button>
            <button
              className="border-none bg-transparent"
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
