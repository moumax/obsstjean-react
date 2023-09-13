import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Events from "./components/Events/Events";
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";

import Login from "./pages/Login";
import Administration from "./pages/Administration";

import "./App.css";

function App() {
  useEffect(() => {
    const preventSwipeScroll = (event) => {
      event.preventDefault();
    };

    window.addEventListener("wheel", preventSwipeScroll, { passive: false });
    window.addEventListener("touchmove", preventSwipeScroll, {
      passive: false,
    });

    return () => {
      window.removeEventListener("wheel", preventSwipeScroll);
      window.removeEventListener("touchmove", preventSwipeScroll);
    };
  }, []);

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
      </Routes>
    </div>
  );
}

export default App;
