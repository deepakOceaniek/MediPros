import React, { useEffect } from "react";
import "./LoginSignUp.css";
import { useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { useSelector, useDispatch } from "react-redux";
import { login, clearErrors, registerAdmin } from "../../actions/userAction";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/Loader";

const AdminLoginSignUp = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const Navigate = useNavigate();
  const location = useLocation();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  // const [loginName, setLoginEmail] = useState("");
  const [loginContact, setLoginPassword] = useState("");
  const [user, setUser] = useState({
    category:"",
    name: "",
    contact: "",
    address:"",
    fromTime :"",
    toTime:"",
    status:""
  });
  const {category, name, contact, address, fromTime,toTime,status} = user;
  const [profileImage, setProfileImage] = useState("/Profile.png");
  const [profilePreview, setProfilePreview] = useState("/Profile.png");
  const [certificateImage, setCertificateImage] = useState("/Profile.png");
  const [certificatePreview, setCertificatePreview] = useState("/Profile.png");
  const registerDataChange = (e) => {
    if (e.target.name === "profileImage") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setProfilePreview(reader.result);
          setProfileImage(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
    if (e.target.name === "certificateImage") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setCertificatePreview(reader.result);
          setCertificateImage(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  
  // const redirect = location.search ? location.search.split("=")[1] : "/account";
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      Navigate("/admin/dashboard");
    }
  }, [dispatch, alert, error, isAuthenticated, Navigate, 
    // redirect
  ]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }

    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };
  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginContact));
    Navigate("/otpverify")
  };
  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.append("category", category);
    myForm.append("name", name);
    myForm.append("contact", contact);
    myForm.append("address", address);
    myForm.append("fromTime", fromTime);
    myForm.append("toTime", toTime);
    myForm.append("status", status);
    myForm.append("profileImage", profileImage);
    myForm.append("certificateImage", certificateImage);

    dispatch(registerAdmin(myForm));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="LoginSignUpContainer">
          <div className="LoginSignUpBox">
            <div>
              <div className="login_signUp_toggle">
                <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
              </div>
              <button ref={switcherTab}></button>
            </div>
            <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
              {/* <div className="loginName">
                <MailOutlineIcon />
                <input
                  type="text"
                  placeholder="name"
                  required
                  value={loginName}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div> */}

              <div className="loginContact">
                <LockOpenIcon />
                <input
                  type="number"
                  placeholder="Contact"
                  required
                  value={loginContact}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              {/* <Link to="/password/forgot">Forget Password ?</Link> */}
              <input type="submit" value="Login" className="loginBtn" />
            </form>
            <form
              className="signUpForm"
              ref={registerTab}
              encType="multipart/form-data"
              onSubmit={registerSubmit}
            >
                <div className="signUpCategory">
                <FaceIcon />
                <input
                  type="text"
                  placeholder="Category"
                  required
                  name="category"
                  value={category}
                  onChange={registerDataChange}
                />
              </div>
              <div className="signUpName">
                <FaceIcon />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  name="name"
                  value={name}
                  onChange={registerDataChange}
                />
              </div>
              <div className="signUpContact">
                <MailOutlineIcon />
                <input
                  type="number"
                  placeholder="Contact"
                  required
                  name="contact"
                  value={contact}
                  onChange={registerDataChange}
                />
              </div>
              <div className="signUpAddress">
                <MailOutlineIcon />
                <input
                  type="text"
                  placeholder="Address"
                  required
                  name="address"
                  value={address}
                  onChange={registerDataChange}
                />
              </div>
              <div className="signUpFromTime">
                <MailOutlineIcon />
                <input
                  type="time"
                  placeholder="Opening Time"
                  required
                  name="fromTime"
                  value={fromTime}
                  onChange={registerDataChange}
                />
              </div>
              <div className="signUpToTime">
                <MailOutlineIcon />
                <input
                  type="time"
                  placeholder="Closing Time"
                  required
                  name="toTime"
                  value={toTime}
                  onChange={registerDataChange}
                />
              </div>
              <div className="signUpStatus">
                <MailOutlineIcon />
                <input
                  type="text"
                  placeholder="Status"
                  required
                  name="status"
                  value={status}
                  onChange={registerDataChange}
                />
              </div>
         
              <div id="registerImage">
                <img src={profilePreview} alt="Profile Preview" />
                <input
                  type="file"
                  name="profileImage"
                  value={""}
                  // value="image/*"
                  onChange={registerDataChange}
                />
              </div>

              <div id="registerImage">
                <img src={certificatePreview} alt="Certificate Preview" />
                <input
                  type="file"
                  name="certificateImage"
                  value={""}
                  // value="image/*"
                  onChange={registerDataChange}
                />
              </div>
              <input type="submit" value="Register" className="signUpBtn" />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminLoginSignUp;
