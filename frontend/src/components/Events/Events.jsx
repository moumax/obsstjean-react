import React from "react";
import MoonLoader from "react-spinners/MoonLoader";
import useSWR from "swr";
import CardEvent from "./CardEvent";
import sortedByDate from "../../utils/date";
import fetcher from "../../api/fetcher";

import "./Events.css";

function Events() {
  const { data, error } = useSWR(
    `${import.meta.env.VITE_BACKEND_URL}/api/event/`,
    fetcher
  );

  if (error) return <div>Une erreur est survenue: {error.message}</div>;
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
  return (
    <section id="calendar" className="events-container">
      <h2 className="classTitles">Calendrier des evènements</h2>
      {sortedByDate(data).map((event) => (
        <div key={event.id}>
          <CardEvent data={event} />
        </div>
      ))}
    </section>
  );
}

export default Events;
