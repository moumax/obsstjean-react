/* eslint-disable react/prop-types */
import { useState, useReducer, useContext } from "react";
import Modal from "react-modal";
import { useSWRConfig } from "swr";
import Moment from "react-moment";
import "moment/locale/fr";
import { toast } from "react-toastify";
import eventsReducer from "../../reducers/eventsReducer";
import axiosAPI from "../../services/axiosAPI";
import CurrentUserContext from "../../contexts/userContext";

import editEvent from "../../assets/administration/editEvent.svg";
import eraseEvent from "../../assets/administration/deleteEvent.svg";

import "./CardEvent.css";

function CardEvent({ data }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);

  const initialState = {
    title: data.title,
    description: data.description,
    site: data.site,
    date: data.date,
  };

  const [eventForm, eventFormDispatch] = useReducer(
    eventsReducer,
    initialState
  );
  // eslint-disable-next-line no-unused-vars
  const [userId, setUserId] = useState(data.userId);
  const { user } = useContext(CurrentUserContext);
  const { mutate } = useSWRConfig();
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

  const modifyEvent = async (e) => {
    e.preventDefault();

    try {
      await axiosAPI.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/event/${data.id}`,
        {
          title: eventForm.title,
          description: eventForm.description,
          date: eventForm.date,
          site: eventForm.site,
          userId,
        }
      );
      mutate(`${import.meta.env.VITE_BACKEND_URL}/api/event/`);
      closeModal();
      toast.success("Evènement mis à jour avec succès");
    } catch (error) {
      if (!eventForm.title) {
        toast.error('Le champ "Titre" est vide !');
      }
      if (!eventForm.description) {
        toast.error('Le champ "description" est vide !');
      }
      if (!eventForm.date) {
        toast.error('Le champ "Date" est vide !');
      }
      if (!eventForm.site) {
        toast.error('Le champ "Site" est vide !');
      }
      if (!userId) {
        toast.error('Le champ "UserId" est vide !');
      }
    }
  };

  const deleteEvent = async () => {
    await axiosAPI.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/event/${data.id}`
    );
    mutate(`${import.meta.env.VITE_BACKEND_URL}/api/event/`);
    toast.success(`L'évènement ${data.title} a été supprimé`);
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

  const dateFunction = (e) => {
    const date = new Date(e.target.value);

    eventFormDispatch({
      type: "DATE",
      payload: date.toISOString(e.target.value),
    });
  };

  const now = new Date();
  const nowIso = now.toISOString();

  return (
    <div className="card-event-container">
      <div
        className={`card-event-border ${
          data.date < nowIso ? "card-event-past-date" : "card-event-future-date"
        }`}
      >
        <div className="card-event-subcontainer">
          <div className="card-event-date-title">
            <Moment locale="fr" format="LL" className="card-event-date">
              {data.date}
            </Moment>
            <h3 className="card-event-titles">{data.title}</h3>
          </div>
          <p className="card-event-description">{data.description}</p>
          <div className="card-event-site-container">
            <p className="cardEventSiteText">A quel endroit ?</p>
            <p className="cardEventSiteText">{data.site}</p>
          </div>
        </div>

        {user && currentPage !== "/" && (
          <div className="flex gap-2 justify-end pt-4 pb-2">
            <button type="submit" onClick={() => openModalModify()}>
              <img
                className="w-[8vw]"
                src={editEvent}
                alt="Editer un évènement"
              />
              <span />
            </button>
            <button
              type="submit"
              onClick={() => openModalDelete()}
              className="w-[8vw]"
            >
              <img src={eraseEvent} alt="Supprimer un évènement" />
              <span />
            </button>
          </div>
        )}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={modalStyle}
      >
        <h2 className="text-center text-white text-2xl">
          Modifier un évènement
        </h2>
        <div className="m-1 mt-5">
          <label htmlFor="title" className="font-bold text-slate-300">
            Titre
          </label>
          <input
            id="title"
            type="text"
            className="text-xs w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
            placeholder="Titre"
            value={eventForm.title}
            onChange={(e) =>
              eventFormDispatch({
                type: "TITLE",
                payload: e.target.value,
              })
            }
          />
        </div>
        <div className="m-1">
          <label htmlFor="description" className="font-bold text-slate-300">
            Description
          </label>
          <textarea
            id="description"
            type="text"
            className="text-xs text-justify w-full h-40 py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
            placeholder="Description"
            value={eventForm.description}
            onChange={(e) =>
              eventFormDispatch({
                type: "DESCRIPTION",
                payload: e.target.value,
              })
            }
          />
        </div>
        <div className="m-1">
          <label htmlFor="date" className="font-bold text-slate-300">
            Date
          </label>
          <input
            id="date"
            type="date"
            className="text-xs w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
            placeholder="date"
            value={eventForm.date.slice(0, 10)}
            onChange={dateFunction}
          />
        </div>
        <div className="m-1">
          <label htmlFor="site" className="font-bold text-slate-300">
            Site
          </label>
          <input
            id="site"
            type="text"
            className="text-xs w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
            placeholder="Site"
            value={eventForm.site}
            onChange={(e) =>
              eventFormDispatch({
                type: "SITE",
                payload: e.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-row absolute bottom-3 right-0 justify-center w-full gap-2">
          <button type="button" onClick={modifyEvent}>
            Sauvegarder
          </button>
          <button type="button" onClick={closeModal}>
            Fermer
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
          Supprimer cet évènement ?
        </h2>
        <div className="m-1 mt-5 flex flex-col">
          <label htmlFor="title" className="font-bold text-slate-300">
            Titre
          </label>
          <p className="text-white self-end">{eventForm.title}</p>

          <label htmlFor="description" className="font-bold text-slate-300">
            Description
          </label>
          <p className="text-white self-end text-justify">
            {eventForm.description}
          </p>

          <label htmlFor="date" className="font-bold text-slate-300">
            Date
          </label>
          <p className="text-white self-end">{eventForm.date.slice(0, 10)}</p>

          <label htmlFor="site" className="font-bold text-slate-300">
            Site
          </label>
          <p className="text-white self-end">{eventForm.site}</p>
        </div>
        <div className="flex flex-row absolute bottom-3 right-0 justify-between w-full px-4">
          <button type="button" onClick={deleteEvent}>
            Supprimer
          </button>

          <button type="button" onClick={closeModalDelete}>
            Annuler
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default CardEvent;
