import { useState } from "react";
import Login from "./Login";
import Registrazione from "./Registrazione";

const LoginRegistrazionePage = () => {
  const [isLoginActive, setIsLoginActive] = useState(true);
  const handleToggle = () => {
    setIsLoginActive(!isLoginActive);
  };
  return (
    <div className="first-color">
      <div
        className={`form-container ${
          isLoginActive ? "slide-in-left" : "slide-in-right"
        }`}
      >
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
