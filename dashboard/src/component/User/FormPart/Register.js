import React, { useState, useEffect } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, registerAdmin } from "../../../actions/userAction";
import Loader from "../../layout/Loader/Loader";

const Register = ({ setRegisterData }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const Navigate = useNavigate();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [user, setUser] = useState({
    category: "",
    name: "",
    contact: "",
    address: "",
    fromTime: "",
    toTime: "",
    status: "",
  });
  const { category, name, contact, address, fromTime, toTime, status } = user;
  const [profileImage, setProfileImage] = useState("/Profile.png");
  //   const [profilePreview, setProfilePreview] = useState("/Profile.png");
  const [certificateImage, setCertificateImage] = useState("/Profile.png");
  //   const [certificatePreview, setCertificatePreview] = useState("/Profile.png");

  const registerDataChange = (e) => {
    if (e.target.name === "profileImage") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          //   setProfilePreview(reader.result);
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
          //   setCertificatePreview(reader.result);
          setCertificateImage(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      Navigate("/admin/dashboard");
    }
  }, [
    dispatch,
    alert,
    error,
    isAuthenticated,
    Navigate,
    // redirect
  ]);
  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.append("category", category);
    myForm.append("name", name);
    myForm.append("contact", `91${contact}`);
    myForm.append("address", address);
    myForm.append("fromTime", fromTime);
    myForm.append("toTime", toTime);
    myForm.append("status", status);
    myForm.append("profileImage", profileImage);
    myForm.append("certificateImage", certificateImage);

    dispatch(registerAdmin(myForm));
    setRegisterData(myForm);
    Navigate("/otp");
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <section className="registration">
            <div className="container">
              <div className="registration-content ">
                <div className="registration-form  ">
                  <h1 className="form-title ">Register</h1>

                  <form
                    className="register-form"
                    method="POST"
                    encType="multipart/form-data"
                    onSubmit={registerSubmit}
                  >
                    <div className="form-group dropDown">
                      <div className="register_label">
                        <select
                          name="category"
                          id="category"
                          onChange={registerDataChange}
                        >
                          <option
                            value="selectCategory"
                            selected
                            disabled
                            hidden
                          >
                            Select Category
                          </option>
                          <option value="Pharmacy">Pharmacy</option>
                          <option value="Lab">Lab </option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="register_label">
                        <label>Name</label>
                        <input
                          type="text"
                          placeholder="Name"
                          required
                          name="name"
                          value={name}
                          onChange={registerDataChange}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="register_label">
                        <label>Contact</label>
                        <input
                          type="number"
                          placeholder="Contact"
                          required
                          name="contact"
                          value={contact}
                          onChange={registerDataChange}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <i className="zmdi zmdi-address zmdi-hc-lg material-icon-name"></i>
                      <div className="register_label">
                        <label>Address</label>
                        <input
                          type="text"
                          placeholder="Address"
                          required
                          name="address"
                          value={address}
                          onChange={registerDataChange}
                        />
                      </div>
                    </div>

                    <div className="form-group-profileImage">
                      <i className="zmdi zmdi-account zmdi-hc-lg material-icon-name"></i>
                      <div className="register_label">
                        <label>Profile Image</label>
                        <input
                          type="file"
                          name="profileImage"
                          accept="image/png, image/jpeg"
                          // value={""}
                          // value="image/*"
                          onChange={registerDataChange}
                        />
                      </div>
                    </div>

                    <div className="form-group-profileImage">
                      <div className="register_label">
                        <label>Certificate Image</label>
                        <input
                          type="file"
                          name="certificateImage"
                          accept="image/png, image/gif, image/jpeg"
                          // value={""}
                          // value="image/*"
                          onChange={registerDataChange}
                        />
                      </div>
                    </div>

                    <div className="form_group_dropDown">
                      <div className="register_label">
                        <label>Status</label>
                        <select
                          name="status"
                          id="status"
                          onChange={registerDataChange}
                        >
                          <option value={status} selected disabled hidden>
                            Status
                          </option>
                          <option value="Open">Open</option>
                          <option value="Close">Close</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-Time">
                      <div className="register_label">
                        <label>Opening Time</label>
                        <input
                          type="time"
                          placeholder="Opening Time"
                          required
                          name="fromTime"
                          value={fromTime}
                          onChange={registerDataChange}
                        />
                      </div>
                      <div className="register_label">
                        <label>Closing Time</label>
                        <input
                          type="time"
                          placeholder="Closing Time"
                          required
                          name="toTime"
                          value={toTime}
                          onChange={registerDataChange}
                        />
                      </div>
                    </div>

                    <div className="form-group form-submit-btn">
                      <input
                        type="submit"
                        name="register"
                        id="register"
                        className="form-submit"
                        value="Register"
                      />
                    </div>
                    <div className="span_text">
                      <span>
                        Already have an account?{" "}
                        <Link style={{ color: "rgba(0, 144, 153, 1)" }} to="/">
                          Login
                        </Link>
                      </span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Register;
