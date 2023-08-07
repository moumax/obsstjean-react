/* eslint-disable react/prop-types */
import { useReducer, useState } from "react";
import Modal from "react-modal";
import { useSWRConfig } from "swr";
import { toast } from "react-toastify";
import usersReducer from "../../reducers/usersReducer";
import axiosAPI from "../../services/axiosAPI";

import editUser from "../../assets/administration/editUser.svg";
import deleteUser from "../../assets/administration/deleteUser.svg";

import "./CardUser.css";

function CardUser({ data }) {
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
    mutate(`${import.meta.env.VITE_BACKEND_URL}/api/user`);
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
    <div className="card-user-container">
      <div className="card-user">
        <div className=" card-user-text">
          <div>
            <p className="card-user-titles">Email :</p>
            <h3 className="card-user-datas">{data.mail}</h3>
            <p className="card-user-titles">Role :</p>
            <h3 className="card-user-datas">{data.role}</h3>
            <p className="card-user-titles">Prénom :</p>
            <h3 className="card-user-datas">{data.name}</h3>
          </div>
          <div className="self-center">
            {data && currentPage !== "/" && (
              <div className="flex gap-2 justify-end pt-4">
                <button type="submit" onClick={() => openModalModify()}>
                  <img
                    className="card-user-button-user"
                    src={editUser}
                    alt="Editer un utilisateur"
                  />
                  <span />
                </button>
                <button
                  type="submit"
                  onClick={() => openModalDelete()}
                  className="card-user-button-user"
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
            <button
              type="submit"
              onClick={modifyUser}
              className="card-user-button-modify-user"
            >
              Modifier
            </button>

            <button
              type="submit"
              onClick={closeModal}
              className="card-user-button-cancel"
            >
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
            <button
              type="submit"
              onClick={delUser}
              className="card-user-button-delete-user"
            >
              Supprimer
            </button>

            <button
              type="submit"
              onClick={closeModalDelete}
              className="card-user-button-cancel"
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
