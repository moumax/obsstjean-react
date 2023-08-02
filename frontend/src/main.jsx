import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CurrentUserContextProvider } from "./contexts/userContext";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <CurrentUserContextProvider>
    <React.StrictMode>
      <App />
      <ToastContainer autoClose={1000} />
    </React.StrictMode>
  </CurrentUserContextProvider>
);
