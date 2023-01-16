import React from "react";
import CommanUI from "./CommonUI/CommanUI";
import Login from "./FormPart/Login";

const LoginScreen = ({setContactData}) => {
  return (
    <>
      <CommanUI formpart={<Login setContactData={setContactData} />} />
    </>
  );
};

export default LoginScreen;
