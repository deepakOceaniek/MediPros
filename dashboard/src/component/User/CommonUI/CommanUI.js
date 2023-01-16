import React from "react";
import "./CommanUI.css";

const CommanUI = (props) => {
  return (
    <>
      <div className="loginScreen">
        <div className="row">
          <div className="login-left" xs={12} sm={12} md={6} lg={6} xxl={6}>
            <img src="/Images/login.png" alt="MediprosLogo" />
            <p>
              Pharmacy App is complete online medical store & health app for all
              your medical needs.
            </p>
          </div>
          <div className="form-partr " xs={12} sm={12} md={6} lg={6} xxl={6}>
            {props.formpart}
          </div>
        </div>
      </div>
    </>
  );
};

export default CommanUI;
