import { useNavigate } from "react-router-dom";
import { useReducer } from "react";
import { toast } from "react-toastify";
import axiosAPI from "../services/axiosAPI";
import usersReducer from "../reducers/usersReducer";

export default function SignUp() {
  const navigate = useNavigate();

  const initialState = {
    mail: "",
    password: "",
    name: "",
  };

  const [userForm, userFormDispatch] = useReducer(usersReducer, initialState);

  async function createUser(user) {
    const response = await axiosAPI.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/user`,
      user
    );
    return response.data;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    createUser({
      mail: userForm.mail,
      password: userForm.password,
      name: userForm.name,
    }).then(() => {
      navigate("/");
      toast.success("Tu es inscrit !");
    });
  };

  return (
    <section className="w-max-[90vw] h-screen mt-10 flex flex-col items-center">
      S'inscrire
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col w-[60vw] pt-4 pb-4 gap-4">
            <input
              className="rounded-xl h-10 text-center"
              type="text"
              id="user"
              name="user"
              placeholder="Votre email"
              value={userForm.mail}
              onChange={(e) =>
                userFormDispatch({
                  type: "VOID_MAIL",
                  payload: e.target.value,
                })
              }
            />
            <input
              className="rounded-xl h-10 text-center"
              type="text"
              id="name"
              name="name"
              placeholder="Ton prénom"
              value={userForm.name}
              onChange={(e) =>
                userFormDispatch({
                  type: "VOID_NAME",
                  payload: e.target.value,
                })
              }
            />
            <input
              className="rounded-xl h-10 text-center"
              type="password"
              id="pass"
              name="pass"
              placeholder="Votre mot de passe"
              value={userForm.password}
              onChange={(e) =>
                userFormDispatch({
                  type: "VOID_PASSWORD",
                  payload: e.target.value,
                })
              }
            />
            <button
              className="pt-2 pb-2 bg-emerald-300 rounded-xl cursor-pointer"
              type="submit"
            >
              S&apos;enregistrer
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
