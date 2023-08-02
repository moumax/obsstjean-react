// import { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Observatoire from "./components/Observatoire/Observatoire";
import Footer from "./components/Footer/Footer";
import Events from "./components/Events/Events";
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";
import Weather from "./components/Weather/Weather";

import Login from "./pages/Login";

import "./App.css";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Weather />
              <Observatoire />
              <About />
              <Events />
              <Contact />
              <Footer />
            </>
          }
        />
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
