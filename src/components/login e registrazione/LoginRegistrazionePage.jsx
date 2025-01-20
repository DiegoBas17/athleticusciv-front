import "./loginRegistrazione.css";
import { useState } from "react";
import Login from "./Login";
import Registrazione from "./Registrazione";

const LoginRegistrazionePage = () => {
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = () => {
    setIsLoginActive(!isLoginActive);
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <dotlottie-player
          src="https://lottie.host/bb186f94-4d64-4b4f-bc35-916801c9a288/r2wW2ZAOCi.json"
          background="transparent"
          speed="1"
          style={{ width: "300px", height: "300px" }}
          loop
          autoplay
        ></dotlottie-player>
      </div>
    );
  }

  return (
    <div className={isLoginActive ? "first-color" : "second-color"}>
      <div className={isLoginActive ? "slide-in-left" : "slide-in-right"}>
        {isLoginActive ? (
          <Login handleToggle={handleToggle} />
        ) : (
          <Registrazione
            handleToggle={handleToggle}
            setIsLoading={setIsLoading}
          />
        )}
      </div>
    </div>
  );
};
export default LoginRegistrazionePage;
