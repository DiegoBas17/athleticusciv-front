import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginRegistrazionePage from "./components/login e registrazione/LoginRegistrazionePage";
import Home from "./components/Home";
import MembriPage from "./components/membriPage/MembriPage";
import PartitaPage from "./components/PartitaPage";
import PartitePage from "./components/PartitePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginRegistrazionePage />} />
        <Route path="/" element={<Home />} />
        <Route path="/leggende-del-CIV" element={<MembriPage />} />
        <Route path="/partite" element={<PartitePage />} />
        <Route path="/partite/:id" element={<PartitaPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
