import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginRegistrazionePage from "./components/login e registrazione/LoginRegistrazionePage";
import Home from "./components/Home";
import MembriPage from "./components/membriPage/MembriPage";
import EventiPage from "./components/EventiPage";
import PartitaPage from "./components/PartitaPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginRegistrazionePage />} />
        <Route path="/" element={<Home />} />
        <Route path="/Legends-of-Athleticus" element={<MembriPage />} />
        <Route path="/eventi" element={<EventiPage />} />
        <Route path="/partite/:id" element={<PartitaPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
