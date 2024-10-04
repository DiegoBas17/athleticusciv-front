import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginRegistrazionePage from "./components/LoginRegistrazionePage";
import Home from "./components/Home";
import ProfiloPage from "./components/ProfiloPage";
import MembriPage from "./components/MembriPage";
import EventiPage from "./components/EventiPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginRegistrazionePage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profilo/:id" element={<ProfiloPage />} />
        <Route path="/Legends-of-Athleticus" element={<MembriPage />} />
        <Route path="/eventi" element={<EventiPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
