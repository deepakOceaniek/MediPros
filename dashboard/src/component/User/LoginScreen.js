import React from "react";
import CommanUI from "./CommonUI/CommanUI";
import Login from "./FormPart/Login";
import Cookies from "js-cookie";

const LoginScreen = ({ setContactData }) => {
  Cookies.set("name", "value", {
    sameSite: "none",
    secure: true,
  });
  console.log(Cookies.get());

  return (
    <>
      <CommanUI formpart={<Login setContactData={setContactData} />} />
    </>
  );
};

export default LoginScreen;
