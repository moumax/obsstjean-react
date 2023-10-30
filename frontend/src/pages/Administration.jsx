import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import UsersAdministration from "../components/Administration/UsersAdministration";
import EventsAdministration from "../components/Administration/EventsAdministration";
import PhotosAdministration from "../components/Administration/PhotosAdministration";
import CurrentUserContext from "../contexts/userContext";

import "react-tabs/style/react-tabs.css";

import "./Administration.css";

function Administration() {
  const { user } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  return (
    <section className="section-administration">
      <Tabs>
        <TabList>
          {user.role === "administrateur" && <Tab>Utilisateurs</Tab>}
          {user.role !== "photographe" && user.role !== null && (
            <Tab>Events</Tab>
          )}
          {user.role !== null && <Tab>Photos</Tab>}
        </TabList>

        {user.role === "administrateur" && (
          <TabPanel>
            <UsersAdministration />
          </TabPanel>
        )}

        <TabPanel>
          {user.role !== "photographe" && user.role !== null && (
            <EventsAdministration />
          )}
        </TabPanel>
        {user.role !== null && (
          <TabPanel>
            <PhotosAdministration />
          </TabPanel>
        )}
      </Tabs>
      <button
        type="submit"
        className="administration-button"
        onClick={() => navigate("/")}
      >
        Retour
      </button>
    </section>
  );
}

export default Administration;
