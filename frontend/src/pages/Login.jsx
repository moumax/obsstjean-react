import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosAPI from "../services/axiosAPI";

import CurrentUserContext from "../contexts/userContext";
import "./Login.css";

export default function Login() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(CurrentUserContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mail && password) {
      await axiosAPI
        .post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
          mail,
          password,
        })
        .then((res) => {
          setUser(res.data);
          console.error("login", res.data);
          localStorage.setItem("user", JSON.stringify(res.data.mail));
          localStorage.setItem("role", JSON.stringify(res.data.role));
          localStorage.setItem("idUser", JSON.stringify(res.data.id));
          navigate("/");
          toast.success("Vous êtes connecté !");
        });
    } else {
      toast.warning("Votre email ou votre mot de passe est faux");
    }

    if (mail && !password) {
      toast.warning("Merci de renseigner votre mot de passe");
    }
    if (!mail && password) {
      toast.warning("Merci de renseigner votre email");
    }
  };

  return (
    <section className="section-login" id="login">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="section-login-inputs">
            <input
              className="section-login-input"
              type="text"
              id="user"
              name="user"
              placeholder="Votre email"
              onChange={(e) => setMail(e.target.value)}
            />
            <input
              className="section-login-input"
              type="password"
              id="pass"
              name="pass"
              placeholder="Votre mot de passe"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="section-login-button"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
