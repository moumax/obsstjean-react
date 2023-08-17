// import { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Events from "./components/Events/Events";
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";

import Login from "./pages/Login";
import Administration from "./pages/Administration";

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
              <About />
              <Events />
              <Contact />
              <Footer />
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
