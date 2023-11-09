import { useContext, useState } from "react";
// import { useCookie, useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import axiosAPI from "../services/axiosAPI";

import CurrentUserContext from "../contexts/userContext";
import "./Login.css";

const loginSchema = z.object({
  mail: z.string().email("Rentre une adresse email valide"),
  password: z.string().min(6, "Le mot de passe doit comporter 6 caractères"),
});

export default function Login() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [loginError, setLoginError] = useState(null);
  // const [cookies, setCookie] = useCookies(["token"]);

  const { setUser } = useContext(CurrentUserContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mail && password) {
      try {
        loginSchema.parse({ mail, password });
        const res = await axiosAPI.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
          {
            mail,
            password,
          }
        );
        setUser(res.data);
        navigate("/");
        toast.success("Tu es connecté !");
      } catch (err) {
        setError(err.errors);
        if (err.response && err.response.status === 401) {
          const error401 = "Email ou mot de passe invalide";
          setLoginError(error401);
          toast.error(error401);
        }
        if (err.response && err.response.status === 500) {
          const error500 = "Server en panne";
          setLoginError(error500);
          toast.error(error500);
        }
      }
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

            {error && (
              <ul className="text-red-600 text-center">
                {error.map((err) => (
                  <li>toto {err.message}</li>
                ))}
              </ul>
            )}

            <button
              className="section-login-button"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Login
            </button>
            <button
              className="section-login-button"
              type="submit"
              onClick={() => navigate("/signup")}
            >
              S'inscrire
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
