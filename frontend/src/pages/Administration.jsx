import React from "react";
import { useNavigate } from "react-router-dom";
import UsersAdministration from "../components/Administration/UsersAdministration";

import "./Administration.css";

function Administration() {
  const navigate = useNavigate();
  return (
    <section className="section-administration">
      <UsersAdministration />
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
