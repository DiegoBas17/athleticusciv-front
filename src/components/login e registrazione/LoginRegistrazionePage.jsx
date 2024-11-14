import "./loginRegistrazione.css";
import { useState } from "react";
import Login from "./Login";
import Registrazione from "./Registrazione";

const LoginRegistrazionePage = () => {
  const [isLoginActive, setIsLoginActive] = useState(true);

  const handleToggle = () => {
    setIsLoginActive(!isLoginActive);
  };

  return (
    <div className={isLoginActive ? "first-color" : "second-color"}>
      <div className={isLoginActive ? "slide-in-left" : "slide-in-right"}>
        {isLoginActive ? (
          <Login handleToggle={handleToggle} />
        ) : (
          <Registrazione handleToggle={handleToggle} />
        )}
      </div>
    </div>
  );
};
export default LoginRegistrazionePage;
