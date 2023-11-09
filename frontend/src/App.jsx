/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header/Header";
import Events from "./components/Events/Events";
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";

import Login from "./pages/Login";
import Administration from "./pages/Administration";
import SignUp from "./pages/SignUp";

import "./App.css";

function App() {
  // const location = useLocation();

  // useEffect(() => {
  //   const preventSwipeScroll = (event) => {
  //     event.preventDefault();
  //   };
  //   if (location.pathname !== "/administration") {
  //     window.addEventListener("wheel", preventSwipeScroll, { passive: false });
  //     window.addEventListener("touchmove", preventSwipeScroll, {
  //       passive: false,
  //     });
  //   }

  //   return () => {
  //     if (location.pathname !== "/administration") {
  //       window.removeEventListener("wheel", preventSwipeScroll);
  //       window.removeEventListener("touchmove", preventSwipeScroll);
  //     }
  //   };
  // }, [location.pathname]);

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <About />
              <Events />
              <Contact />
            </>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="administration" element={<Administration />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
