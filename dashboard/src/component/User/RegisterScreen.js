import React from "react";
import CommanUI from "./CommonUI/CommanUI";
import Register from "./FormPart/Register";

const RegisterScreen = ({setRegisterData}) => {
  return (
    <>
      <>
        <CommanUI formpart={<Register setRegisterData={setRegisterData} />} />
      </>
    </>
  );
};

export default RegisterScreen;
