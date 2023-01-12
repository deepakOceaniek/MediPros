import React, { useState, useEffect } from "react";
import "./Otp.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verify, clearErrors } from "../../../actions/userAction";
import { useAlert } from "react-alert";
import OTPInput from "react-otp-input";

const UserOtpScreen = (props) => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const alert = useAlert();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  console.log(`data----------${props.data[0]}`);
  console.log(`data----------${props.data[1]}`);

  // const [otp, setOtp] = useState("");
  //   <OtpInput
  //   value={otp}
  //   onChange={handleChange}
  //   numInputs={4}
  //   separator={<span>&nbsp;&nbsp;</span>}
  //   inputStyle={{ width: "2.5vw" }}
  // />
  const [OTP, setOTP] = useState("");
  console.log(OTP);
  // const [otpData, setOtpData] = useState({
  //   otpInput1: "",
  //   otpInput2: "",
  //   otpInput3: "",
  //   otpInput4: "",
  // });
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      Navigate("/admin/dashboard");
    }
  }, [dispatch, alert, error, isAuthenticated, Navigate]);

  // let inputName, value;
  // const loginInputHandler = (e) => {
  //   inputName = e.target.name;
  //   value = e.target.value;
  //   setOtpData({ ...otpData, [inputName]: value });
  // };

  // const str = otpData.otpInput1;
  // const otp = str.concat(
  //   otpData.otpInput2,
  //   otpData.otpInput3,
  //   otpData.otpInput4
  // );

  console.log(`loading ${loading}`);
  console.log(`authenticate ${isAuthenticated}`);

  function handleChange(OTP) {
    console.log(OTP);
    setOTP(OTP);
  }

  const submitOtp = (e) => {
    e.preventDefault();

    dispatch(
      verify(
        OTP,
        props.data[0],
        props.data[1]
        // route.params.contact
      )
    );
    if (isAuthenticated) {
      Navigate("/admin/dashboard");
    }
  };

  return (
    <>
      <div>
        <form className="Form-group" onSubmit={submitOtp}>
          <div className="logopng">
            <img src="/images/OtpLogo.png" alt="logo" />
          </div>
          <label className="otptext">
            <h1> OTP Verification</h1>
          </label>

          <p className="header_text">Enter OTP code send to your mobile number</p>
          <p className="header_text_2"> Please Verify?</p>

          <div className="form-field" id="otp">
            <OTPInput
              onChange={handleChange}
              value={OTP}
              numInputs={4}
              inputStyle={{ width: "2.5vw" }}
              separator={<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>}
            />
            {/* <div className="input-field">
              <input
                className="otp-input"
                type="number"
                maxLength="1"
                name="otpInput1"
                size="1"
                value={otpData.otpInput1}
                onChange={loginInputHandler}
              />
              <input
                className="otp-input"
                type="number"
                maxLength="1"
                name="otpInput2"
                size="1"
                value={otpData.otpInput2}
                onChange={loginInputHandler}
              />
              <input
                className="otp-input"
                type="number"
                maxLength="1"
                name="otpInput3"
                size="1"
                value={otpData.otpInput3}
                onChange={loginInputHandler}
              />
              <input
                className="otp-input"
                type="number"
                maxLength="1"
                name="otpInput4"
                value={otpData.otpInput4}
                onChange={loginInputHandler}
              />
            </div> */}
          </div>
          <p className="footer_text">Don’t not receive OTP?</p>

          <p className="footer_text_2">Resend OTP?</p>

          <button className="VerifyBtn " type="submit">
            Verify
          </button>
        </form>
      </div>
    </>
  );
};

export default UserOtpScreen;
