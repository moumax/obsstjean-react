import { useReducer, useState } from "react";
import Modal from "react-modal";
// import { toast } from "react-toastify";
import useSWR, { mutate } from "swr";
import { MoonLoader } from "react-spinners";
import usersReducer from "../../reducers/usersReducer";
import CardUser from "./CardUser";
import addUser from "../../assets/administration/addUser.svg";
import axiosAPI from "../../services/axiosAPI";
import fetcher from "../../api/fetcher";

Modal.setAppElement("#root");

export default function UsersAdministration() {
  const [modalIsOpen, setIsOpen] = useState(false);

  const role = JSON.parse(localStorage.getItem("role"));

  const initialState = {
    mail: "",
    password: "",
    role: "",
  };

  const [userForm, userFormDispatch] = useReducer(usersReducer, initialState);

  const { data, error } = useSWR(
    `${import.meta.env.VITE_BACKEND_URL}/api/user`,
    fetcher
  );

  if (error) return <div>Une erreur est survenue : {error.message}</div>;
  if (!data)
    return (
      <div>
        <MoonLoader
          color="#36d7b7"
          size={60}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );

  const openModalAdd = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  async function createUser(user) {
    const response = await axiosAPI.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/user`,
      user
    );
    return response.data;
  }

  function handleSubmit(e) {
    e.preventDefault();
    createUser({
      mail: userForm.mail,
      password: userForm.password,
      role: userForm.role,
      name: userForm.name,
    }).then(() => {
      closeModal();
      mutate(`${import.meta.env.VITE_BACKEND_URL}/api/user`);
    });
  }

  const modalStyle = {
    overlay: {
      backgroundColor: "rgba(255, 255, 255, 0.50)",
      overflow: "hidden",
    },
    content: {
      borderRadius: "20px",
      backgroundColor: "rgba(7, 35, 72, 0.90)",
      border: "none",
    },
  };

  return (
    <section className="w-full mt-[1rem] flex flex-col items-center min-h-screen">
      <h2 className="text-white text-[2rem]">Liste des utilisateurs</h2>
      <div className="flex p-[1rem] flex-start">
        <button
          className="w-[4rem] bg-transparent border-none"
          type="button"
          onClick={openModalAdd}
        >
          <img
            className="w-[3rem]"
            src={addUser}
            alt="add a user"
          />
          <span />
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        // className="flex flex-col bg-transparent"
        style={modalStyle}
      >
        <h2 className="text-center text-white text-2xl">
          Ajouter un utilisateur
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="m-1 mt-5">
            <label htmlFor="mail" className="font-bold text-slate-300">
              Email
            </label>
            <input
              id="mail"
              type="text"
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Email de l'utilisateur"
              value={userForm.mail}
              onChange={(e) =>
                userFormDispatch({
                  type: "VOID_MAIL",
                  payload: e.target.value,
                })
              }
            />
            <label htmlFor="name" className="font-bold text-slate-300">
              Prénom
            </label>
            <input
              id="name"
              type="text"
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Prénom de l'utilisateur"
              value={userForm.name}
              onChange={(e) =>
                userFormDispatch({
                  type: "VOID_NAME",
                  payload: e.target.value,
                })
              }
            />
          </div>
          <div className="m-1">
            <label htmlFor="password" className="font-bold text-slate-300">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Mot de passe"
              value={userForm.password}
              onChange={(e) =>
                userFormDispatch({
                  type: "VOID_PASSWORD",
                  payload: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col m-1">
            <label htmlFor="role-select" className="font-bold text-slate-300">
              Choisissez un rôle:
            </label>

            <select
              name="roles"
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              id="role-select"
              value={userForm.role}
              onChange={(e) =>
                userFormDispatch({
                  type: "VOID_ROLE",
                  payload: e.target.value,
                })
              }
            >
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <option value="" />
              <option value="administrateur">administrateur</option>
              <option value="redacteur">redacteur</option>
              <option value="photographe">photographe</option>
            </select>
          </div>

          <div className="flex flex-col mt-20 gap-5">
            <button type="submit" className="bg-blue-400">
              Sauvegarder
            </button>
            <button
              type="submit"
              onClick={closeModal}
              className="bg-blue-400"
            >
              Fermer
            </button>
          </div>
        </form>
      </Modal>
      {role === "administrateur" &&
        data.map((user) => (
          <div key={user.id}>
            <CardUser data={user} />
          </div>
        ))}
    </section>
  );
}
