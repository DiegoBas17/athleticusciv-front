import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginRegistrazionePage from "./components/LoginRegistrazionePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginRegistrazionePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
