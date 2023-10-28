/* eslint-disable react/prop-types */
import { useReducer, useState } from "react";
import Modal from "react-modal";
import { useSWRConfig } from "swr";
import { toast } from "react-toastify";
import usersReducer from "../../reducers/usersReducer";
import axiosAPI from "../../services/axiosAPI";

import editUser from "../../assets/administration/editUser.svg";
import deleteUser from "../../assets/administration/deleteUser.svg";

function CardUser({ data, fetchUsers }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
  const { mutate } = useSWRConfig();

  const initialState = {
    mail: data.mail,
    password: data.password_hash,
    role: data.role,
  };

  const [userForm, userFormDispatch] = useReducer(usersReducer, initialState);

  const openModalModify = () => {
    setIsOpen(true);
  };

  const openModalDelete = () => {
    setModalDeleteIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const closeModalDelete = () => {
    setModalDeleteIsOpen(false);
  };

  const modifyUser = async (e) => {
    e.preventDefault();
    try {
      await axiosAPI.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/${data.id}`,
        {
          mail: userForm.mail,
          password_hash: userForm.password,
          role: userForm.role,
        }
      );
      mutate("users");
      closeModal();
      toast.success("Utilisateur mis à jour avec succès");
    } catch (error) {
      toast.error("Erreur dans le formulaire !!!");
    }
  };

  const delUser = async () => {
    await axiosAPI.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/${data.id}`
    );
    fetchUsers();
    toast.success(`L'utilisateur ${data.mail} a été supprimé`);
  };

  const currentPage = window.location.pathname;

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
    <div className="flex flex-col items-center">
      <div className="w-[90vw] mb-[0.25rem] rounded-xl p-[0.25rem] text-white bg-[#00ffff]/10">
        <div className="w-full flex flex-col p-[0.5rem] text-[1.2rem]">
          <div className="flex items-center mb-[1rem]">
            <p>Email :</p>
            <h3 className="text-white opacity-70 pl-[0.75rem]">{data.mail}</h3>
          </div>
          <div className="flex items-center mb-[1rem]">
            <p>Role :</p>
            <h3 className="text-white opacity-70 pl-[0.75rem]">{data.role}</h3>
          </div>
          <div className="flex items-center mb-[1rem]">
            <p>Prénom :</p>
            <h3 className="text-white opacity-70 pl-[0.75rem]">{data.name}</h3>
          </div>
          <div className="self-center">
            {data && currentPage !== "/" && (
              <div className="flex justify-end">
                <button
                  className="w-[3rem] bg-transparent border-none"
                  type="submit"
                  onClick={() => openModalModify()}
                >
                  <img src={editUser} alt="Editer un utilisateur" />
                  <span />
                </button>
                <button
                  type="submit"
                  onClick={() => openModalDelete()}
                  className="w-[3rem] bg-transparent border-none"
                >
                  <img src={deleteUser} alt="Supprimer un utilisateur" />
                  <span />
                </button>
              </div>
            )}
          </div>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          style={modalStyle}
        >
          <h2 className="text-center text-white text-2xl">
            Modifier un utilisateur
          </h2>

          <div className="m-1 mt-5">
            <label htmlFor="mail" className="font-bold text-slate-300">
              Email
            </label>
            <input
              id="mail"
              type="text"
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Email"
              value={userForm.mail}
              onChange={(e) =>
                userFormDispatch({
                  type: "MAIL",
                  payload: e.target.value,
                })
              }
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="font-bold text-slate-300">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Password"
              value={userForm.password}
              onChange={(e) =>
                userFormDispatch({
                  type: "PASSWORD",
                  payload: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-row absolute bottom-3 right-0 justify-between w-full px-4">
            <button type="submit" onClick={modifyUser} className="bg-blue-400">
              Modifier
            </button>

            <button type="submit" onClick={closeModal} className="bg-blue-400">
              Annuler
            </button>
          </div>
        </Modal>
        <Modal
          isOpen={modalDeleteIsOpen}
          onRequestClose={closeModalDelete}
          contentLabel="Example Modal"
          style={modalStyle}
        >
          <h2 className="text-center text-white text-2xl">
            Supprimer cet utilisateur
          </h2>

          <div className="m-1 mt-5 flex flex-col">
            <label htmlFor="mail" className="font-bold text-slate-300">
              Email :
            </label>
            <p className="text-white self-end">{userForm.mail}</p>
            <label htmlFor="role" className="font-bold text-slate-300">
              Role :
            </label>
            <p className="text-white self-end">{userForm.role}</p>
          </div>
          <div className="flex flex-row absolute bottom-3 right-0 justify-between w-full px-4">
            <button type="submit" onClick={delUser} className="bg-blue-400">
              Supprimer
            </button>

            <button
              type="submit"
              onClick={closeModalDelete}
              className="bg-blue-400"
            >
              Annuler
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default CardUser;
