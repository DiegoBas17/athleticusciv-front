import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginRegistrazionePage from "./components/login e registrazione/LoginRegistrazionePage";
import MembriPage from "./components/membriPage/MembriPage";
import Home from "./components/home/Home";
import PartitePage from "./components/partitePage/PartitePage";
import PrenotazioiniPage from "./components/partitePage/PrenotazioiniPage";
import StatistichePartite from "./components/partitePage/StatistichePartite";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginRegistrazionePage />} />
        <Route path="/" element={<Home />} />
        <Route path="/leggende-del-CIV" element={<MembriPage />} />
        <Route path="/partite" element={<PartitePage />} />
        <Route
          path="/partite/prenotazioni/:partitaId"
          element={<PrenotazioiniPage />}
        />
        <Route
          path="/partite/statistiche/:partitaId"
          element={<StatistichePartite />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
