import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginRegistrazionePage from "./components/login e registrazione/LoginRegistrazionePage";
import MembriPage from "./components/membriPage/MembriPage";
import Home from "./components/home/Home";
import PartitePage from "./components/partitePage/PartitePage";
import PrenotazioiniPage from "./components/partitePage/PrenotazioiniPage";
import StatistichePartite from "./components/partitePage/StatistichePartite";
import { ToastContainer } from "react-toastify";
import Formazione from "./components/formazioni/Formazione";

function App() {
  return (
    <>
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
          <Route path="/formazioni" element={<Formazione />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
