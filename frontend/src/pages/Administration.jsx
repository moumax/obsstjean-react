import React from "react";
import { useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import UsersAdministration from "../components/Administration/UsersAdministration";
import EventsAdministration from "../components/Administration/EventsAdministration";

import "react-tabs/style/react-tabs.css";

import "./Administration.css";

function Administration() {
  const navigate = useNavigate();
  return (
    <section className="section-administration">
      <Tabs>
        <TabList>
          <Tab>Utilisateurs</Tab>
          <Tab>Events</Tab>
        </TabList>

        <TabPanel>
          <UsersAdministration />
        </TabPanel>
        <TabPanel>
          <EventsAdministration />
        </TabPanel>
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
