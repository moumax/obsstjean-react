import Header from "./components/Header/Header";
import Observatoire from "./components/Observatoire/Observatoire";
import Footer from "./components/Footer/Footer";
import Events from "./components/Events/Events";
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";
import Weather from "./components/Weather/Weather";

import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />
      <Weather />
      <Observatoire />
      <About />
      <Events />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
