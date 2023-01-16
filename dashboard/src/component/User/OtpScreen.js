import React from "react";
import CommanUI from "./CommonUI/CommanUI";
import Otp from "./FormPart/Otp";
const OtpScreen = (props) => {
  return (
    <>
      <CommanUI formpart={<Otp  data={[props.data[0],props.data[1]]}  />} />
    </>
  );
};

export default OtpScreen;
