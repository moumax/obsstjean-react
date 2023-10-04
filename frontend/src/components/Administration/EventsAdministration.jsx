import { MoonLoader } from "react-spinners";
import { useState, useReducer } from "react";
import useSWR, { mutate } from "swr";
import Modal from "react-modal";
import { toast } from "react-toastify";
import eventsReducer from "../../reducers/eventsReducer";
import CardEvent from "../Events/CardEvent";
import axiosAPI from "../../services/axiosAPI";
import sortedByDate from "../../utils/date";
import addEvent from "../../assets/administration/addEvent.svg";
import fetcher from "../../api/fetcher";

Modal.setAppElement("#root");

export default function EventsAdministration() {
  const [modalIsOpen, setIsOpen] = useState(false);

  const role = JSON.parse(localStorage.getItem("role"));
  const idUser = JSON.parse(localStorage.getItem("idUser"));

  const initialState = {
    title: "",
    description: "",
    site: "",
    date: "",
  };

  const [eventForm, eventFormDispatch] = useReducer(
    eventsReducer,
    initialState
  );

  const { data, error } = useSWR(
    `${import.meta.env.VITE_BACKEND_URL}/api/event/`,
    fetcher
  );

  if (error)
    return (
      <div className="text-white">
        Une erreur est survenue : {error.message}
      </div>
    );
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

  const createEvent = async (e) => {
    e.preventDefault();
    try {
      await axiosAPI.post(`${import.meta.env.VITE_BACKEND_URL}/api/event/`, {
        title: eventForm.title,
        description: eventForm.description,
        date: eventForm.date,
        site: eventForm.site,
        userId: idUser,
      });
      closeModal();
      toast.success("Nouvel évènement crée avec succès");
      mutate(`${import.meta.env.VITE_BACKEND_URL}/api/event/`);
    } catch (err) {
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
    }
  };

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
      <h2 className="text-white text-[1.7rem]">Calendrier des évènements</h2>
      <div className="flex p-[1rem] flex-start">
        <button
          className="w-[4rem] bg-transparent border-none"
          type="button"
          onClick={openModalAdd}
        >
          <img
            className="w-[3rem]"
            src={addEvent}
            alt="add an event"
          />
          <span />
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={modalStyle}
      >
        <h2 className="text-center text-white text-2xl">Ajouter un event</h2>

        <div className="m-1 mt-5">
          <label htmlFor="title" className="font-bold text-slate-300">
            Titre
          </label>
          <input
            id="title"
            type="text"
            className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
            placeholder="Titre"
            value={eventForm.title}
            onChange={(e) =>
              eventFormDispatch({
                type: "VOID_TITLE",
                payload: e.target.value,
              })
            }
          />
        </div>
        <div className="m-1">
          <label htmlFor="description" className="font-bold text-slate-300">
            Description
          </label>
          <input
            id="description"
            type="text"
            className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
            placeholder="Description"
            value={eventForm.description}
            onChange={(e) =>
              eventFormDispatch({
                type: "VOID_DESCRIPTION",
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
            className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
            placeholder="Date"
            value={eventForm.date}
            onChange={(e) =>
              eventFormDispatch({
                type: "VOID_DATE",
                payload: e.target.value,
              })
            }
          />
        </div>
        <div className="m-1">
          <label htmlFor="site" className="font-bold text-slate-300">
            Site
          </label>
          <input
            id="site"
            type="text"
            className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
            placeholder="Site"
            value={eventForm.site}
            onChange={(e) =>
              eventFormDispatch({
                type: "VOID_SITE",
                payload: e.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-col mt-10 gap-5">
          <button onClick={createEvent} type="submit">
            Sauvegarder
          </button>
          <button onClick={closeModal} type="submit">
            Fermer
          </button>
        </div>
      </Modal>

      {(role === "administrateur" || role === "redacteur") &&
        sortedByDate(data).map((event) => (
          <div key={event.id}>
            <CardEvent data={event} />
          </div>
        ))}
    </section>
  );
}
