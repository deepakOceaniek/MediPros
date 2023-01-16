import React from "react";
import "./ErrorPage.css";
// import styled from "styled-components";
import { NavLink } from "react-router-dom";
// import { Button } from "./Style/Button";

const ErrorPage = () => {
  return (
    <div className="containerError ">
      <div>
        <h2 className="errorStatus">404</h2>
        <h3 className="lostMessage">UH OH! You're lost.</h3>
        <p className="errorMessage">
          The page you are looking for does not exist. How you got here is a
          mystery. But you can click the button to go back to the homepage
        </p>
        <NavLink to="/">
          <button>Go Back To Home</button>
        </NavLink>
      </div>
    </div>
  );
};

export default ErrorPage;
